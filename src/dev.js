/* ============================================================
   SMA-RTY — serveur d'aperçu local (zéro dépendance)
   Run: node src/dev.js  →  http://localhost:3000/fr/
   Reconstruit les pages à chaque modification de src/ et
   recharge l'onglet automatiquement.
   ============================================================ */
const http = require('http');
const fs   = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT || 3000);

const TYPES = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.json':'application/json',
  '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.png':'image/png',
  '.webp':'image/webp', '.avif':'image/avif', '.svg':'image/svg+xml',
  '.mp4':'video/mp4', '.webm':'video/webm', '.woff2':'font/woff2', '.ico':'image/x-icon'
};

let stamp = Date.now();
const clients = new Set();

function build(){
  try {
    execFileSync(process.execPath, [path.join(__dirname,'build.js')], { stdio:'inherit' });
    return true;
  } catch (e) {
    console.error('[dev] build KO :', e.message);
    return false;
  }
}

/* --- reconstruction + rechargement --- */
let timer = null;
function touched(what){
  clearTimeout(timer);
  timer = setTimeout(() => {
    const needsBuild = what === 'src';
    if (needsBuild && !build()) return;
    stamp = Date.now();
    for (const res of clients) res.write(`data: ${stamp}\n\n`);
    console.log('[dev] rechargement →', new Date().toLocaleTimeString('fr-FR'));
  }, 120);
}

for (const [dir, kind] of [['src','src'], ['assets','assets']]) {
  fs.watch(path.join(ROOT, dir), { recursive:true }, (_e, f) => {
    if (!f || f === 'dev.js' || f.startsWith('.')) return;
    touched(kind);
  });
}

/* --- script de rechargement injecté dans les pages --- */
const RELOAD = `<script>
(function(){var s=new EventSource('/__dev');var b=null;
s.onmessage=function(e){if(b&&b!==e.data){location.reload()}b=e.data};})();
</script>`;

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);

  if (url === '/__dev') {
    res.writeHead(200, {'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});
    res.write(`data: ${stamp}\n\n`);
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  let file = path.join(ROOT, url);
  if (url.endsWith('/')) file = path.join(file, 'index.html');
  if (!file.startsWith(ROOT)) { res.writeHead(403).end('403'); return; }

  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'}).end('<h1>404</h1><p><a href="/fr/">/fr/</a></p>'); return; }
    const ext = path.extname(file).toLowerCase();
    const type = TYPES[ext] || 'application/octet-stream';
    if (ext === '.html') buf = Buffer.from(buf.toString('utf8').replace('</body>', RELOAD + '</body>'));
    res.writeHead(200, {'Content-Type':type, 'Cache-Control':'no-store'});
    res.end(buf);
  });
});

build();
server.listen(PORT, () => console.log(`[dev] http://localhost:${PORT}/fr/`));
