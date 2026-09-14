/* ============================================================
   SMA-RTY — générateur statique (v5)
   Run: node src/build.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const { logo } = require('./logo.js');
const { site, NAV, POC, PROOF, METRICS, STAGES, RANGE, SECTORS, TRUST, LAB, TEAM, QUAL, CONTACT, UI } = require('./content.js');

const ROOT = path.resolve(__dirname, '..');
const LANGS = ['fr', 'en'];
const T  = (o,l) => (o && typeof o==='object' && !Array.isArray(o) && 'fr' in o) ? (o[l] ?? o.fr) : o;
const TL = (o,l) => Array.isArray(o) ? o : (o && 'fr' in o ? (o[l] ?? o.fr) : o);
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const A = p => p;

/* ---------- document ---------- */
function head(l,o){
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
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${kit}
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap">
<link rel="stylesheet" href="${A('../assets/css/style.css')}">
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

/* ---------- hero : fenêtre d'instrument, pas plein écran ---------- */
function hero(l){
  const scenes = POC.map((p,i)=>`<figure class="sc${i===0?' on':''}" data-scene="${p.id}">
      ${p.layers.map(y=>`<img class="ly${y.id===p.start?' on':''}" data-layer="${y.id}" src="${A('../assets/media/poc/'+y.img)}" alt="" loading="${i===0?'eager':'lazy'}">`).join('')}
    </figure>`).join('');
  const tabs = POC.map((p,i)=>`<button class="hb${i===0?' on':''}" data-poc="${p.id}" role="tab" aria-selected="${i===0}">
      <span class="hb-k">${esc(T(p.k,l))}</span><span class="hb-l">${esc(T(p.label,l))}</span></button>`).join('');
  return `<section class="hero" data-hero>
  <div class="wrap hero-grid">

    <div class="hero-txt">
      <h1>${esc(T(UI.heroH,l))}</h1>
      <p class="lede">${esc(T(UI.heroP,l))}</p>
      <div class="hero-act">
        <a class="btn" href="#cadrer">${esc(T(UI.cta,l))}</a>
        <a class="lnk" href="#labo">${esc(T(UI.heroLab,l))} →</a>
      </div>
      <dl class="hero-kv">
        ${METRICS.slice(0,3).map(m=>`<div><dt>${esc(m.pre)}${m.n}${esc(m.suf)}</dt><dd>${esc(T(m.l,l))}</dd></div>`).join('')}
      </dl>
    </div>

    <figure class="hero-fig">
      <figcaption class="fig-rail fig-rail--t">
        <span class="fig-prev">${esc(T(UI.heroPrev,l))}</span>
        <span class="fig-band" data-bandlabel>LWIR</span>
        <span class="fig-sp"></span>
        <span data-metric>${esc(T(POC[0].metric,l))}</span>
        <span class="fig-gear" data-gear>${esc(T(POC[0].gear,l))}</span>
      </figcaption>
      <div class="fig-stage">
        <div class="fig-img">${scenes}</div>
        <div class="fig-ladder" data-layers role="group" aria-label="${l==='fr'?'Bande affichée':'Displayed band'}"></div>
        <span class="tick tick--tl" aria-hidden="true"></span><span class="tick tick--tr" aria-hidden="true"></span>
        <span class="tick tick--bl" aria-hidden="true"></span><span class="tick tick--br" aria-hidden="true"></span>
      </div>
      <p class="fig-rail fig-rail--b" data-where>${esc(T(POC[0].where,l))}</p>
    </figure>

  </div>
  <div class="wrap hero-tabs" role="tablist">${tabs}</div>
  <span class="spectral-rule" aria-hidden="true"></span>
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
  </div>
</section>`;
}

/* ---------- signature : éclaté, légendes cliquables ---------- */
function signature(l){
  return `<section class="sig" data-sig>
  <div class="sig-track"><div class="sig-stick">
    <div class="sig-stage">
      <div class="sig-stack">
        ${STAGES.map((s,i)=>`<div class="pc" data-pc="${i}" style="--r:${(s.r/438).toFixed(3)}">
           <img src="${A('../assets/media/brand/'+s.img)}" alt="">
           <a class="pc-t" href="#et-${s.id}" data-jump="${s.id}">
             <span class="pc-n">0${i+1}</span><span class="pc-l">${esc(T(s.n,l))}</span><span class="pc-x">→</span>
           </a>
         </div>`).join('')}
      </div>
    </div>
    <p class="wrap sig-p">${esc(T(UI.sigP,l))}</p>
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
    ? [['Mise en forme FPGA','Correction, recalage, horodatage — au fil du flux pixel.'],
       ['Inférence GPU','Détection et suivi à bord, à la cadence capteur.'],
       ['CPU hôte libre','Le processeur du porteur reste à la fonction système.']]
    : [['FPGA shaping','Correction, registration, time-stamping — on the pixel stream.'],
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
        <a class="tm-li" href="${m.li || '#'}"${m.li?' target="_blank" rel="noopener"':''}>${esc(T(L.li,l))} →</a>
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
           aria-label="${esc(T(LAB.play,l))} — ${esc(T(e.t,l))}">
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
</section>
<footer class="ft"><div class="wrap ft-in">
  <a class="ft-mark" href="./">${logo('ft')}</a>
  <span>© <span data-year>2026</span> SMA-RTY SAS · SIREN ${site.siren} · ${esc(T(site.lieu,l))}</span>
</div></footer>`;
}

function page(l){
  const o = { title: l==='fr'
      ? 'SMA-RTY France — Caméras multispectrales et calcul embarqué'
      : 'SMA-RTY France — Multispectral cameras and embedded compute',
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
<script>window.__B=${JSON.stringify(boot)};</script>
<script src="${A('../assets/js/main.js')}" defer></script>
<script src="${A('../assets/js/da.js')}" defer></script>
</body></html>`;
}

LANGS.forEach(l=>{
  const dir = path.join(ROOT,l);
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'index.html'), page(l));
});
fs.writeFileSync(path.join(ROOT,'index.html'),
  `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=./fr/"><a href="./fr/">SMA-RTY</a>`);
console.log('Généré : fr/ en/ + redirection racine');
