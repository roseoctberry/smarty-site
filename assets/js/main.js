(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var B = window.__B || {};

  /* ================= menu ================= */
  var mb = document.querySelector('[data-menu]'), ov = document.querySelector('[data-overlay]');
  if (mb && ov) {
    var setMenu = function (open) {
      ov.hidden = !open;
      mb.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.documentElement.classList.toggle('menu-open', open);
    };
    mb.addEventListener('click', function () { setMenu(ov.hidden); });
    ov.addEventListener('click', function (e) { if (e.target.tagName === 'A' || e.target === ov) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ================= hero : bande horizontale =================
     La hauteur de .hx sert de course : chaque pixel de scroll vertical
     déplace la bande d'un pixel vers la gauche. On ne détourne aucun
     événement de molette — le scroll reste natif, donc clavier, trackpad
     et barre de défilement se comportent normalement. */
  var hero  = document.querySelector('[data-hero]');
  var hx    = hero && hero.querySelector('[data-hx]');
  var track = hero && hero.querySelector('[data-hx-track]');

  if (hero && hx && track) {
    var figs   = Array.prototype.slice.call(track.querySelectorAll('[data-hxp]'));
    var idxEl  = hero.querySelector('[data-hx-i]');
    var hud    = hero.querySelector('.hx-hud');
    var live = false, run = 0, raf = 0, lastI = -1;

    /* L'épinglage est réservé au pointeur fin et au grand écran : sur mobile
       et en mouvement réduit, le défileur horizontal natif fait le travail. */
    function pinnable() {
      return !reduced && window.matchMedia('(min-width:901px)').matches;
    }

    /* En mode épinglé la bande est en overflow:visible — c'est .hx-pin qui rogne,
       parce que la zone de rognage d'un élément suit sa propre transform.
       Du coup scrollWidth ne rend plus la largeur du contenu : on la prend
       sur le dernier panneau. */
    function contentWidth() {
      var last = track.lastElementChild;
      var byChild = last ? last.offsetLeft + last.offsetWidth : 0;
      /* scrollWidth est juste en défileur natif, la mesure par le dernier
         panneau l'est en mode épinglé : on garde la plus grande des deux. */
      return Math.max(track.scrollWidth, byChild);
    }

    function measure() {
      var want = pinnable();
      if (want !== live) {
        live = want;
        hero.classList.toggle('hx-live', live);
        if (!live) { track.style.transform = ''; hx.style.height = ''; }
      }
      if (live) {
        run = Math.max(0, contentWidth() - track.clientWidth);
        hx.style.height = (run + window.innerHeight) + 'px';
      }
      draw();
    }

    function draw() {
      raf = 0;
      var p;
      if (live) {
        var total = hx.offsetHeight - window.innerHeight;
        p = total > 0 ? Math.min(1, Math.max(0, -hx.getBoundingClientRect().top / total)) : 0;
        track.style.transform = 'translate3d(' + (-p * run).toFixed(1) + 'px,0,0)';
      } else {
        /* défileur natif : la même progression se lit sur scrollLeft */
        var span = contentWidth() - track.clientWidth;
        p = span > 0 ? track.scrollLeft / span : 0;
      }
      if (hud) hud.style.setProperty('--p', p.toFixed(4));

      var vw = window.innerWidth;

      /* compteur : l'image la plus proche du centre */
      var best = 0, bestD = Infinity;
      figs.forEach(function (el, i) {
        var r = el.getBoundingClientRect();
        var d = Math.abs(r.left + r.width / 2 - vw / 2);
        if (d < bestD) { bestD = d; best = i; }
      });
      if (best !== lastI && idxEl) {
        lastI = best;
        idxEl.textContent = ('0' + (best + 1)).slice(-2);
      }
    }

    function onScroll() { if (!raf) raf = requestAnimationFrame(draw); }

    window.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    /* les images pèsent dans la largeur de la bande : on remesure au chargement */
    window.addEventListener('load', measure);
    measure();
  }

  /* ================= pied de page : dégradé au pointeur ================= */
  var ft = document.querySelector('[data-ft]');
  if (ft && !reduced) {
    var fRaf = 0, fx = 50, fy = 42;
    function paintFt() {
      fRaf = 0;
      ft.style.setProperty('--fx', fx.toFixed(1) + '%');
      ft.style.setProperty('--fy', fy.toFixed(1) + '%');
    }
    ft.addEventListener('pointermove', function (e) {
      var r = ft.getBoundingClientRect();
      fx = ((e.clientX - r.left) / r.width) * 100;
      fy = ((e.clientY - r.top) / r.height) * 100;
      if (!fRaf) fRaf = requestAnimationFrame(paintFt);
    }, { passive: true });
    ft.addEventListener('pointerleave', function () {
      fx = 50; fy = 42;
      if (!fRaf) fRaf = requestAnimationFrame(paintFt);
    });
  }

  /* ================= en-tête effacé au pied de page ================= */
  if (ft && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      document.documentElement.classList.toggle('at-ft', es[0].isIntersecting);
    }, { threshold: 0.04 }).observe(ft);
  }

  /* ================= curseur : un point ================= */
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    var dot = document.createElement('div');
    dot.className = 'cur cur--out';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    document.documentElement.classList.add('dotc');
    var dx = 0, dy = 0, dRaf = 0;
    function paintDot() {
      dRaf = 0;
      dot.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0)';
    }
    document.addEventListener('pointermove', function (e) {
      dx = e.clientX; dy = e.clientY;
      dot.classList.remove('cur--out');
      /* le point s'ouvre sur ce qui est cliquable */
      var t = e.target;
      var live = t && t.closest && t.closest('a,button,input,select,textarea,summary,[role="tab"],[data-hxp]');
      dot.classList.toggle('cur--link', !!live);
      if (!dRaf) dRaf = requestAnimationFrame(paintDot);
    }, { passive: true });
    document.addEventListener('pointerleave', function () { dot.classList.add('cur--out'); });
    document.addEventListener('pointerdown', function () { dot.classList.add('cur--link'); });
  }

  /* ================= compteurs ================= */
  var band = document.querySelector('[data-band]');
  if (band && 'IntersectionObserver' in window) {
    var done = false;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting || done) return; done = true;
        Array.prototype.forEach.call(band.querySelectorAll('[data-count]'), function (el) {
          var t = parseFloat(el.getAttribute('data-count')) || 0, s = el.getAttribute('data-suf') || '';
          if (reduced) { el.textContent = t + s; return; }
          var st = null;
          (function tick(ts) {
            if (st === null) st = ts;
            var p = Math.min(1, (ts - st) / 1200);
            el.textContent = Math.round(t * (1 - Math.pow(1 - p, 3))) + s;
            if (p < 1) requestAnimationFrame(tick);
          })(performance.now());
        });
        io.disconnect();
      });
    }, { threshold: .45 });
    io.observe(band);
  }

  /* ================= éclaté : ouverture, dérive, mise au point ================= */
  var sig = document.querySelector('[data-sig]');
  if (sig) {
    var pcs = Array.prototype.slice.call(sig.querySelectorAll('[data-pc]'));
    var stage = sig.querySelector('.sig-stage');
    var ticking = false, gap = 0;

    /* Échelle et positions : l'écart BLANC entre deux pièces est constant,
       et la pile est centrée sur l'axe vertical de la scène. */
    var pos = [];
    function measure() {
      if (!stage || !pcs.length) return;
      var H = stage.clientHeight, n = pcs.length;
      var ph = Math.max(64, Math.min(142, H / 5.0));
      sig.style.setProperty('--ph', ph + 'px');

      var hs = pcs.map(function (el) {
        var r = parseFloat(getComputedStyle(el).getPropertyValue('--r')) || 1;
        return r * ph;
      });
      var sum = hs.reduce(function (a, b) { return a + b; }, 0);
      var space = Math.max(4, (H - sum) / (n - 1));
      var total = sum + space * (n - 1);
      var y = -total / 2, acc = [];
      hs.forEach(function (h) { acc.push(y + h / 2); y += h + space; });
      pos = acc;
    }
    function renderSig() {
      ticking = false;
      var r = sig.getBoundingClientRect();
      var tot = sig.offsetHeight - window.innerHeight;
      var p = tot > 0 ? Math.min(1, Math.max(0, (-r.top) / tot)) : 0;
      var d = Math.min(1, Math.max(0, (p - .08) / .54));
      d = d * d * (3 - 2 * d);
      pcs.forEach(function (el, i) {
        var off = (pos[i] || 0) * d;
        el.style.transform = 'translateY(' + off.toFixed(1) + 'px)';
        el.classList.toggle('lit', d > .5);
      });
      sig.style.setProperty('--d', d.toFixed(3));
      /* l'ordre de recouvrement s'inverse dès que la pile s'ouvre */
      sig.classList.toggle('dep', d > 0.12);
    }
    if (!reduced) {
      window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(renderSig); } }, { passive: true });
      window.addEventListener('resize', function () { measure(); renderSig(); }, { passive: true });
      measure(); renderSig();
      window.addEventListener('load', function () { measure(); renderSig(); });
    }

    /* légendes cliquables → l'étage correspondant, plus bas dans la page */
    Array.prototype.forEach.call(sig.querySelectorAll('[data-jump]'), function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('data-jump');
        var target = document.getElementById('et-' + id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        target.classList.add('flash');
        setTimeout(function () { target.classList.remove('flash'); }, 1600);
      });
    });
  }

  /* ================= journal : abonnement ================= */
  var labF = document.querySelector('[data-lab]');
  if (labF) {
    function chipGroup(sel, multi) {
      var box = labF.querySelector(sel); if (!box) return;
      Array.prototype.forEach.call(box.querySelectorAll('button'), function (b) {
        b.addEventListener('click', function () {
          if (!multi) Array.prototype.forEach.call(box.querySelectorAll('button'), function (o) { o.classList.remove('on'); });
          b.classList.toggle('on');
        });
      });
    }
    chipGroup('[data-lab-bands]', true);
    chipGroup('[data-lab-depth]', false);
    labF.addEventListener('submit', function (e) {
      e.preventDefault();
      var b = labF.querySelector('.lab-sub-b');
      if (b) b.innerHTML = '<p class="q-q" style="font-size:1.05rem;color:var(--muted);max-width:44ch">' +
        (B.labDone || '') + '</p>';
    });
  }

  /* ================= qualificateur v2 ================= */
  var qual = document.querySelector('[data-qual]');
  if (qual && B.qual) {
    var QS = B.qual.steps, QT = B.qual.t, QN = B.qual.next || {};
    var body = qual.querySelector('[data-qual-body]');
    var recapEl = qual.querySelector('[data-qual-recap]');
    var stepById = {}; QS.forEach(function (s) { stepById[s.id] = s; });
    var order = [], idx = 0, answers = [], branch = null, seed = null, lastAck = null;

    function buildOrder(br) {
      order = ['entree'].concat(br ? QS.filter(function (s) { return s.br === br; }).map(function (s) { return s.id; }) : []);
    }
    buildOrder(null);

    function chip(t, lead) {
      var li = document.createElement('li');
      li.className = 'qc' + (lead ? ' qc--lead' : '');
      li.textContent = t; return li;
    }
    function recap() {
      recapEl.innerHTML = '';
      if (seed) recapEl.appendChild(chip(seed, true));
      answers.forEach(function (a, i) {
        if (!a || i === 0) return;   /* la question d'entrée sert à brancher, pas à résumer */
        a.labels.forEach(function (t) { recapEl.appendChild(chip(t, false)); });
      });
      recapEl.classList.toggle('on', !!(seed || answers.filter(Boolean).length > 1));
    }
    function pad(n) { return (n < 10 ? '0' : '') + n; }

    function el(tag, cls, txt) {
      var e = document.createElement(tag);
      if (cls) e.className = cls;
      if (txt != null) e.textContent = txt;
      return e;
    }
    function footer(extra) {
      var f = el('div', 'q-foot');
      if (idx > 0) {
        var b = el('button', 'q-back', '← ' + QT.back); b.type = 'button';
        b.addEventListener('click', function () {
          idx = Math.max(0, idx - 1);
          answers = answers.slice(0, idx);
          lastAck = idx > 0 && answers[idx - 1] ? answers[idx - 1].ack : null;
          if (idx === 0) { branch = null; buildOrder(null); }
          recap(); renderStep();
        });
        f.appendChild(b);
      }
      var s = el('button', 'q-skip', QT.skip); s.type = 'button';
      s.addEventListener('click', function () { idx = order.length; renderContact(); });
      f.appendChild(s);
      if (extra) f.appendChild(extra);
      return f;
    }

    function renderStep() {
      body.innerHTML = '';
      if (idx >= order.length) return renderContact();
      var s = stepById[order[idx]];
      var wrap = el('div', 'q-step');
      wrap.appendChild(el('p', 'q-prog', branch ? pad(idx + 1) + ' / ' + pad(order.length + 1) : pad(idx + 1)));
      if (lastAck) wrap.appendChild(el('p', 'q-ack', lastAck));
      wrap.appendChild(el('p', 'q-q', s.q));

      var opts = el('div', 'q-opts'), picked = [], pickedAck = null, next;
      s.o.forEach(function (o) {
        var b = el('button', 'q-o', o.t); b.type = 'button';
        b.addEventListener('click', function () {
          if (s.multi) {
            var i = picked.indexOf(o.t);
            if (i > -1) { picked.splice(i, 1); b.classList.remove('on'); }
            else { picked.push(o.t); b.classList.add('on'); if (o.ack) pickedAck = o.ack; }
            next.hidden = picked.length === 0;
          } else {
            if (o.go) { branch = o.go; buildOrder(branch); }
            commit(s, [o.t], o.ack || null);
          }
        });
        opts.appendChild(b);
      });
      wrap.appendChild(opts);
      if (s.multi) {
        next = el('button', 'q-next', '→'); next.type = 'button'; next.hidden = true;
        next.addEventListener('click', function () { commit(s, picked.slice(), pickedAck); });
        wrap.appendChild(next);
      }
      wrap.appendChild(footer());
      body.appendChild(wrap);
    }

    function commit(s, labels, ack) {
      answers[idx] = { stepId: s.id, q: s.q, labels: labels, ack: ack };
      lastAck = ack; idx++; recap(); renderStep();
    }

    function renderContact() {
      body.innerHTML = '';
      var f = document.createElement('form');
      f.className = 'q-step q-form'; f.setAttribute('novalidate', '');
      f.appendChild(el('p', 'q-prog', branch ? pad(order.length + 1) + ' / ' + pad(order.length + 1) : ''));

      var nx = el('p', 'q-nx');
      nx.appendChild(el('b', null, QT.nextT));
      nx.appendChild(el('span', null, QN[branch || 'null'] || QN['null'] || ''));
      f.appendChild(nx);

      var fields = el('div', 'q-fields');
      fields.innerHTML =
        '<label><span>' + QT.mailL + '</span><input type="email" name="mail" required autocomplete="email"></label>' +
        '<label><span>' + QT.orgL + '</span><input type="text" name="org" required autocomplete="organization"></label>';
      f.appendChild(fields);

      var free = el('label', 'q-free');
      free.innerHTML = '<span>' + QT.freeL + '</span><input type="text" name="free" placeholder="' + QT.freeP + '">';
      f.appendChild(free);

      var act = el('div', 'q-actions');
      var sub = el('button', 'btn', QT.send); sub.type = 'submit';
      act.appendChild(sub); f.appendChild(act);
      f.appendChild(footer());

      f.addEventListener('submit', function (e) {
        e.preventDefault();
        body.innerHTML = '';
        var d = el('div', 'q-step q-done');
        d.appendChild(el('p', 'q-q', QT.done));
        body.appendChild(d);
      });
      body.appendChild(f);
    }

    function seedFrom(label) {
      seed = label; idx = 0; answers = []; branch = null; lastAck = null; buildOrder(null);
      recap(); renderStep();
      qual.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-seed]'), function (b) {
      b.addEventListener('click', function () { seedFrom(b.getAttribute('data-seed')); });
    });
    var pageSeed = qual.getAttribute('data-seed');
    if (pageSeed) seed = pageSeed;

    recap(); renderStep();
  }

  /* hauteur du bandeau prototype : l'en-tête fixe se cale dessous */
  var proto = document.querySelector('.proto');
  if (proto) {
    var setProto = function () {
      document.documentElement.style.setProperty('--proto-h', proto.offsetHeight + 'px');
    };
    setProto();
    window.addEventListener('resize', setProto, { passive: true });
    window.addEventListener('load', setProto);
  }

  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
