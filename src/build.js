/* ============================================================
   SMA-RTY — générateur statique (v5)
   Run: node src/build.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const { logo } = require('./logo.js');
const { site, NAV, POC, HEROSEQ, SPECS, CASES, LEGAL, FOOT, PROOF, METRICS, STAGES, RANGE, SECTORS, TRUST, LAB, TEAM, QUAL, CONTACT, UI } = require('./content.js');

const ROOT = path.resolve(__dirname, '..');
const LANGS = ['fr', 'en'];
const T  = (o,l) => (o && typeof o==='object' && !Array.isArray(o) && 'fr' in o) ? (o[l] ?? o.fr) : o;
const TL = (o,l) => Array.isArray(o) ? o : (o && 'fr' in o ? (o[l] ?? o.fr) : o);
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const A = p => p;

/* ---------- document ---------- */
function head(l,o,base){
  base = base || '..';
  const kit = site.typekit
    ? `<link rel="stylesheet" href="https://use.typekit.net/${site.typekit}.css">`
    : '';
  return `<!doctype html>
<html lang="${l}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<meta name="robots" content="noindex,nofollow">
<meta name="theme-color" content="#07080A">
${kit}
<link rel="stylesheet" href="${A(base+'/assets/css/style.css')}">
</head>`;
}

/* ---------- en-tête ---------- */
function header(l){
  const alt = l==='fr' ? 'en' : 'fr';
  return `<header class="hd">
  <button class="hd-menu" aria-label="${l==='fr'?'Ouvrir le menu':'Open menu'}" aria-expanded="false" data-menu>
    <span class="hd-burger" aria-hidden="true"></span><span>${esc(T(UI.menu,l))}</span>
  </button>
  <span class="hd-div" aria-hidden="true"></span>
  <a class="hd-lang" href="../${alt}/">${alt.toUpperCase()}</a>
  <a class="hd-mark" href="./" aria-label="SMARTY France">
    ${logo('hd')}<span class="hd-sub">${site.sub}</span>
  </a>
  <a class="hd-cta" href="#cadrer">${esc(T(UI.cta,l))}</a>
</header>
<nav class="ovl" data-overlay hidden aria-label="Navigation">
  <div class="wrap ovl-in">
    <ol class="ovl-list">
      ${NAV.map((n,i)=>`<li><a href="#${n.id}">
        <span class="ovl-n">0${i+1}</span>
        <span class="ovl-t">${esc(T(n.n,l))}</span>
        <span class="ovl-d">${esc(T(n.d,l))}</span></a></li>`).join('')}
    </ol>
    <a class="ovl-cta" href="#cadrer">${esc(T(UI.cta,l))} →</a>
  </div>
</nav>`;
}

/* ---------- hero : images plein écran en bande horizontale ----------
   La course verticale de .hx est convertie en translation horizontale de
   .hx-track par assets/js/main.js. Sans JS, en mouvement réduit ou sur
   petit écran, .hx-track reste un défileur horizontal natif. ----------- */
/* Pas de loading="lazy" sur les images du hero : ce sont des transform, et non
   le scroll, qui amènent les panneaux à l'écran ; le navigateur ne réévalue pas
   le différé dans ce cas et les images 3 et 4 restaient vides. */
function hero(l){
  const frames = HEROSEQ.map(f => {
    const p = POC.filter(x => x.id === f.poc)[0];
    const y = p && p.layers.filter(z => z.id === f.layer)[0];
    return (p && y) ? { p, y } : null;
  }).filter(Boolean);

  const panels = frames.map(({p, y}, i) => `<article class="hxp" data-hxp data-scene="${p.id}">
        <img class="hxl" src="${A('../assets/media/poc/'+y.img)}" alt="${esc(T(p.label,l))}, ${esc(T(y.n,l))}"
             decoding="async" fetchpriority="${i===0?'high':'low'}">
        <div class="hxp-cap">
          <p class="hxp-hd"><span class="hxp-b">${esc(T(y.n,l))}${y.w?` <u>${esc(y.w)}</u>`:''}</span>
            </p>
          <h2 class="hxp-t">${esc(T(p.label,l))}</h2>
          <p class="hxp-tel">${esc(T(p.metric,l))}<i>${esc(T(p.gear,l))}</i></p>
        </div>
      </article>`).join('\n        ');

  return `<section class="hero" data-hero>
  <h1 class="sr-only">${esc(T(UI.heroH,l))}</h1>
  <div class="hx" data-hx>
    <div class="hx-pin">
      <div class="hx-track" data-hx-track>
        ${panels}
      </div>

      <div class="hx-hud" aria-hidden="true"><span class="hx-bar"><i data-hx-bar></i></span></div>
    </div>
  </div>
</section>`;
}

function band(l){
  return `<section class="band" data-band>
  <div class="wrap band-grid">
    ${METRICS.map(m=>`<div class="mt">
      <b>${m.pre?`<i>${m.pre}</i>`:''}<span data-count="${m.n}" data-suf="${esc(m.suf)}">0${esc(m.suf)}</span></b>
      ${m.spectral?'<span class="mt-sp" aria-hidden="true"></span>':''}
      <span class="mt-l">${esc(T(m.l,l))}</span><span class="mt-s">${esc(T(m.s,l))}</span>
    </div>`).join('')}
  </div>
  <p class="wrap band-note">${esc(T(UI.note,l))}</p>
</section>`;
}

function scope(l){
  return `<section class="sec scope">
  <div class="wrap scope-in">
    <div>
      <p class="ey">${esc(T(UI.posEy,l))}</p>
      <h2 class="h-md">${esc(T(UI.posH,l))}</h2>
    </div>
    <div>
      <p class="para">${esc(T(UI.posP,l))}</p>
      <ul class="tick-list">${TL(UI.posLi,l).map(t=>`<li>${esc(t)}</li>`).join('')}</ul>
    </div>
  </div>
</section>`;
}

function proof(l){
  return `<section class="sec sec--soft" id="capacites">
  <div class="wrap">
    <p class="ey">${esc(T(UI.proofEy,l))}</p>
    <h2 class="h-lg">${esc(T(UI.proofH,l))}</h2>
    <p class="lede">${esc(T(UI.proofP,l))}</p>
    ${PROOF.map(b=>`<article class="pf">
      <div class="pf-head"><h3>${esc(T(b.h,l))}</h3><p>${esc(T(b.p,l))}</p></div>
      <div class="pf-cols pf-${b.cols.length}">
        ${b.cols.map(c=>`<figure${c.mark?' class="mark"':''}>
          <img src="${A('../assets/media/poc/'+c.img)}" alt="${esc(T(c.n,l))}" loading="lazy">
          <figcaption>${esc(T(c.n,l))}</figcaption></figure>`).join('')}
      </div>
      <p class="pf-meta"><span>${esc(T(b.metric,l))}</span><span class="dot">·</span><span>${esc(T(b.gear,l))}</span></p>
    </article>`).join('')}

    <p class="ey cs-ey">${esc(T(CASES.ey,l))}</p>
    <h3 class="h-md">${esc(T(CASES.h,l))}</h3>
    ${CASES.items.map(b=>`<article class="pf">
      <div class="pf-head"><h3>${esc(T(b.h,l))}</h3><p>${esc(T(b.p,l))}</p></div>
      <div class="pf-cols pf-${b.cols.length}">
        ${b.cols.map(c=>`<figure>
          <img src="${A('../assets/media/projets/'+c.img)}" alt="${esc(T(c.n,l))}" loading="lazy">
          <figcaption>${esc(T(c.n,l))}</figcaption></figure>`).join('')}
      </div>
      <p class="pf-meta"><span>${esc(T(b.metric,l))}</span><span class="dot">·</span><span>${esc(T(b.gear,l))}</span></p>
    </article>`).join('')}
  </div>
</section>`;
}

/* ---------- signature : éclaté, légendes cliquables ---------- */
function signature(l){
  return `<section class="sig" data-sig>
  <div class="sig-track"><div class="sig-stick">
    <div class="sig-stage">
      <div class="sig-stack">
        ${STAGES.map((s,i)=>`<div class="pc" data-pc="${i}" style="--r:${(s.r/438).toFixed(3)};--i:${i}">
           <img src="${A('../assets/media/brand/'+s.img)}" alt="">
           <a class="pc-t" href="#et-${s.id}" data-jump="${s.id}">
             <span class="pc-n">0${i+1}</span><span class="pc-l">${esc(T(s.n,l))}</span><span class="pc-x">→</span>
           </a>
         </div>`).join('')}
      </div>
    </div>
    <figcaption class="wrap sig-cap">
      <b class="sig-n">${esc(T(UI.sigN,l))}</b>
      <span class="sig-k">${esc(T(UI.sigK,l))}</span>
    </figcaption>
  </div></div>
</section>`;
}

/* ---------- les cinq étages : la vraie information ---------- */
function stages(l){
  return `<section class="sec" id="integration">
  <div class="wrap">
    <p class="ey">${esc(T(UI.stEy,l))}</p>
    <h2 class="h-lg">${esc(T(UI.stH,l))}</h2>
    <p class="lede">${esc(T(UI.stP,l))}</p>
    <div class="st-list">
      ${STAGES.map((s,i)=>`<article class="st" id="et-${s.id}" data-stage="${s.id}">
        <div class="st-k">
          <span class="st-n">0${i+1}</span>
          <img class="st-img" src="${A('../assets/media/brand/'+s.img)}" alt="" loading="lazy">
          <h3>${esc(T(s.n,l))}</h3>
        </div>
        <div class="st-b">
          <p class="st-h">${esc(T(s.h,l))}</p>
          <p class="para">${esc(T(s.p,l))}</p>
          <p class="st-mod-t">${esc(T(UI.stMod,l))}</p>
          <ul class="st-mod">${TL(s.mod,l).map(m=>`<li>${esc(m)}</li>`).join('')}</ul>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`;
}

function range(l){
  const c = TL(RANGE.cols,l);
  const steps = l==='fr'
    ? [['Mise en forme FPGA','Correction, recalage, horodatage, au fil du flux pixel.'],
       ['Inférence GPU','Détection et suivi à bord, à la cadence capteur.'],
       ['CPU hôte libre','Le processeur du porteur reste à la fonction système.']]
    : [['FPGA shaping','Correction, registration, time-stamping, on the pixel stream.'],
       ['GPU inference','Detection and tracking on board, at sensor rate.'],
       ['Host CPU free','The platform processor stays on the system function.']];
  return `<section class="sec sec--soft" id="instruments">
  <div class="wrap">
    <p class="ey">${esc(T(UI.rangeEy,l))}</p>
    <h2 class="h-lg">${esc(T(UI.rangeH,l))}</h2>
    <p class="lede">${esc(T(UI.rangeP,l))}</p>

    <div class="in-grid">
      ${RANGE.cards.map(k=>`<article class="in" id="in-${k.id}">
        <div class="in-fig">
          <img src="${A('../assets/media/instruments/'+k.img)}" alt="${esc(T(k.n,l))}" loading="lazy"
               onerror="this.style.display='none';this.parentNode.classList.add('in-fig--none')">
          <span class="in-ghost" aria-hidden="true"></span>
        </div>
        <p class="in-b">${esc(T(k.b,l))}</p>
        <h3 class="in-n">${esc(T(k.n,l))}</h3>
        <p class="in-h">${esc(T(k.h,l))}</p>
        <p class="in-p">${esc(T(k.p,l))}</p>
        ${k.award?`<p class="in-aw">${esc(T(k.award,l))}</p>`:''}
        <a class="in-go" href="./instruments/${k.slug}/">${esc(T(RANGE.more,l))} →</a>
      </article>`).join('')}
    </div>

    <h3 class="tbl-h">${esc(T(UI.rangeTbl,l))}</h3>
    <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr>${c.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead>
        <tbody>${RANGE.rows.map(r=>`<tr>
          <td class="tbl-k">${esc(T(r.k,l))}</td><td class="tbl-m">${esc(T(r.b,l))}</td>
          <td>${esc(T(r.f,l))}</td><td>${esc(T(r.o,l))}</td><td class="tbl-s">${esc(T(r.s,l))}</td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
    <p class="tbl-note">${esc(T(RANGE.note,l))}</p>


    <h3 class="pipe-h">${esc(T(UI.pipeH,l))}</h3>
    <ol class="pipe">${steps.map(([h,d],i)=>`<li><span class="pipe-n">0${i+1}</span><b>${esc(h)}</b><span>${esc(d)}</span></li>`).join('')}</ol>
  </div>
</section>`;
}

function sectors(l){
  const thumb = id => { const p=[...POC,...PROOF].find(x=>x.id===id);
    return p && p.layers ? p.layers[p.layers.length-1].img
         : (p && p.cols ? p.cols[p.cols.length-1].img : 'poc-nocturne-lwir.jpg'); };
  return `<section class="sec" id="secteurs">
  <div class="wrap">
    <p class="ey">${esc(T(UI.secEy,l))}</p>
    <h2 class="h-lg">${esc(T(UI.secH,l))}</h2>
    <div class="sec-grid">
      ${SECTORS.map(s=>`<article class="sc-card" id="${s.id}">
        <span class="sc-img"><img src="${A('../assets/media/poc/'+thumb(s.poc))}" alt="" loading="lazy"></span>
        <span class="sc-n">${esc(T(s.n,l))}</span>
        <span class="sc-d">${esc(T(s.d,l))}</span>
        <button class="sc-go" type="button" data-seed="${esc(T(s.seed,l))}">${esc(T(UI.secCta,l))} →</button>
      </article>`).join('')}
    </div>
  </div>
</section>`;
}

/* ---------- références & conformité ---------- */
function trust(l){
  return `<section class="sec sec--soft" id="confiance">
  <div class="wrap">
    <p class="ey">${esc(T(TRUST.ey,l))}</p>
    <h2 class="h-lg">${esc(T(TRUST.h,l))}</h2>
    <p class="lede">${esc(T(TRUST.p,l))}</p>
    <div class="tr-grid">
      ${TRUST.groups.map(g=>`<section class="tr-g">
        <h3 class="tr-gn">${esc(T(g.n,l))}</h3>
        <ul class="tr-l">
          ${g.items.map(i=>`<li class="tr-i tr-i--${i.st}">
            <span class="tr-t">${esc(T(i.t,l))}${i.st==='tbc'?`<em>${esc(T(UI.tbc,l))}</em>`:''}</span>
            <span class="tr-d">${esc(T(i.d,l))}</span></li>`).join('')}
        </ul>
      </section>`).join('')}
    </div>
    <aside class="tr-cl">
      <h3>${esc(T(TRUST.clearance.t,l))}</h3>
      <p>${esc(T(TRUST.clearance.d,l))}</p>
    </aside>
  </div>
</section>`;
}

/* ---------- équipe : portraits grand format, CV au survol ---------- */
function team(l){
  const L = TEAM.labels;
  return `<section class="sec" id="equipe">
  <div class="wrap">
    <p class="ey">${esc(T(TEAM.ey,l))}</p>
    <h2 class="h-lg">${esc(T(TEAM.h,l))}</h2>
    <p class="lede">${esc(T(TEAM.p,l))}</p>
    <p class="tm-hint">${esc(T(TEAM.hint,l))}</p>
    <div class="tm-grid">
      ${TEAM.members.map(m=>`<article class="tm" tabindex="0">
        <div class="tm-ph">
          <img src="${A('../assets/media/team/'+m.ph)}" alt="${esc(m.n)}" loading="lazy"
               onerror="this.style.display='none';this.parentNode.classList.add('tm-ph--none')">
          <span class="tm-ini" aria-hidden="true">${esc(m.ini)}</span>
          <div class="tm-cv">
            <dl>
              <div><dt>${esc(T(L.edu,l))}</dt><dd>${esc(T(m.edu,l))}</dd></div>
              <div><dt>${esc(T(L.from,l))}</dt><dd>${esc(T(m.from,l))}</dd></div>
              <div><dt>${esc(T(L.yrs,l))}</dt><dd>${esc(T(m.yrs,l))}</dd></div>
              <div><dt>${esc(T(L.out,l))}</dt><dd>${esc(T(m.out,l))}</dd></div>
            </dl>
            <p class="tm-bio">${esc(T(m.bio,l))}</p>
          </div>
        </div>
        <h3 class="tm-n">${esc(m.n)}</h3>
        <p class="tm-r">${esc(T(m.role,l))}</p>
        <p class="tm-q">${esc(T(m.dom,l))}</p>
        ${m.rg?`<div><a class="tm-li" href="${m.rg}" target="_blank" rel="noopener">${esc(T(L.pub,l))} →</a></div>`:''}
        <div><a class="tm-li" href="${m.li || '#'}"${m.li?' target="_blank" rel="noopener"':''}>${esc(T(L.li,l))} →</a></div>
      </article>`).join('')}
    </div>
    <p class="tm-src">${esc(T(TEAM.src,l))}</p>
  </div>
</section>`;
}

/* ---------- journal de laboratoire : vidéo de banc + article ---------- */
function lab(l){
  const S = LAB.sub;
  return `<section class="sec sec--soft lab" id="labo">
  <div class="wrap">
    <p class="ey">${esc(T(LAB.ey,l))}</p>
    <h2 class="h-lg">${esc(T(LAB.h,l))}</h2>
    <p class="lede">${esc(T(LAB.p,l))}</p>

    <div class="lab-grid">
      ${LAB.entries.map(e=>`<article class="lv" data-band="${e.bandv}">
        <a class="lv-fig" href="${e.url || '#labo'}"${e.url?' target="_blank" rel="noopener"':''}
           aria-label="${esc(T(LAB.play,l))} : ${esc(T(e.t,l))}">
          <img src="${A('../assets/media/poc/'+e.thumb)}" alt="" loading="lazy">
          <span class="lv-play" aria-hidden="true"></span>
          <span class="lv-dur">${esc(e.dur)}</span>
          <span class="lv-ep">${esc(T(LAB.epi,l))} ${String(e.ep).padStart(2,'0')}</span>
          <span class="lv-band lv-band--${e.bandv}">${esc(e.band)}</span>
        </a>
        <div class="lv-b">
          <p class="lv-m"><span>${esc(e.d)}</span><span class="dot">·</span><span>${esc(T(e.bench,l))}</span></p>
          <h3>${esc(T(e.t,l))}</h3>
          <p class="lv-p">${esc(T(e.p,l))}</p>
          <p class="lv-act">
            <a class="lv-a" href="${e.url || '#labo'}"${e.url?' target="_blank" rel="noopener"':''}>${esc(T(LAB.play,l))} →</a>
            ${e.paper
              ? `<a class="lv-a lv-a--2" href="${e.paper}" target="_blank" rel="noopener">${esc(T(LAB.read,l))} →</a>`
              : `<span class="lv-soon">${esc(T(LAB.soon,l))}</span>`}
          </p>
        </div>
      </article>`).join('')}
    </div>

    <form class="lab-sub" data-lab>
      <div class="lab-sub-h">
        <h3>${esc(T(S.t,l))}</h3>
        <p>${esc(T(S.d,l))}</p>
      </div>
      <div class="lab-sub-b">
        <div class="lab-chips" data-lab-bands>
          ${S.bands.map(b=>`<button type="button" class="q-o q-o--sm" data-v="${b.v}">${esc(T(b.t,l))}</button>`).join('')}
        </div>
        <div class="lab-chips" data-lab-depth>
          ${S.depth.map(b=>`<button type="button" class="q-o q-o--sm" data-v="${b.v}">${esc(T(b.t,l))}</button>`).join('')}
        </div>
        <div class="lab-mail">
          <label><span>${esc(T(S.mail,l))}</span><input type="email" name="mail" required autocomplete="email"></label>
          <button type="submit" class="btn">${esc(T(S.send,l))}</button>
        </div>
      </div>
    </form>
  </div>
</section>`;
}

function company(l){
  const C = CONTACT, K = C.labels;
  const tel = site.tel
    ? `<a href="tel:${site.tel.replace(/\s/g,'')}">${esc(site.tel)}</a>`
    : `<em class="tbc">${esc(T(C.telTBC,l))}</em>`;
  return `<section class="sec soc" id="contact">
  <div class="wrap">
    <p class="ey">${esc(T(C.ey,l))}</p>
    <h2 class="h-lg">${esc(T(C.h,l))}</h2>

    <div class="ct-grid">
      <div class="ct-col">
        <h3 class="ct-t">${esc(T(C.coords,l))}</h3>
        <dl class="ct-dl">
          <div><dt>${esc(T(K.adr,l))}</dt><dd>${site.adresse.map(x=>esc(x)).join('<br>')}</dd></div>
          <div><dt>${esc(T(K.tel,l))}</dt><dd>${tel}</dd></div>
          <div><dt>${esc(T(K.mail,l))}</dt><dd><a href="mailto:${site.mail}">${esc(site.mail)}</a></dd></div>
          <div><dt>${esc(T(K.support,l))}</dt><dd><a href="mailto:${site.support}">${esc(site.support)}</a></dd></div>
        </dl>
        <h3 class="ct-t">${esc(T(C.legal,l))}</h3>
        <dl class="ct-dl">
          <div><dt>${esc(T(K.rs,l))}</dt><dd>SMA-RTY SAS</dd></div>
          <div><dt>${esc(T(K.forme,l))}</dt><dd>${esc(T(C.forme,l))}</dd></div>
          <div><dt>${esc(T(K.cree,l))}</dt><dd>${site.cree}</dd></div>
          <div><dt>${esc(T(K.siren,l))}</dt><dd>${esc(site.siren)}</dd></div>
          <div><dt>${esc(T(K.siret,l))}</dt><dd>${esc(site.siret)}</dd></div>
          <div><dt>${esc(T(K.tva,l))}</dt><dd>${esc(site.tva)}</dd></div>
        </dl>
        <p><a class="lnk" href="./${T(LEGAL.privacy.slug,l)}/">${esc(T(LEGAL.privacy.h,l))} →</a></p>
      </div>

      <div class="ct-col ct-col--w">
        <h3 class="ct-t">${esc(T(C.gen,l))}</h3>
        <p class="para">${esc(T(C.genP,l))}</p>
        <h3 class="ct-t">${esc(T(C.eco,l))}</h3>
        <ul class="tick-list">${TL(C.ecoL,l).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
        <h3 class="ct-t">${esc(T(C.grp,l))}</h3>
        <p class="para ct-grp">${esc(site.groupe.it)}</p>
      </div>
    </div>
  </div>
</section>`;
}

function qualifier(l){
  return `<section class="qual" id="cadrer" data-qual>
  <div class="wrap qual-in">
    <div class="qual-top">
      <p class="ey">${esc(T(QUAL.ey,l))}</p>
      <h2 class="qual-h">${esc(T(QUAL.h,l))}</h2>
      <p class="qual-intro">${esc(T(QUAL.intro,l))}</p>
      <p class="qual-sla">${esc(T(QUAL.sla,l))}</p>
    </div>
    <div class="qual-body" data-qual-body></div>
    <ul class="qual-recap" data-qual-recap aria-live="polite"></ul>
  </div>
</section>`;
}

/* ---------- pied de page ----------
   `base` : chemin vers la racine du site depuis la page rendue.
   Le dégradé suit le pointeur, cf. assets/js/main.js. */
function footer(l, base){
  const root = `${base}/${l}/`;
  const cols = FOOT.cols.map(c=>{
    let links;
    if (c.range)      links = RANGE.cards.map(k=>({n:T(k.n,l), h:`${root}instruments/${k.slug}/`}));
    else if (c.legal) links = Object.keys(LEGAL).map(k=>({n:T(LEGAL[k].h,l), h:`${root}${T(LEGAL[k].slug,l)}/`}));
    else              links = c.l.map(x=>({n:T(x.n,l), h:`${root}${x.h}`}));
    return `<div class="ft-col">
      <p class="ft-t">${esc(T(c.t,l))}</p>
      <ul>${links.map(x=>`<li><a href="${x.h}">${esc(x.n)}</a></li>`).join('')}</ul>
    </div>`;
  }).join('');
  return `<footer class="ft" data-ft>
  <span class="ft-glow" aria-hidden="true"></span>
  <div class="ft-in">
    <a class="ft-mark" href="${root}" aria-label="SMARTY France">${logo('ft')}</a>
    <div class="ft-grid">
      <address class="ft-adr">${site.adresse.map(x=>esc(x)).join('<br>')}</address>
      ${cols}
      <div class="ft-col ft-mail">
        <p class="ft-t">${esc(T(CONTACT.labels.mail,l))}</p>
        <ul>
          <li><a href="mailto:${site.mail}">${esc(site.mail)}</a></li>
          <li><a href="mailto:${site.support}">${esc(site.support)}</a></li>
        </ul>
      </div>
    </div>
    <div class="ft-base">
      <span>© <span data-year>2026</span> SMA-RTY SAS · SIREN ${esc(site.siren)}</span>
      <a class="ft-top" href="#">${esc(T(FOOT.top,l))} ↑</a>
    </div>
  </div>
</footer>`;
}

/* ---------- en-tête des sous-pages ---------- */
function subHeader(l, base, altHref){
  const alt = l==='fr' ? 'en' : 'fr';
  return `<header class="hd">
  <a class="hd-lang" href="${altHref}">${alt.toUpperCase()}</a>
  <a class="hd-mark" href="${base}/${l}/" aria-label="SMARTY France">
    ${logo('hd')}<span class="hd-sub">${site.sub}</span>
  </a>
  <a class="hd-cta" href="${base}/${l}/#cadrer">${esc(T(UI.cta,l))}</a>
</header>`;
}

/* ---------- fiche instrument ---------- */
function instrumentPage(l, k){
  const alt  = l==='fr' ? 'en' : 'fr';
  const unit = SPECS.units.filter(x => x.id === k.spec)[0];
  const sc   = TL(SPECS.cols,l);
  /* cartes et lignes du tableau sont dans le même ordre */
  const row  = RANGE.rows[RANGE.cards.indexOf(k)];
  const cols = TL(RANGE.cols,l);
  return `${head(l,{title:T(k.n,l)+' · SMA-RTY France', desc:T(k.h,l)},'../../..')}
<body>
${subHeader(l,'../../..', `../../../${alt}/instruments/${k.slug}/`)}
<main>
<section class="sec">
  <div class="wrap">
    <p class="ey">${esc(T(k.b,l))}</p>
    <h1 class="h-lg">${esc(T(k.n,l))}</h1>
    <p class="lede">${esc(T(k.h,l))}</p>
    <figure class="in-fig ip-fig">
      <img src="${A('../../../assets/media/instruments/'+k.img)}" alt="${esc(T(k.n,l))}" decoding="async">
    </figure>
    <p class="para">${esc(T(k.p,l))}</p>
    ${k.award?`<p class="in-aw">${esc(T(k.award,l))}</p>`:''}
    ${row?`<dl class="ct-dl ip-dl">
      <div><dt>${esc(cols[2])}</dt><dd>${esc(T(row.f,l))}</dd></div>
      <div><dt>${esc(cols[3])}</dt><dd>${esc(T(row.o,l))}</dd></div>
      <div><dt>${esc(cols[4])}</dt><dd>${esc(T(row.s,l))}</dd></div>
    </dl>`:''}
    ${unit?`<h2 class="tbl-h">${esc(T(SPECS.h,l))}</h2>
    <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr>${sc.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead>
        <tbody>${unit.rows.map(r=>`<tr>
          <td class="tbl-k">${esc(T(r.k,l))}</td>
          <td>${esc(T(r.v,l))}${r.c?` <span class="tbl-s">· ${esc(T(r.c,l))}</span>`:''}</td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
    <p class="tbl-note">${esc(T(SPECS.p,l))}</p>`:''}
    <p class="ip-act">
      <a class="btn" href="../../../${l}/#cadrer">${esc(T(UI.cta,l))}</a>
      <a class="lnk" href="../../../${l}/#instruments">${esc(T(RANGE.back,l))} →</a>
    </p>
  </div>
</section>
</main>
${footer(l,'../../..')}
<script src="${A('../../../assets/js/main.js')}" defer></script>
</body></html>`;
}

/* ---------- page légale autonome ---------- */
function legalPage(l, doc){
  const alt = l==='fr' ? 'en' : 'fr';
  const back = l==='fr' ? 'Retour au site' : 'Back to site';
  return `${head(l,{title:T(doc.h,l)+' · SMA-RTY France', desc:T(doc.intro,l)},'../..')}
<body>
${subHeader(l,'../..', `../../${alt}/${T(doc.slug,alt)}/`)}
<main>
<section class="sec">
  <div class="wrap">
    <p class="ey">${esc(T(doc.ey,l))}</p>
    <h1 class="h-lg">${esc(T(doc.h,l))}</h1>
    <p class="lede">${esc(T(doc.intro,l))}</p>
    ${doc.sections.map(sec=>`<h2 class="h-md">${esc(T(sec.h,l))}</h2>
    ${sec.p.map(par=>`<p class="para">${esc(T(par,l))}</p>`).join('')}`).join('')}
    <dl class="ct-dl">
      <div><dt>${esc(T(CONTACT.labels.mail,l))}</dt><dd><a href="mailto:${site.mail}">${esc(site.mail)}</a></dd></div>
      <div><dt>${esc(T(CONTACT.labels.support,l))}</dt><dd><a href="mailto:${site.support}">${esc(site.support)}</a></dd></div>
    </dl>
    <p class="tbl-note">${esc(T(doc.updated,l))}</p>
    <p><a class="lnk" href="../../${l}/">${esc(back)} →</a></p>
  </div>
</section>
</main>
${footer(l,'../..')}
<script src="${A('../../assets/js/main.js')}" defer></script>
</body></html>`;
}

/* L'atelier de design (assets/js/da.js) n'est plus chargé : le README demande
   de le retirer avant mise en ligne. Pour le réactiver en local, ajouter une
   balise script pointant vers ../assets/js/da.js juste avant </body>. */
function page(l){
  const o = { title: l==='fr'
      ? 'SMA-RTY France · Caméras multispectrales et calcul embarqué'
      : 'SMA-RTY France · Multispectral cameras and embedded compute',
    desc: T(UI.heroP,l) };
  const boot = {
    lang:l,
    poc: POC.map(p=>({id:p.id,start:p.start,
      layers:p.layers.map(y=>({id:y.id,n:T(y.n,l),w:y.w})),
      where:T(p.where,l),metric:T(p.metric,l),gear:T(p.gear,l)})),
    qual:{
      steps: QUAL.steps.map(s=>({id:s.id,br:s.br||null,multi:!!s.multi,q:T(s.q,l),
        o:s.o.map(x=>({v:x.v,t:T(x.t,l),go:x.go||null,ack:x.ack?T(x.ack,l):null}))})),
      next: Object.keys(QUAL.next).reduce((a,k)=>(a[k]=T(QUAL.next[k],l),a),{}),
      t:{ back:T(QUAL.back,l), skip:T(QUAL.skip,l), send:T(QUAL.send,l),
          mailL:T(QUAL.mailL,l), orgL:T(QUAL.orgL,l), freeL:T(QUAL.freeL,l),
          freeP:T(QUAL.freeP,l), done:T(QUAL.done,l), nextT:T(QUAL.nextT,l) } },
    labDone: T(LAB.sub.done,l),
  };
  return `${head(l,o)}
<body>
<div class="proto">${esc(T(UI.proto,l))}</div>
${header(l)}
<main>
${hero(l)}
${band(l)}
${scope(l)}
${proof(l)}
${signature(l)}
${stages(l)}
${range(l)}
${sectors(l)}
${TRUST.publish ? trust(l) : ''}
${team(l)}
${lab(l)}
${company(l)}
${qualifier(l)}
</main>
${footer(l,'..')}
<script>window.__B=${JSON.stringify(boot)};</script>
<script src="${A('../assets/js/main.js')}" defer></script>
</body></html>`;
}

LANGS.forEach(l=>{
  const dir = path.join(ROOT,l);
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'index.html'), page(l));
  /* pages légales : une seule pour l'instant, la confidentialité.
     Conditions de vente et mentions légales : rien à importer (cf. import-inventaire.md). */
  RANGE.cards.forEach(k=>{
    const sub = path.join(dir,'instruments',k.slug);
    fs.mkdirSync(sub,{recursive:true});
    fs.writeFileSync(path.join(sub,'index.html'), instrumentPage(l,k));
  });
  Object.keys(LEGAL).forEach(k=>{
    const doc = LEGAL[k];
    const sub = path.join(dir, T(doc.slug,l));
    fs.mkdirSync(sub,{recursive:true});
    fs.writeFileSync(path.join(sub,'index.html'), legalPage(l,doc));
  });
});
fs.writeFileSync(path.join(ROOT,'index.html'),
  `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=./fr/"><a href="./fr/">SMA-RTY</a>`);
console.log('Généré : fr/ en/ + redirection racine');
