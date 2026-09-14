/* ============================================================
   SMA-RTY — atelier de design en direct
   Ouverture : touche D · ?da=1 · pastille en bas à droite.
   Quatre onglets : Typo · Couleurs · Composition · Sections.
   « Exporter » rend le CSS à coller dans style.css.
   Outil d'atelier : retirer la ligne da.js de src/build.js avant mise en ligne.
   ============================================================ */
(function () {
  var KEY = 'smarty-da-v2';
  var root = document.documentElement;

  /* ---------- réglages numériques et couleurs ---------- */
  var TABS = [
    { id: 'typo', n: 'Typo', groups: [
      { n: 'Tailles', items: [
        { v: '--s1', l: 'Corps de texte',     min: .82, max: 1.3,  step: .01, u: 'rem' },
        { v: '--s2', l: 'Titre de bloc',      min: .92, max: 1.9,  step: .01, u: 'rem' },
        { v: '--s3', l: 'Titre de section',   min: 1,   max: 2.6,  step: .01, u: 'rem' },
        { v: '--s4', l: 'Titre principal',    min: 1.2, max: 3.6,  step: .01, u: 'rem' },
      ]},
      { n: 'Rythme', items: [
        { v: '--lh',  l: 'Interlignage',        min: 1.25, max: 2,   step: .01, u: '' },
        { v: '--tr',  l: 'Approche des titres', min: -.06, max: .03, step: .001, u: 'em' },
        { v: '--mlh', l: 'Interlignage titres',  min: 1,   max: 1.6, step: .01, u: '' },
      ]},
    ]},

    { id: 'coul', n: 'Couleurs', groups: [
      { n: 'Surfaces', items: [
        { v: '--bg',   l: 'Fond',            c: 1 },
        { v: '--bg-1', l: 'Fond secondaire', c: 1 },
        { v: '--bg-2', l: 'Fond tertiaire',  c: 1 },
      ]},
      { n: 'Texte', items: [
        { v: '--ink',   l: 'Texte fort',    c: 1 },
        { v: '--txt',   l: 'Texte courant', c: 1 },
        { v: '--muted', l: 'Texte atténué', c: 1 },
        { v: '--faint', l: 'Texte discret', c: 1 },
      ]},
      { n: 'Accents et filets', items: [
        { v: '--cyan', l: 'Accent',   c: 1 },
        { v: '--sun',  l: 'Jaune',    c: 1 },
        { v: '--lime', l: 'Vert',     c: 1 },
        { v: '--blue', l: 'Bleu',     c: 1 },
        { v: '--lineA', l: 'Filets — opacité', min: .02, max: .35, step: .01, u: '', fn: 'line' },
      ]},
      { n: 'Dégradé spectral', items: [
        { v: '--g1', l: 'Point 1', c: 1, fn: 'grad' },
        { v: '--g2', l: 'Point 2', c: 1, fn: 'grad' },
        { v: '--g3', l: 'Point 3', c: 1, fn: 'grad' },
        { v: '--g4', l: 'Point 4', c: 1, fn: 'grad' },
        { v: '--g5', l: 'Point 5', c: 1, fn: 'grad' },
      ]},
    ]},

    { id: 'compo', n: 'Composition', groups: [
      { n: 'Grille', items: [
        { v: '--w',    l: 'Largeur de grille',    min: 960, max: 1700, step: 10, u: 'px' },
        { v: '--pad',  l: 'Marge latérale',       min: 12,  max: 110,  step: 2,  u: 'px' },
        { v: '--secp', l: 'Respiration verticale',min: 32,  max: 200,  step: 4,  u: 'px' },
        { v: '--gapx', l: 'Gouttière des colonnes',min: 8,  max: 110,  step: 2,  u: 'px' },
      ]},
      { n: 'Hero', items: [
        { v: '--heroDir', l: 'Image à droite / à gauche', sw: ['normal', 'reverse'] },
        { v: '--heroCol', l: 'Part du texte',     min: .55, max: 1.5,  step: .01, u: '' },
        { v: '--heroAr',  l: 'Format de l’image', min: 1.1, max: 2.2,  step: .01, u: '', fn: 'ar' },
        { v: '--heroAlign', l: 'Alignement du texte', sw: ['left', 'center'] },
      ]},
      { n: 'Blocs', items: [
        { v: '--rad',  l: 'Arrondi',             min: 0,  max: 16, step: 1, u: 'px' },
        { v: '--bw',   l: 'Épaisseur des filets',min: 0,  max: 3,  step: 1, u: 'px' },
        { v: '--secAlign', l: 'Titres de section', sw: ['left', 'center'] },
      ]},
    ]},
  ];

  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}

  function css(v) { return (getComputedStyle(root).getPropertyValue(v) || '').trim(); }
  function num(x) { var m = String(x).match(/-?[\d.]+/); return m ? parseFloat(m[0]) : 0; }
  function hex(x) {
    x = String(x).trim();
    if (x.charAt(0) === '#') return x.length === 4 ? '#' + x[1] + x[1] + x[2] + x[2] + x[3] + x[3] : x.slice(0, 7);
    var m = x.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (!m) return '#000000';
    return '#' + [1, 2, 3].map(function (i) { return ('0' + (+m[i]).toString(16)).slice(-2); }).join('');
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  /* réglages dérivés : certains pilotent plusieurs variables */
  function set(v, val) {
    state[v] = val;
    if (v === '--lineA') {
      root.style.setProperty('--line', 'rgba(255,255,255,' + val + ')');
      root.style.setProperty('--line-2', 'rgba(255,255,255,' + Math.min(1, val * 1.9).toFixed(3) + ')');
    } else if (/^--g[1-5]$/.test(v)) {
      root.style.setProperty(v, val); regrad();
    } else {
      root.style.setProperty(v, val);
    }
    save();
  }
  function regrad() {
    var g = [1, 2, 3, 4, 5].map(function (i) {
      return state['--g' + i] || css('--g' + i) || '#5FBDBE';
    });
    root.style.setProperty('--spectral',
      'linear-gradient(90deg,' + g[0] + ' 0%,' + g[1] + ' 25%,' + g[2] + ' 50%,' + g[3] + ' 75%,' + g[4] + ' 100%)');
    root.style.setProperty('--mesh',
      'radial-gradient(135% 128% at 2% -14%,' + g[0] + ' 0%,' + g[1] + ' 17%,' + g[2] + ' 38%,' +
      g[3] + ' 60%,' + g[4] + ' 82%, #10275C 100%)');
  }

  /* ---------- sections : ordre et visibilité ---------- */
  var SECN = {
    hero: 'Hero', band: 'Bandeau chiffré', scope: 'Périmètre', capacites: 'Relevés comparatifs',
    sig: 'Éclaté', integration: 'Les cinq étages', instruments: 'Instruments',
    secteurs: 'Domaines d’emploi', equipe: 'Équipe', labo: 'Journal de laboratoire',
    contact: 'Contact & société', cadrer: 'Demande technique'
  };
  function sections() {
    var main = document.querySelector('main'); if (!main) return [];
    return Array.prototype.filter.call(main.children, function (el) {
      return el.tagName === 'SECTION';
    }).map(function (el, i) {
      var id = el.id || (el.className.split(' ')[0]);
      return { el: el, id: id, n: SECN[id] || SECN[el.className.split(' ')[0]] || id, i: i };
    });
  }
  function applySections() {
    var main = document.querySelector('main'); if (!main) return;
    main.style.display = 'flex'; main.style.flexDirection = 'column';
    var ord = state.__order || [], hid = state.__hidden || [];
    sections().forEach(function (s) {
      var k = ord.indexOf(s.id);
      s.el.style.order = k > -1 ? k : s.i;
      s.el.style.display = hid.indexOf(s.id) > -1 ? 'none' : '';
    });
  }

  /* ---------- CSS d'appui ---------- */
  var EXTRA = '\
.da-on body{line-height:var(--lh,1.62)}\
.da-on h1,.da-on h2,.da-on h3{letter-spacing:var(--tr,-.012em);line-height:var(--mlh,1.2)}\
.da-on .sec{padding-block:var(--secp,100px)}\
.da-on .hero-grid,.da-on .scope-in,.da-on .ct-grid{gap:var(--gapx,44px)}\
.da-on .hero-grid{grid-template-columns:minmax(0,var(--heroCol,.86fr)) minmax(0,1.14fr);\
direction:var(--heroDirD,ltr)}\
.da-on .hero-grid>*{direction:ltr}\
.da-on .fig-stage{aspect-ratio:var(--heroAr,1.6)}\
.da-on .hero-txt{text-align:var(--heroAlign,left)}\
.da-on .hero-txt h1,.da-on .hero-txt .lede{margin-inline:var(--heroMi,0)}\
.da-on .sec>.wrap>.ey,.da-on .sec>.wrap>.h-lg,.da-on .sec>.wrap>.lede{text-align:var(--secAlign,left)}\
.da-on .hero-fig,.da-on .pf-cols figure,.da-on .sc-card,.da-on .lv,.da-on .tm-ph,\
.da-on .tbl-wrap,.da-on .q-o,.da-on .btn,.da-on .lab-sub{border-radius:var(--rad,0)}\
.da-on .hero-fig,.da-on .sc-card,.da-on .lv,.da-on .tbl-wrap,.da-on .lab-sub{border-width:var(--bw,1px)}';

  var panel, hint, open = false, tab = 'typo';

  function styleOnce() {
    if (document.getElementById('da-style')) return;
    var st = document.createElement('style'); st.id = 'da-style';
    st.textContent = EXTRA + '\
.da{position:fixed;right:0;top:0;bottom:0;width:346px;z-index:9999;overflow:auto;\
background:rgba(9,11,14,.975);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);\
border-left:1px solid rgba(255,255,255,.2);padding:0 0 40px;\
font:400 12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;color:#BFC7D0}\
.da-hd{position:sticky;top:0;z-index:2;background:rgba(9,11,14,.99);padding:16px 16px 0}\
.da-hd-t{display:flex;justify-content:space-between;align-items:center;gap:10px;padding-bottom:12px}\
.da-hd-t b{font-weight:400;letter-spacing:.2em;text-transform:uppercase;font-size:10px;color:#F2F5F8}\
.da-x{background:none;border:0;color:#7C8792;cursor:pointer;font-size:17px;line-height:1;padding:2px 4px}\
.da-x:hover{color:#fff}\
.da-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.14);\
border:1px solid rgba(255,255,255,.14)}\
.da-tab{background:#0B0D10;border:0;color:#7C8792;cursor:pointer;padding:9px 2px;\
font:400 8.6px/1 inherit;letter-spacing:.02em;text-transform:uppercase;white-space:nowrap}\
.da-tab.on{background:#5FBDBE;color:#05191A}\
.da-bd{padding:4px 16px 0}\
.da h4{margin:18px 0 9px;font:400 9.5px/1 inherit;letter-spacing:.22em;text-transform:uppercase;color:#5FBDBE}\
.da-r{display:grid;grid-template-columns:1fr auto;gap:3px 10px;align-items:center;margin-bottom:10px}\
.da-r label{font-size:11px;color:#BFC7D0}\
.da-r output{font-size:10px;color:#5FBDBE;font-variant-numeric:tabular-nums}\
.da-r input[type=range]{grid-column:1/-1;width:100%;accent-color:#5FBDBE;height:16px}\
.da-r input[type=color]{grid-column:2;width:40px;height:22px;padding:0;\
border:1px solid rgba(255,255,255,.25);background:none;cursor:pointer}\
.da-sw{grid-column:2;display:flex;gap:1px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.16)}\
.da-sw button{background:#0B0D10;border:0;color:#7C8792;cursor:pointer;padding:5px 9px;font:400 9.5px/1 inherit;\
letter-spacing:.08em;text-transform:uppercase}\
.da-sw button.on{background:#5FBDBE;color:#05191A}\
.da-s{display:grid;grid-template-columns:auto 1fr auto auto auto;gap:0 8px;align-items:center;\
padding:7px 0;border-bottom:1px solid rgba(255,255,255,.09)}\
.da-s span{font-size:11px}\
.da-s i{font-style:normal;font-size:9.5px;color:#535C66;letter-spacing:.1em}\
.da-s button{background:none;border:1px solid rgba(255,255,255,.18);color:#BFC7D0;cursor:pointer;\
width:24px;height:22px;line-height:1;font-size:11px;padding:0}\
.da-s button:hover{border-color:#5FBDBE;color:#fff}\
.da-s.off span{color:#535C66;text-decoration:line-through}\
.da-act{display:grid;gap:8px;margin:20px 16px 0;padding-top:16px;border-top:1px solid rgba(255,255,255,.16)}\
.da-b{background:none;border:1px solid #5FBDBE;color:#F2F5F8;cursor:pointer;padding:10px 12px;\
font:400 10px/1 inherit;letter-spacing:.18em;text-transform:uppercase}\
.da-b:hover{background:#5FBDBE;color:#05191A}\
.da-b--g{border-color:rgba(255,255,255,.22)}\
.da-b--g:hover{background:rgba(255,255,255,.1);color:#fff}\
.da-out{margin:10px 16px 0;width:calc(100% - 32px);height:170px;background:#07080A;color:#BFC7D0;\
border:1px solid rgba(255,255,255,.16);padding:10px;font:400 10px/1.5 inherit;resize:vertical;display:none}\
.da-hint{position:fixed;right:14px;bottom:14px;z-index:9998;font:400 10px/1 ui-monospace,monospace;\
letter-spacing:.18em;text-transform:uppercase;color:#535C66;background:rgba(9,11,14,.88);\
border:1px solid rgba(255,255,255,.14);padding:8px 10px;cursor:pointer}\
.da-hint:hover{color:#F2F5F8;border-color:#5FBDBE}\
@media(max-width:860px){.da{width:100%}}';
    document.head.appendChild(st);
  }

  function row(it) {
    var id = 'da' + it.v.replace(/[^a-z0-9]/gi, '');
    if (it.c) {
      return '<div class="da-r"><label for="' + id + '">' + it.l + '</label>' +
             '<input type="color" id="' + id + '" data-v="' + it.v + '"></div>';
    }
    if (it.sw) {
      return '<div class="da-r"><label>' + it.l + '</label><span class="da-sw" data-v="' + it.v + '">' +
             it.sw.map(function (o) { return '<button type="button" data-o="' + o + '">' + o + '</button>'; }).join('') +
             '</span></div>';
    }
    return '<div class="da-r"><label for="' + id + '">' + it.l + '</label>' +
           '<output id="o' + id + '"></output>' +
           '<input type="range" id="' + id + '" data-v="' + it.v + '" data-u="' + it.u +
           '" min="' + it.min + '" max="' + it.max + '" step="' + it.step + '"></div>';
  }

  function renderBody() {
    var bd = panel.querySelector('.da-bd');
    if (tab === 'sections') {
      var ord = state.__order && state.__order.length ? state.__order : sections().map(function (s) { return s.id; });
      var hid = state.__hidden || [];
      bd.innerHTML = '<h4>Ordre et visibilité</h4>' + ord.map(function (id, i) {
        var s = sections().filter(function (x) { return x.id === id; })[0];
        var name = s ? s.n : (SECN[id] || id);
        return '<div class="da-s' + (hid.indexOf(id) > -1 ? ' off' : '') + '" data-id="' + id + '">' +
               '<i>' + ('0' + (i + 1)).slice(-2) + '</i><span>' + name + '</span>' +
               '<button type="button" data-m="up" aria-label="Monter">↑</button>' +
               '<button type="button" data-m="down" aria-label="Descendre">↓</button>' +
               '<button type="button" data-m="hide" aria-label="Masquer">' + (hid.indexOf(id) > -1 ? '○' : '●') + '</button>' +
               '</div>';
      }).join('') + '<p style="margin:14px 0 0;font-size:10.5px;color:#535C66;line-height:1.6">' +
        'L’ordre est appliqué à la volée. Il figure dans l’export, à reporter dans src/build.js.</p>';

      bd.querySelectorAll('.da-s button').forEach(function (b) {
        b.addEventListener('click', function () {
          var id = b.parentNode.getAttribute('data-id'), m = b.getAttribute('data-m');
          var o = (state.__order && state.__order.length ? state.__order : sections().map(function (s) { return s.id; })).slice();
          var h = (state.__hidden || []).slice();
          var k = o.indexOf(id);
          if (m === 'up' && k > 0) { o.splice(k - 1, 0, o.splice(k, 1)[0]); }
          if (m === 'down' && k < o.length - 1) { o.splice(k + 1, 0, o.splice(k, 1)[0]); }
          if (m === 'hide') { var j = h.indexOf(id); j > -1 ? h.splice(j, 1) : h.push(id); }
          state.__order = o; state.__hidden = h; save(); applySections(); renderBody();
        });
      });
      return;
    }

    var t = TABS.filter(function (x) { return x.id === tab; })[0];
    bd.innerHTML = t.groups.map(function (g) {
      return '<h4>' + g.n + '</h4>' + g.items.map(row).join('');
    }).join('');

    t.groups.forEach(function (g) {
      g.items.forEach(function (it) {
        var id = '#da' + it.v.replace(/[^a-z0-9]/gi, '');
        if (it.sw) {
          var box = bd.querySelector('[data-v="' + it.v + '"]');
          var cur = state[it.v] || it.sw[0];
          box.querySelectorAll('button').forEach(function (b) {
            if (b.getAttribute('data-o') === cur) b.classList.add('on');
            b.addEventListener('click', function () {
              box.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
              b.classList.add('on'); applySwitch(it.v, b.getAttribute('data-o'));
            });
          });
          return;
        }
        var inp = bd.querySelector(id); if (!inp) return;
        if (it.c) {
          inp.value = hex(state[it.v] || css(it.v) || defGrad(it.v));
          inp.addEventListener('input', function () { set(it.v, inp.value); });
        } else {
          var v = state[it.v] || css(it.v);
          var n = num(v); if (!n) n = (it.min + it.max) / 2;
          inp.value = Math.min(it.max, Math.max(it.min, n));
          var out = bd.querySelector('#o' + id.slice(1));
          var show = function () { out.textContent = inp.value + it.u; };
          show();
          inp.addEventListener('input', function () { show(); set(it.v, inp.value + it.u); });
        }
      });
    });
  }

  function defGrad(v) {
    return { '--g1': '#DBE70B', '--g2': '#A2D567', '--g3': '#5FBDBE', '--g4': '#4089BB', '--g5': '#2056AE' }[v] || '#5FBDBE';
  }
  function applySwitch(v, o) {
    state[v] = o; save();
    if (v === '--heroDir') root.style.setProperty('--heroDirD', o === 'reverse' ? 'rtl' : 'ltr');
    else if (v === '--heroAlign') {
      root.style.setProperty('--heroAlign', o);
      root.style.setProperty('--heroMi', o === 'center' ? 'auto' : '0');
    } else root.style.setProperty(v, o);
  }

  function build() {
    styleOnce();
    panel = document.createElement('aside');
    panel.className = 'da'; panel.hidden = true;
    panel.innerHTML =
      '<div class="da-hd"><div class="da-hd-t"><b>Atelier de design</b>' +
      '<button class="da-x" type="button" aria-label="Fermer">×</button></div>' +
      '<div class="da-tabs">' +
      TABS.concat([{ id: 'sections', n: 'Sections' }]).map(function (t) {
        return '<button class="da-tab' + (t.id === tab ? ' on' : '') + '" type="button" data-t="' + t.id + '">' + t.n + '</button>';
      }).join('') + '</div></div>' +
      '<div class="da-bd"></div>' +
      '<div class="da-act">' +
      '<button class="da-b" type="button" data-act="copy">Exporter le CSS</button>' +
      '<button class="da-b da-b--g" type="button" data-act="reset">Tout réinitialiser</button></div>' +
      '<textarea class="da-out" readonly></textarea>';
    document.body.appendChild(panel);

    panel.querySelectorAll('.da-tab').forEach(function (b) {
      b.addEventListener('click', function () {
        panel.querySelectorAll('.da-tab').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on'); tab = b.getAttribute('data-t'); renderBody();
      });
    });
    panel.querySelector('.da-x').addEventListener('click', function () { toggle(false); });
    panel.querySelector('[data-act="reset"]').addEventListener('click', function () {
      Object.keys(state).forEach(function (v) { if (v.indexOf('--') === 0) root.style.removeProperty(v); });
      ['--line', '--line-2', '--spectral', '--mesh', '--heroDirD', '--heroMi'].forEach(function (v) { root.style.removeProperty(v); });
      state = {}; save(); applySections(); renderBody();
    });
    panel.querySelector('[data-act="copy"]').addEventListener('click', function () {
      var lines = Object.keys(state).filter(function (v) { return v.indexOf('--') === 0; })
        .map(function (v) { return '  ' + v + ': ' + state[v] + ';'; });
      var txt = ':root{\n' + lines.join('\n') + '\n}';
      if (state.__order) txt += '\n\n/* Ordre des sections dans src/build.js :\n   ' + state.__order.join(' → ') + ' */';
      if (state.__hidden && state.__hidden.length) txt += '\n/* Masquées : ' + state.__hidden.join(', ') + ' */';
      var ta = panel.querySelector('.da-out');
      ta.style.display = 'block'; ta.value = txt; ta.select();
      try { navigator.clipboard.writeText(txt); } catch (e) {}
    });
    renderBody();
  }

  function toggle(v) {
    open = v == null ? !open : v;
    if (!panel) build();
    panel.hidden = !open;
    root.classList.toggle('da-on', open || Object.keys(state).length > 0);
  }

  /* restauration */
  Object.keys(state).forEach(function (v) {
    if (v.indexOf('--') !== 0) return;
    if (v === '--lineA' || /^--g[1-5]$/.test(v) || v === '--heroDir' || v === '--heroAlign') return;
    root.style.setProperty(v, state[v]);
  });
  if (state['--lineA']) set('--lineA', state['--lineA']);
  if (state['--g1'] || state['--g3']) regrad();
  if (state['--heroDir']) applySwitch('--heroDir', state['--heroDir']);
  if (state['--heroAlign']) applySwitch('--heroAlign', state['--heroAlign']);
  if (Object.keys(state).length) { styleOnce(); root.classList.add('da-on'); }

  function ready() {
    applySections();
    var local = /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname) || location.protocol === 'file:';
    var asked = /[?&]da=1/.test(location.search);
    if (local || asked) {
      hint = document.createElement('button');
      hint.type = 'button'; hint.className = 'da-hint'; hint.textContent = 'Design · D';
      hint.addEventListener('click', function () { toggle(true); });
      styleOnce(); document.body.appendChild(hint);
    }
    if (asked) toggle(true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && open) return toggle(false);
    var t = e.target.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'd' || e.key === 'D') toggle();
  });
})();
