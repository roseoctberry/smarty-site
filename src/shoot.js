const { chromium } = require('playwright');
const http = require('http'); const path = require('path'); const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const T = { '.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml' };
const server = http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(ROOT, p);
  if (!fs.existsSync(f)) { res.statusCode = 404; return res.end('404'); }
  res.setHeader('Content-Type', T[path.extname(f)] || 'application/octet-stream');
  fs.createReadStream(f).pipe(res);
});

const shots = [
  ["fr/?da=1","00-da",1440,{}],
  ["fr/?da=1","00b-da-compo",1440,{datab:"compo"}],
  ["fr/?da=1","00c-da-sections",1440,{datab:"sections"}],
  ['fr/','01-hero',        1440, {}],
  ['fr/','02-hero-swir',   1440, {poc:'verglas'}],
  ['fr/','03-menu',        1440, {menu:1}],
  ['fr/','04-perimetre',   1440, {scroll:'.scope'}],
  ['fr/','05-signature',   1440, {sig:.42}],
  ['fr/','06-etages',      1440, {scroll:'#et-capteur'}],
    ['fr/','08-equipe',      1440, {scroll:'#equipe', hover:'.tm'}],
  ['fr/','09-labo',        1440, {scroll:'#labo'}],
  ['fr/','06b-instruments',1440, {scroll:'#instruments'}],
  ['fr/','07-contact',     1440, {scroll:'#contact'}],
  ['fr/','10-qual-1',      1440, {scroll:'#cadrer'}],
  ['fr/','11-qual-ack',    1440, {qual:[0], scroll:'#cadrer'}],
  ['fr/','12-qual-form',   1440, {qual:[1,2,1,0,1], scroll:'#cadrer'}],
  ['fr/','13-mobile',      420,  {}],
];

(async () => {
  await new Promise(r=>server.listen(0,r));
  const port = server.address().port, base = `http://localhost:${port}`;
  const browser = await chromium.launch();
  for (const [url,name,w,opt] of shots){
    const page = await browser.newPage({ viewport:{width:w,height:900} });
    await page.goto(`${base}/${url}`,{waitUntil:'networkidle'}).catch(()=>{});
    await page.evaluate(()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');});
    await page.waitForTimeout(700);
    if (opt.da)   { await page.evaluate(()=>{const b=document.querySelector('.da-hint'); if(b)b.click();}); await page.waitForTimeout(600); }
    if (opt.datab){ await page.evaluate(t=>{const b=document.querySelector('.da-tab[data-t="'+t+'"]'); if(b)b.click();}, opt.datab); await page.waitForTimeout(400); }
    if (opt.menu) { await page.click('[data-menu]'); await page.waitForTimeout(500); }
    if (opt.poc)  { await page.evaluate(id=>{const b=document.querySelector(`.hb[data-poc="${id}"]`); if(b)b.click();}, opt.poc); await page.waitForTimeout(800); }
    if (opt.qual) {
      for (const i of opt.qual){
        await page.evaluate(n=>{const b=document.querySelectorAll('.qual-body .q-o')[n]; if(b)b.click();}, i);
        await page.waitForTimeout(400);
      }
      await page.evaluate(()=>{const n=document.querySelector('.q-next'); if(n && !n.hidden) n.click();});
      await page.waitForTimeout(400);
    }
    if (opt.scroll){ await page.evaluate(s=>{const e=document.querySelector(s); if(e)window.scrollTo(0,e.getBoundingClientRect().top+window.pageYOffset-80);}, opt.scroll); await page.waitForTimeout(1400); }
    if (opt.hover) { await page.hover(opt.hover); await page.waitForTimeout(700); }
    if (opt.sig)   { await page.evaluate(f=>{const e=document.querySelector('[data-sig]'); if(e)window.scrollTo(0,e.offsetTop+e.offsetHeight*f);}, opt.sig); await page.waitForTimeout(900); }
    await page.screenshot({ path: path.join(ROOT, `../shot-${name}.png`) });
    await page.close(); console.log('shot', name);
  }
  await browser.close(); server.close();
})();
