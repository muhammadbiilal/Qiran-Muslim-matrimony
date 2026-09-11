/* ==========================================================================
   QIRAN — Simulated mobile application
   A mobile-first, screen-based experience running inside a phone viewport.
   ========================================================================== */
(function (global) {
  'use strict';

  var I = ICO.icon, E = UI.esc, img = UI.img, avatar = UI.avatar;
  var PX = DATA.PX;

  var root = null;   /* .phone__screen */
  var stack = null;  /* .app-stack */
  var statusEl = null;
  var tabsEl = null;
  var S = null;      /* session state */

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  /* ======================================================================
     Session state
     ====================================================================== */

  function freshState() {
    var p = clone(DATA.ME);
    p.photos = [PX.yusuf, PX.sCoffee];
    return {
      profile: p,
      filters: clone(DATA.DEFAULT_FILTERS),
      queue: DATA.DISCOVERY_ORDER.slice(),
      qIndex: 0,
      acted: {},            /* id -> 'like' | 'pass' */
      matches: clone(DATA.MATCHES),
      threads: clone(DATA.THREADS),
      replyTurn: {},        /* thread id -> index into AUTO_REPLIES */
      draftStarter: null,
      celebrated: {}
    };
  }

  var AUTO_REPLIES = {
    amina: [
      'Wa alaikum assalam Yusuf. That is a good question to open with.',
      'A calm one, honestly. Somewhere people actually want to come back to at the end of the day.',
      'What about you — what does home mean in your family?'
    ],
    fatima: [
      'Very much so. Most of my week is community clinics in the east of the city.',
      'It is the part of the job I would miss if it ever went.'
    ],
    khadija: ['I will hold you to that, then.', 'Fourteen people is a serious commitment to lunch.'],
    iman: ['Let me know when you reach the middle section.'],
    yasmin: ['Wa alaikum assalam Yusuf. Thank you for reaching out.'],
    default: ['That is a really thoughtful way to put it.', 'I would like to hear more about that.']
  };

  var PICKER_PHOTOS = [
    PX.yusuf, PX.sCoffee, PX.sRange, PX.sHills, PX.sValley,
    PX.sForest, PX.sBooks, PX.sWindow, PX.sRocks
  ];

  /* ======================================================================
     Router
     ====================================================================== */

  var SCREENS = {};
  function screen(id, def) { SCREENS[id] = def; }

  var TABS = [
    { key: 'discover', label: 'Discover', icon: 'discover', screen: 'd01' },
    { key: 'matches', label: 'Matches', icon: 'match', screen: 'g01' },
    { key: 'chats', label: 'Chats', icon: 'chat', screen: 'h01' },
    { key: 'profile', label: 'Profile', icon: 'profile', screen: 'i01' }
  ];

  function go(id, params, opts) {
    opts = opts || {};
    var mode = opts.mode || 'push';
    var def = SCREENS[id];
    if (!def) return;

    var prev = stack.lastElementChild;
    var el = document.createElement('section');
    el.className = 'scr' + (def.cls ? ' ' + def.cls : '');
    el.dataset.id = id;
    el.dataset.mode = mode;
    el._params = params || {};
    el.innerHTML = def.render(el._params);
    stack.appendChild(el);
    if (def.mount) def.mount(el, el._params);
    applyChrome(def);

    if (!prev) { el.classList.add('scr--fade-in'); return; }

    if (mode === 'root' || mode === 'replace') {
      el.classList.add('scr--fade-in');
      prev.classList.add('scr--fade-out');
      var doomed = mode === 'root'
        ? Array.prototype.slice.call(stack.children, 0, -1)
        : [prev];
      setTimeout(function () { doomed.forEach(function (n) { n.remove(); }); }, 240);
    } else if (mode === 'modal') {
      el.classList.add('scr--up-in');
    } else {
      el.classList.add('scr--push-in');
      prev.classList.add('scr--push-out');
      setTimeout(function () {
        prev.classList.remove('scr--push-out');
        if (prev.parentNode) prev.style.display = 'none';
      }, 350);
    }
  }

  function back() {
    var cur = stack.lastElementChild;
    if (!cur) return;
    var prev = cur.previousElementSibling;
    if (!prev) { go('d01', {}, { mode: 'root' }); return; }

    prev.style.display = '';
    var mode = cur.dataset.mode;
    cur.classList.add(mode === 'modal' ? 'scr--up-out' : 'scr--pop-out');
    if (mode !== 'modal') prev.classList.add('scr--pop-in');
    applyChrome(SCREENS[prev.dataset.id]);
    setTimeout(function () {
      cur.remove();
      prev.classList.remove('scr--pop-in');
    }, 340);
  }

  function applyChrome(def) {
    if (!def) return;
    statusEl.className = 'app-status' + (def.status === 'light' ? ' app-status--light' : '');
    if (def.tab) {
      tabsEl.hidden = false;
      UI.qsa('.tab', tabsEl).forEach(function (t) {
        t.classList.toggle('is-active', t.dataset.tab === def.tab);
      });
      refreshTabBadges();
    } else {
      tabsEl.hidden = true;
    }
  }

  function refreshTabBadges() {
    var unread = 0;
    Object.keys(S.threads).forEach(function (k) { unread += S.threads[k].unread || 0; });
    var chatTab = UI.qs('.tab[data-tab="chats"]', tabsEl);
    if (!chatTab) return;
    var dot = UI.qs('.tab__dot', chatTab);
    if (unread > 0) {
      if (!dot) {
        dot = UI.h('<span class="tab__dot"></span>');
        chatTab.appendChild(dot);
      }
      dot.textContent = unread;
    } else if (dot) { dot.remove(); }
  }

  /* ======================================================================
     Shared components
     ====================================================================== */

  function topbar(o) {
    o = o || {};
    var left = o.brand
      ? '<div class="topbar__brand">' + ICO.wordmark({ size: 26, text: 17 }) + '</div>'
      : (o.back ? '<button class="icon-btn" data-back aria-label="Back">' + I(o.backIcon || 'chevron-left') + '</button>' : '');
    return '<header class="topbar' + (o.bordered ? ' topbar--bordered' : '') + (o.transparent ? ' topbar--transparent' : '') + '">' +
      '<div class="topbar__side">' + left + '</div>' +
      '<div class="topbar__title">' + E(o.title || '') + '</div>' +
      '<div class="topbar__side topbar__side--end">' + (o.right || '') + '</div>' +
      '</header>';
  }

  function statusBar() {
    return '<span>9:41</span><span class="app-status__icons">' +
      '<svg viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="4.5" y="5.5" width="3" height="6.5" rx="1"/><rect x="9" y="3" width="3" height="9" rx="1"/><rect x="13.5" y="0.5" width="3" height="11.5" rx="1"/></svg>' +
      '<svg viewBox="0 0 18 12" fill="currentColor"><path d="M9 10.6 6.9 8.4a3 3 0 0 1 4.2 0L9 10.6Z"/><path d="M13.2 6.2a6 6 0 0 0-8.4 0L3.4 4.8a8 8 0 0 1 11.2 0l-1.4 1.4Z"/><path d="M11.3 8.1a3.4 3.4 0 0 0-4.6 0L5.3 6.7a5.4 5.4 0 0 1 7.4 0l-1.4 1.4Z"/></svg>' +
      '<svg viewBox="0 0 26 12" fill="none"><rect x="0.6" y="0.6" width="21" height="10.8" rx="3" stroke="currentColor" stroke-opacity=".45"/><rect x="2.2" y="2.2" width="16" height="7.6" rx="1.8" fill="currentColor"/><path d="M23.4 4.2v3.6a2 2 0 0 0 0-3.6Z" fill="currentColor" fill-opacity=".45"/></svg>' +
      '</span>';
  }

  function gchip(label, iconName) {
    return '<span class="gchip">' + (iconName ? I(iconName) : '') + E(label) + '</span>';
  }

  /* ---- Profile view (shared by D02 / E02 / B13 / I01) ------------------- */

  function galleryHTML(p, showName) {
    var photos = p.photos && p.photos.length ? p.photos : [null];
    var dots = photos.length > 1
      ? '<div class="gallery__dots">' + photos.map(function (_, i) {
          return '<i class="' + (i === 0 ? 'is-on' : '') + '"></i>';
        }).join('') + '</div>' : '';
    return '<div class="gallery" data-gallery>' +
      '<div class="gallery__track">' + photos.map(function (ph) {
        return '<div class="gallery__item">' + img(ph, 780, 1040, p.firstName + ' — profile photo') + '</div>';
      }).join('') + '</div>' +
      (photos.length > 1 ? '<div class="gallery__nav"><button data-gnav="-1" aria-label="Previous photo"></button><button data-gnav="1" aria-label="Next photo"></button></div>' : '') +
      dots +
      '<div class="gallery__fade"></div>' +
      (showName === false ? '' :
        '<div class="gallery__name">' +
          '<h2>' + E(p.firstName) + ', ' + p.age + '</h2>' +
          '<div class="disc__where">' + I('location') + E(p.location) + '</div>' +
        '</div>') +
      '</div>';
  }

  function sectionHTML(s) {
    var rows = (s.rows || []).filter(function (r) { return r[1]; });
    var html = '<div class="sec">' +
      '<div class="sec__head">' + I(s.icon) + '<h3>' + E(s.title) + '</h3></div>';
    if (rows.length) {
      html += '<div class="sec__rows">' + rows.map(function (r) {
        return '<div class="kv"><span class="kv__k">' + E(r[0]) + '</span><span class="kv__v">' + E(r[1]) + '</span></div>';
      }).join('') + '</div>';
    }
    if (s.chips && s.chips.length) {
      html += '<div class="sec__chips">' +
        (s.chipsLabel ? '<div class="sec__chips-label">' + E(s.chipsLabel) + '</div>' : '') +
        UI.chips(s.chips) + '</div>';
    }
    if (s.chips2 && s.chips2.length) {
      html += '<div class="sec__chips">' +
        (s.chipsLabel2 ? '<div class="sec__chips-label">' + E(s.chipsLabel2) + '</div>' : '') +
        '<div class="chip-row">' + s.chips2.map(function (c) {
          return '<span class="chip chip--gold">' + E(c) + '</span>';
        }).join('') + '</div></div>';
    }
    return html + '</div>';
  }

  function profileBodyHTML(p) {
    return '<div class="pv">' +
      galleryHTML(p) +
      '<div class="pv__body">' +
        '<div class="bio"><div class="bio__q">' + I('quote') + '</div>' + E(p.bio) + '</div>' +
        DATA.sections(p).map(sectionHTML).join('') +
      '</div></div>';
  }

  function mountGallery(el) {
    var g = UI.qs('[data-gallery]', el);
    if (!g) return;
    var track = UI.qs('.gallery__track', g);
    var dots = UI.qsa('.gallery__dots i', g);
    var n = UI.qsa('.gallery__item', g).length;
    var i = 0;
    UI.on(g, 'click', '[data-gnav]', function (e, t) {
      e.stopPropagation();
      i = UI.clamp(i + (+t.dataset.gnav), 0, n - 1);
      track.style.transform = 'translateX(' + (-i * 100) + '%)';
      dots.forEach(function (d, k) { d.classList.toggle('is-on', k === i); });
    });
  }

  /* ======================================================================
     Field engine — powers the profile builder and every edit screen
     ====================================================================== */

  function fieldHTML(f, model) {
    var v = model[f.key];
    var inner = '';

    if (f.type === 'text') {
      inner = '<input class="input" type="text" data-input="' + f.key + '" value="' + E(v || '') +
        '" placeholder="' + E(f.placeholder || '') + '">';

    } else if (f.type === 'date') {
      inner = dateHTML(f.key, v);

    } else if (f.type === 'textarea') {
      var len = (v || '').length;
      inner = '<textarea class="textarea" data-input="' + f.key + '" placeholder="' + E(f.placeholder || '') +
        '" maxlength="' + (f.max || 500) + '">' + E(v || '') + '</textarea>' +
        '<div class="char-count" data-count="' + f.key + '">' + len + ' / ' + (f.max || 500) + '</div>';

    } else if (f.type === 'single') {
      inner = f.options.length <= 5 ? pickListHTML(f, v) : chipsetHTML(f, v ? [v] : [], true);

    } else if (f.type === 'multi') {
      inner = chipsetHTML(f, v || [], false);

    } else if (f.type === 'select') {
      inner = rowSelectHTML(f, v, false);

    } else if (f.type === 'multiselect') {
      var arr = v || [];
      inner = rowSelectHTML(f, arr.length ? UI.list(arr, 3) : '', true) +
        (arr.length ? '<div class="sec__chips">' + UI.chips(arr) + '</div>' : '');

    } else if (f.type === 'height') {
      inner = sliderHTML(f.key, f.min, f.max, v || 170, 'height');

    } else if (f.type === 'photos') {
      inner = photosHTML(model.photos || []);
    }

    var showLabel = f.type !== 'select' && f.type !== 'multiselect';
    return '<div class="field" data-field="' + f.key + '">' +
      (showLabel ? '<label class="field__label">' + E(f.label) + '</label>' : '') +
      inner +
      (f.hint ? '<div class="field__hint">' + E(f.hint) + '</div>' : '') +
      '<div class="field__slot"></div>' +
      '</div>';
  }

  function pickListHTML(f, v) {
    return '<div class="pick-list">' + f.options.map(function (o) {
      return '<button class="pick' + (o === v ? ' is-on' : '') + '" data-pick="' + f.key + '" data-value="' + E(o) + '">' +
        '<span class="pick__label">' + E(o) + '</span><span class="pick__radio"></span></button>';
    }).join('') + '</div>';
  }

  function chipsetHTML(f, selected, single) {
    var full = !single && f.maxSelect && selected.length >= f.maxSelect;
    return '<div class="chipset">' + f.options.map(function (o) {
      var on = selected.indexOf(o) > -1;
      return '<button class="chip-opt' + (on ? ' is-on' : '') + (!on && full ? ' is-locked' : '') +
        '" data-chip="' + f.key + '" data-single="' + (single ? '1' : '0') + '" data-value="' + E(o) + '">' +
        I('check') + '<span>' + E(o) + '</span></button>';
    }).join('') + '</div>' +
      (f.maxSelect && !single ? '<div class="field__hint">Choose up to ' + f.maxSelect + ' · ' + selected.length + ' selected</div>' : '');
  }

  function rowSelectHTML(f, value, multi) {
    return '<button class="row-select" data-open-select="' + f.key + '" data-multi="' + (multi ? '1' : '0') + '">' +
      (f.icon ? '<span class="row-select__ico">' + I(f.icon) + '</span>' : '') +
      '<span class="row-select__main">' +
        '<span class="row-select__label">' + E(f.label) + '</span>' +
        '<span class="row-select__value' + (value ? '' : ' row-select__value--empty') + '">' +
          E(value || 'Select') + '</span>' +
      '</span>' +
      '<span class="row-select__chev">' + I('chevron-right') + '</span>' +
      '</button>';
  }

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function dateHTML(key, iso) {
    var d = iso ? iso.split('-') : ['', '', ''];
    var day = d[2] ? String(+d[2]) : '', mon = d[1] ? MONTHS[+d[1] - 1] : '', yr = d[0] || '';
    function cell(part, label, val) {
      return '<button class="row-select" data-date="' + key + '" data-part="' + part + '">' +
        '<span class="row-select__main">' +
          '<span class="row-select__label">' + label + '</span>' +
          '<span class="row-select__value' + (val ? '' : ' row-select__value--empty') + '">' + E(val || '—') + '</span>' +
        '</span></button>';
    }
    return '<div class="date-row">' + cell('d', 'Day', day) + cell('m', 'Month', mon) + cell('y', 'Year', yr) + '</div>';
  }

  function sliderHTML(key, min, max, val, fmt) {
    var pct = ((val - min) / (max - min)) * 100;
    return '<div class="slider" data-slider="' + key + '" data-min="' + min + '" data-max="' + max +
      '" data-val="' + val + '" data-fmt="' + (fmt || '') + '">' +
      '<div class="slider__value" data-slider-out>' + formatSlider(val, fmt) + '</div>' +
      '<div class="slider__track"><div class="slider__fill" style="left:0;width:' + pct + '%"></div>' +
        '<div class="slider__thumb" style="left:' + pct + '%" data-thumb="v" tabindex="0" role="slider"></div></div>' +
      '<div class="slider__scale"><span>' + formatSlider(min, fmt) + '</span><span>' + formatSlider(max, fmt) + '</span></div>' +
      '</div>';
  }

  function rangeHTML(key, min, max, lo, hi, fmt) {
    var p1 = ((lo - min) / (max - min)) * 100, p2 = ((hi - min) / (max - min)) * 100;
    return '<div class="slider" data-range="' + key + '" data-min="' + min + '" data-max="' + max +
      '" data-lo="' + lo + '" data-hi="' + hi + '" data-fmt="' + (fmt || '') + '">' +
      '<div class="slider__value" data-slider-out>' + formatSlider(lo, fmt) + ' – ' + formatSlider(hi, fmt) + '</div>' +
      '<div class="slider__track">' +
        '<div class="slider__fill" style="left:' + p1 + '%;width:' + (p2 - p1) + '%"></div>' +
        '<div class="slider__thumb" style="left:' + p1 + '%" data-thumb="lo" tabindex="0"></div>' +
        '<div class="slider__thumb" style="left:' + p2 + '%" data-thumb="hi" tabindex="0"></div>' +
      '</div>' +
      '<div class="slider__scale"><span>' + formatSlider(min, fmt) + '</span><span>' + formatSlider(max, fmt) + '</span></div>' +
      '</div>';
  }

  function formatSlider(v, fmt) {
    if (fmt === 'height') return v + ' cm <span class="slider__unit">' + UI.cm2ft(v) + '</span>';
    return String(v);
  }

  function photosHTML(photos) {
    var slots = [];
    for (var i = 0; i < 6; i++) {
      var ph = photos[i];
      if (ph) {
        slots.push('<div class="photo-slot photo-slot--filled" data-slot="' + i + '">' +
          img(ph, 420, 560, 'Profile photo ' + (i + 1)) +
          (i === 0 ? '<span class="photo-slot__badge">Main</span>' : '') +
          '<div class="photo-slot__tools">' +
            '<button class="photo-tool" data-photo-move="' + i + '" data-dir="-1" ' + (i === 0 ? 'disabled' : '') + ' aria-label="Move earlier">' + I('chevron-left') + '</button>' +
            '<button class="photo-tool" data-photo-move="' + i + '" data-dir="1" ' + (i === photos.length - 1 ? 'disabled' : '') + ' aria-label="Move later">' + I('chevron-right') + '</button>' +
            '<button class="photo-tool" data-photo-remove="' + i + '" aria-label="Remove photo">' + I('trash') + '</button>' +
          '</div></div>');
      } else {
        slots.push('<button class="photo-slot" data-photo-add="' + i + '">' +
          '<span class="photo-slot__add">' + I('plus') + 'Add</span></button>');
      }
    }
    return '<div class="photos-grid">' + slots.join('') + '</div>';
  }

  /* ---- Field wiring ----------------------------------------------------- */

  function wireFields(el, model, fields, onChange) {
    function refresh(key) {
      var wrap = UI.qs('[data-field="' + key + '"]', el);
      if (!wrap) return;
      var f = fields.filter(function (x) { return x.key === key; })[0];
      var fresh = UI.h(fieldHTML(f, model));
      wrap.replaceWith(fresh);
      wireSliders(el, model, onChange);
    }
    function changed(key) { if (onChange) onChange(key, model); }

    UI.on(el, 'input', '[data-input]', function (e, t) {
      model[t.dataset.input] = t.value;
      var counter = UI.qs('[data-count="' + t.dataset.input + '"]', el);
      if (counter) {
        var max = t.getAttribute('maxlength') || 500;
        counter.textContent = t.value.length + ' / ' + max;
      }
      changed(t.dataset.input);
    });

    UI.on(el, 'click', '[data-pick]', function (e, t) {
      model[t.dataset.pick] = t.dataset.value;
      UI.qsa('[data-pick="' + t.dataset.pick + '"]', el).forEach(function (b) {
        b.classList.toggle('is-on', b === t);
      });
      changed(t.dataset.pick);
    });

    UI.on(el, 'click', '[data-chip]', function (e, t) {
      var key = t.dataset.chip, val = t.dataset.value;
      if (t.dataset.single === '1') {
        model[key] = val;
      } else {
        var arr = model[key] || (model[key] = []);
        var i = arr.indexOf(val);
        var f = fields.filter(function (x) { return x.key === key; })[0];
        if (i > -1) arr.splice(i, 1);
        else if (!f.maxSelect || arr.length < f.maxSelect) arr.push(val);
        else { UI.toast(root, 'You can choose up to ' + f.maxSelect, 'info'); return; }
      }
      refresh(key);
      changed(key);
    });

    UI.on(el, 'click', '[data-open-select]', function (e, t) {
      var key = t.dataset.openSelect;
      var f = fields.filter(function (x) { return x.key === key; })[0];
      openSelectSheet(f, model, function () { refresh(key); changed(key); });
    });

    UI.on(el, 'click', '[data-date]', function (e, t) {
      openDateSheet(t.dataset.date, t.dataset.part, model, function () {
        refresh(t.dataset.date); changed(t.dataset.date);
      });
    });

    /* Photos */
    UI.on(el, 'click', '[data-photo-add]', function () {
      openPhotoPicker(function (ph) {
        simulateUpload(el, model, ph, function () { refresh('photos'); changed('photos'); });
      });
    });
    UI.on(el, 'click', '[data-photo-remove]', function (e, t) {
      model.photos.splice(+t.dataset.photoRemove, 1);
      refresh('photos'); changed('photos');
    });
    UI.on(el, 'click', '[data-photo-move]', function (e, t) {
      var i = +t.dataset.photoMove, d = +t.dataset.dir, j = i + d;
      if (j < 0 || j >= model.photos.length) return;
      var tmp = model.photos[i];
      model.photos[i] = model.photos[j];
      model.photos[j] = tmp;
      refresh('photos'); changed('photos');
    });

    wireSliders(el, model, onChange);
  }

  function wireSliders(el, model, onChange) {
    UI.qsa('[data-slider], [data-range]', el).forEach(function (sl) {
      if (sl._wired) return;
      sl._wired = true;
      var min = +sl.dataset.min, max = +sl.dataset.max, fmt = sl.dataset.fmt;
      var isRange = sl.hasAttribute('data-range');
      var key = isRange ? sl.dataset.range : sl.dataset.slider;
      var track = UI.qs('.slider__track', sl);
      var fill = UI.qs('.slider__fill', sl);
      var out = UI.qs('[data-slider-out]', sl);

      function paint() {
        if (isRange) {
          var lo = +sl.dataset.lo, hi = +sl.dataset.hi;
          var p1 = ((lo - min) / (max - min)) * 100, p2 = ((hi - min) / (max - min)) * 100;
          UI.qs('[data-thumb="lo"]', sl).style.left = p1 + '%';
          UI.qs('[data-thumb="hi"]', sl).style.left = p2 + '%';
          fill.style.left = p1 + '%'; fill.style.width = (p2 - p1) + '%';
          out.innerHTML = formatSlider(lo, fmt) + ' – ' + formatSlider(hi, fmt);
        } else {
          var v = +sl.dataset.val;
          var p = ((v - min) / (max - min)) * 100;
          UI.qs('[data-thumb="v"]', sl).style.left = p + '%';
          fill.style.left = '0'; fill.style.width = p + '%';
          out.innerHTML = formatSlider(v, fmt);
        }
      }

      function valueAt(clientX) {
        var r = track.getBoundingClientRect();
        var pct = UI.clamp((clientX - r.left) / r.width, 0, 1);
        return Math.round(min + pct * (max - min));
      }

      function commit(which, v) {
        if (isRange) {
          if (which === 'lo') sl.dataset.lo = Math.min(v, +sl.dataset.hi - 1);
          else sl.dataset.hi = Math.max(v, +sl.dataset.lo + 1);
          model[key] = [+sl.dataset.lo, +sl.dataset.hi];
        } else {
          sl.dataset.val = v;
          model[key] = v;
        }
        paint();
        if (onChange) onChange(key, model);
      }

      UI.qsa('.slider__thumb', sl).forEach(function (thumb) {
        thumb.addEventListener('pointerdown', function (ev) {
          ev.preventDefault();
          thumb.setPointerCapture(ev.pointerId);
          var which = thumb.dataset.thumb;
          function move(e2) { commit(which, valueAt(e2.clientX)); }
          function up(e2) {
            thumb.removeEventListener('pointermove', move);
            thumb.removeEventListener('pointerup', up);
            thumb.removeEventListener('pointercancel', up);
          }
          thumb.addEventListener('pointermove', move);
          thumb.addEventListener('pointerup', up);
          thumb.addEventListener('pointercancel', up);
        });
      });

      track.addEventListener('pointerdown', function (ev) {
        if (ev.target.classList.contains('slider__thumb')) return;
        var v = valueAt(ev.clientX);
        if (isRange) {
          var dLo = Math.abs(v - +sl.dataset.lo), dHi = Math.abs(v - +sl.dataset.hi);
          commit(dLo <= dHi ? 'lo' : 'hi', v);
        } else { commit('v', v); }
      });
    });
  }

  /* ---- Select sheets ---------------------------------------------------- */

  function openSelectSheet(f, model, done) {
    var multi = f.type === 'multiselect';
    var selected = multi ? (model[f.key] || []).slice() : model[f.key];
    var searchable = f.options.length > 8;

    var sh = UI.sheet(root, {
      title: f.label,
      body: (searchable ? '<div class="sheet-search"><div class="search-input">' + I('search') +
        '<input type="text" placeholder="Search ' + E(f.label.toLowerCase()) + '" data-sheet-search></div></div>' : '') +
        '<div class="opt-list" data-opts></div>',
      footer: multi ? '<button class="mbtn mbtn--primary" data-sheet-done>Done</button>' : ''
    });

    function paint(filter) {
      var q = (filter || '').toLowerCase();
      var opts = f.options.filter(function (o) { return !q || o.toLowerCase().indexOf(q) > -1; });
      UI.qs('[data-opts]', sh.el).innerHTML = opts.length ? opts.map(function (o) {
        var on = multi ? selected.indexOf(o) > -1 : o === selected;
        return '<button class="opt' + (on ? ' is-on' : '') + '" data-opt="' + E(o) + '">' +
          (multi ? '<span class="opt-box">' + I('check') + '</span>' : '') +
          '<span class="opt__label">' + E(o) + '</span>' +
          (multi ? '' : '<span class="opt__check">' + I('check') + '</span>') +
          '</button>';
      }).join('') : '<div class="field__hint" style="padding:24px 0;text-align:center">No results</div>';
    }
    paint('');

    UI.on(sh.el, 'input', '[data-sheet-search]', function (e, t) { paint(t.value); });

    UI.on(sh.el, 'click', '[data-opt]', function (e, t) {
      var v = t.dataset.opt;
      if (multi) {
        var i = selected.indexOf(v);
        if (i > -1) selected.splice(i, 1);
        else if (!f.maxSelect || selected.length < f.maxSelect) selected.push(v);
        else { UI.toast(root, 'You can choose up to ' + f.maxSelect, 'info'); return; }
        t.classList.toggle('is-on');
      } else {
        model[f.key] = v;
        sh.close();
        done();
      }
    });

    UI.on(sh.el, 'click', '[data-sheet-done]', function () {
      model[f.key] = selected;
      sh.close();
      done();
    });
  }

  function openDateSheet(key, part, model, done) {
    var iso = (model[key] || '1996-01-01').split('-');
    var opts = [], title = '';
    if (part === 'd') { title = 'Day'; for (var i = 1; i <= 31; i++) opts.push(String(i)); }
    else if (part === 'm') { title = 'Month'; opts = MONTHS.slice(); }
    else { title = 'Year'; for (var y = 2008; y >= 1960; y--) opts.push(String(y)); }

    var current = part === 'd' ? String(+iso[2]) : part === 'm' ? MONTHS[+iso[1] - 1] : iso[0];

    var sh = UI.sheet(root, { title: title, body: '<div class="opt-list" data-opts></div>' });
    UI.qs('[data-opts]', sh.el).innerHTML = opts.map(function (o) {
      return '<button class="opt' + (o === current ? ' is-on' : '') + '" data-opt="' + E(o) + '">' +
        '<span class="opt__label">' + E(o) + '</span><span class="opt__check">' + I('check') + '</span></button>';
    }).join('');

    UI.on(sh.el, 'click', '[data-opt]', function (e, t) {
      var v = t.dataset.opt;
      if (part === 'd') iso[2] = ('0' + v).slice(-2);
      else if (part === 'm') iso[1] = ('0' + (MONTHS.indexOf(v) + 1)).slice(-2);
      else iso[0] = v;
      model[key] = iso.join('-');
      if (model.dateOfBirth === model[key]) model.age = ageFrom(model[key]);
      sh.close();
      done();
    });
  }

  function ageFrom(iso) {
    var d = new Date(iso), now = new Date(2026, 8, 11);
    var a = now.getFullYear() - d.getFullYear();
    var m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) a--;
    return a;
  }

  function openPhotoPicker(done) {
    var sh = UI.sheet(root, {
      title: 'Add a photo',
      body: '<p class="field__hint" style="margin:0 0 16px">Choose a photo from your library.</p>' +
        '<div class="picker-grid">' + PICKER_PHOTOS.map(function (p) {
          return '<button class="picker-cell" data-pick-photo="' + p + '">' + img(p, 260, 260, 'Library photo') + '</button>';
        }).join('') + '</div>'
    });
    UI.on(sh.el, 'click', '[data-pick-photo]', function (e, t) {
      sh.close();
      done(t.dataset.pickPhoto);
    });
  }

  function simulateUpload(el, model, ph, done) {
    var slots = UI.qsa('.photo-slot', el);
    var target = slots[model.photos.length];
    if (!target) { model.photos.push(ph); done(); return; }
    var C = 2 * Math.PI * 18;
    target.insertAdjacentHTML('beforeend',
      '<div class="photo-upload"><div><svg class="photo-upload__ring" viewBox="0 0 44 44">' +
      '<circle class="bg" cx="22" cy="22" r="18"/>' +
      '<circle class="fg" cx="22" cy="22" r="18" stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '"/>' +
      '</svg><div class="photo-upload__pct">0%</div></div></div>');
    var ring = UI.qs('.photo-upload .fg', target);
    var pct = UI.qs('.photo-upload__pct', target);
    var p = 0;
    var t = setInterval(function () {
      p = Math.min(100, p + 8 + Math.random() * 14);
      ring.style.strokeDashoffset = C * (1 - p / 100);
      pct.textContent = Math.round(p) + '%';
      if (p >= 100) {
        clearInterval(t);
        setTimeout(function () { model.photos.push(ph); done(); }, 220);
      }
    }, 110);
  }

  /* ======================================================================
     A — Authentication
     ====================================================================== */

  screen('a01', {
    status: 'light', cls: 'scr--dark scr--bleed',
    render: function () {
      return '<div class="splash"><div class="splash__in">' +
        '<div class="splash__mark">' + ICO.logoMark(84, 'light') + '</div>' +
        '<div class="splash__name">Qiran</div>' +
        '<div class="splash__tag">Marriage, with intention</div>' +
        '<svg class="splash__load" viewBox="0 0 34 34"><circle cx="17" cy="17" r="14"/>' +
        '<path d="M17 3a14 14 0 0 1 14 14"/></svg>' +
        '</div></div>';
    },
    mount: function (el) {
      el._timer = setTimeout(function () { go('a02', {}, { mode: 'replace' }); }, 1700);
    }
  });

  screen('a02', {
    status: 'light', cls: 'scr--dark scr--bleed',
    render: function () {
      return '<div class="welcome">' +
        '<div class="welcome__bg">' + img(PX.amina3, 800, 1400, '') + '</div>' +
        '<div class="welcome__brand">' + ICO.wordmark({ variant: 'light', size: 32, text: 21 }) + '</div>' +
        '<div class="welcome__body">' +
          '<h1 class="welcome__title">Marriage,<br>with intention.</h1>' +
          '<p class="welcome__text">A matrimony app for Muslims who are serious about marriage. Build a considered profile, set the preferences that matter, and meet people whose intentions match your own.</p>' +
          '<div class="welcome__actions">' +
            '<button class="mbtn mbtn--gold" data-go="a03">Create account</button>' +
            '<button class="mbtn mbtn--outline-light" data-go="a03" data-param="login">Log in</button>' +
          '</div>' +
          '<p class="welcome__legal">By continuing you agree to our Terms of Use and Privacy Policy.</p>' +
        '</div></div>';
    }
  });

  screen('a03', {
    render: function (p) {
      var login = p.mode === 'login';
      return topbar({ back: true }) +
        '<div class="scr__body scr__body--pad">' +
          '<h1 class="h-display">' + (login ? 'Welcome back' : 'Create your account') + '</h1>' +
          '<p class="h-sub">' + (login
            ? 'Log in with the phone number or email address you signed up with.'
            : 'We will use this to keep your account secure. Your contact details are never shown on your profile.') + '</p>' +
          '<div class="stack-12" style="margin-top:32px">' +
            '<button class="row-select" data-go="a04" data-param="' + (login ? 'login' : '') + '">' +
              '<span class="row-select__ico">' + I('phone') + '</span>' +
              '<span class="row-select__main"><span class="row-select__value">Continue with phone</span>' +
              '<span class="row-select__label">We will send you a verification code</span></span>' +
              '<span class="row-select__chev">' + I('chevron-right') + '</span></button>' +
            '<button class="row-select" data-go="' + (login ? 'a07' : 'a06') + '">' +
              '<span class="row-select__ico">' + I('mail') + '</span>' +
              '<span class="row-select__main"><span class="row-select__value">Continue with email</span>' +
              '<span class="row-select__label">' + (login ? 'Email and password' : 'Set up an email and password') + '</span></span>' +
              '<span class="row-select__chev">' + I('chevron-right') + '</span></button>' +
          '</div>' +
          '<div style="margin-top:28px;text-align:center">' +
            '<button class="mlink mlink--muted" data-go="' + (login ? 'a03' : 'a03') + '" data-param="' + (login ? '' : 'login') + '" data-mode="replace">' +
            (login ? 'Need an account? Create one' : 'Already have an account? Log in') + '</button></div>' +
        '</div>';
    }
  });

  screen('a04', {
    render: function (p) {
      return topbar({ back: true }) +
        '<div class="scr__body scr__body--pad">' +
          '<h1 class="h-title">What is your phone number?</h1>' +
          '<p class="h-sub">We will text you a six digit code to verify it is you.</p>' +
          '<div style="margin-top:28px">' +
            '<label class="field__label">Phone number</label>' +
            '<div class="input-group">' +
              '<button class="row-select row-select--compact" style="flex:0 0 106px" data-country>' +
                '<span class="row-select__value" data-dial>+44</span>' +
                '<span class="row-select__chev">' + I('chevron-down') + '</span></button>' +
              '<input class="input" type="tel" inputmode="numeric" placeholder="7700 900123" data-phone>' +
            '</div>' +
            '<div class="field__slot" data-err></div>' +
            '<div class="field__hint" data-country-name>United Kingdom</div>' +
          '</div>' +
        '</div>' +
        '<div class="scr__foot"><button class="mbtn mbtn--primary" data-continue disabled>Continue</button></div>';
    },
    mount: function (el, p) {
      var input = UI.qs('[data-phone]', el);
      var btn = UI.qs('[data-continue]', el);
      var err = UI.qs('[data-err]', el);
      var dial = '+44';

      input.addEventListener('input', function () {
        input.value = input.value.replace(/[^\d\s]/g, '');
        var digits = input.value.replace(/\D/g, '');
        btn.disabled = digits.length < 7;
        input.classList.remove('is-invalid');
        err.innerHTML = '';
      });

      UI.on(el, 'click', '[data-country]', function () {
        var countries = [
          ['United Kingdom', '+44'], ['United States', '+1'], ['Canada', '+1'], ['Pakistan', '+92'],
          ['India', '+91'], ['Bangladesh', '+880'], ['United Arab Emirates', '+971'], ['Saudi Arabia', '+966'],
          ['Egypt', '+20'], ['Morocco', '+212'], ['Türkiye', '+90'], ['Malaysia', '+60'],
          ['Indonesia', '+62'], ['Nigeria', '+234'], ['Somalia', '+252'], ['France', '+33'],
          ['Germany', '+49'], ['Netherlands', '+31'], ['Australia', '+61'], ['South Africa', '+27']
        ];
        var sh = UI.sheet(root, {
          title: 'Country',
          body: '<div class="sheet-search"><div class="search-input">' + I('search') +
            '<input type="text" placeholder="Search country" data-csearch></div></div><div class="opt-list" data-opts></div>'
        });
        function paint(q) {
          q = (q || '').toLowerCase();
          UI.qs('[data-opts]', sh.el).innerHTML = countries.filter(function (c) {
            return !q || c[0].toLowerCase().indexOf(q) > -1 || c[1].indexOf(q) > -1;
          }).map(function (c) {
            return '<button class="opt' + (c[1] === dial ? ' is-on' : '') + '" data-dial="' + c[1] + '" data-name="' + E(c[0]) + '">' +
              '<span class="opt__label">' + E(c[0]) + '</span>' +
              '<span style="color:var(--ink-400);font-weight:700">' + c[1] + '</span>' +
              '<span class="opt__check">' + I('check') + '</span></button>';
          }).join('');
        }
        paint('');
        UI.on(sh.el, 'input', '[data-csearch]', function (e, t) { paint(t.value); });
        UI.on(sh.el, 'click', '[data-dial]', function (e, t) {
          dial = t.dataset.dial;
          UI.qs('[data-dial]', el).textContent = dial;
          UI.qs('[data-country-name]', el).textContent = t.dataset.name;
          sh.close();
        });
      });

      btn.addEventListener('click', function () {
        var digits = input.value.replace(/\D/g, '');
        if (digits.length < 9) {
          input.classList.add('is-invalid');
          err.innerHTML = '<div class="field__error">' + I('alert') + 'That number looks too short. Please check and try again.</div>';
          return;
        }
        go('a05', { dial: dial, number: input.value, mode: p.mode });
      });
    }
  });

  screen('a05', {
    render: function (p) {
      return topbar({ back: true }) +
        '<div class="scr__body scr__body--pad">' +
          '<h1 class="h-title">Enter your code</h1>' +
          '<p class="h-sub">We sent a six digit code to <b>' + E((p.dial || '+44') + ' ' + (p.number || '7700 900123')) + '</b></p>' +
          '<div class="otp" style="margin-top:32px" data-otp>' +
            '<input inputmode="numeric" maxlength="1"><input inputmode="numeric" maxlength="1">' +
            '<input inputmode="numeric" maxlength="1"><input inputmode="numeric" maxlength="1">' +
            '<input inputmode="numeric" maxlength="1"><input inputmode="numeric" maxlength="1">' +
          '</div>' +
          '<div data-otp-err></div>' +
          '<div class="otp-meta">' +
            '<span class="otp-count" data-count>Resend code in 0:30</span>' +
            '<button class="mlink" data-resend disabled>Resend</button>' +
          '</div>' +
          '<div class="center" style="margin-top:20px">' +
            '<button class="mlink mlink--muted" data-back>Change phone number</button></div>' +
        '</div>' +
        '<div class="scr__foot"><button class="mbtn mbtn--primary" data-verify disabled>Verify</button></div>';
    },
    mount: function (el, p) {
      var boxes = UI.qsa('.otp input', el);
      var wrap = UI.qs('[data-otp]', el);
      var btn = UI.qs('[data-verify]', el);
      var errSlot = UI.qs('[data-otp-err]', el);
      var countEl = UI.qs('[data-count]', el);
      var resend = UI.qs('[data-resend]', el);

      boxes[0].focus();
      boxes.forEach(function (b, i) {
        b.addEventListener('input', function () {
          b.value = b.value.replace(/\D/g, '');
          b.classList.toggle('is-filled', !!b.value);
          wrap.classList.remove('is-invalid');
          errSlot.innerHTML = '';
          if (b.value && i < boxes.length - 1) boxes[i + 1].focus();
          btn.disabled = boxes.some(function (x) { return !x.value; });
        });
        b.addEventListener('keydown', function (ev) {
          if (ev.key === 'Backspace' && !b.value && i > 0) boxes[i - 1].focus();
        });
      });

      var left = 30;
      el._timer = setInterval(function () {
        left--;
        if (left <= 0) {
          clearInterval(el._timer);
          countEl.textContent = 'Did not receive it?';
          resend.disabled = false;
        } else {
          countEl.textContent = 'Resend code in 0:' + ('0' + left).slice(-2);
        }
      }, 1000);

      resend.addEventListener('click', function () {
        UI.toast(root, 'New code sent', 'check');
        left = 30; resend.disabled = true;
        clearInterval(el._timer);
        el._timer = setInterval(function () {
          left--;
          if (left <= 0) { clearInterval(el._timer); countEl.textContent = 'Did not receive it?'; resend.disabled = false; }
          else countEl.textContent = 'Resend code in 0:' + ('0' + left).slice(-2);
        }, 1000);
      });

      btn.addEventListener('click', function () {
        var code = boxes.map(function (b) { return b.value; }).join('');
        if (code === '000000') {
          wrap.classList.add('is-invalid');
          errSlot.innerHTML = '<div class="field__error">' + I('alert') + 'That code is not right. Check the message and try again.</div>';
          setTimeout(function () { wrap.classList.remove('is-invalid'); }, 500);
          return;
        }
        go('a08', { next: p.mode === 'login' ? 'app' : 'setup' }, { mode: 'replace' });
      });
    },
    unmount: function (el) { clearInterval(el._timer); }
  });

  screen('a06', {
    render: function () {
      return topbar({ back: true }) +
        '<div class="scr__body scr__body--pad">' +
          '<h1 class="h-title">Sign up with email</h1>' +
          '<p class="h-sub">Choose a password you do not use anywhere else.</p>' +
          '<div style="margin-top:28px">' +
            '<div class="field"><label class="field__label">Email address</label>' +
              '<input class="input" type="email" inputmode="email" placeholder="you@example.com" data-email>' +
              '<div data-email-err></div></div>' +
            '<div class="field"><label class="field__label">Password</label>' +
              '<div class="input-wrap"><input class="input" type="password" placeholder="At least 8 characters" data-pass>' +
              '<button class="input-reveal" data-reveal="pass">' + I('eye') + '</button></div>' +
              '<div class="pstrength" data-strength data-level="0"><div class="pstrength__bars"><i></i><i></i><i></i></div>' +
              '<span class="pstrength__label">—</span></div></div>' +
            '<div class="field"><label class="field__label">Confirm password</label>' +
              '<div class="input-wrap"><input class="input" type="password" placeholder="Re-enter your password" data-pass2>' +
              '<button class="input-reveal" data-reveal="pass2">' + I('eye') + '</button></div>' +
              '<div data-pass2-err></div></div>' +
          '</div>' +
        '</div>' +
        '<div class="scr__foot"><button class="mbtn mbtn--primary" data-continue disabled>Continue</button></div>';
    },
    mount: function (el) {
      var email = UI.qs('[data-email]', el), pass = UI.qs('[data-pass]', el), pass2 = UI.qs('[data-pass2]', el);
      var btn = UI.qs('[data-continue]', el);
      var strength = UI.qs('[data-strength]', el);

      UI.on(el, 'click', '[data-reveal]', function (e, t) {
        var input = UI.qs('[data-' + t.dataset.reveal + ']', el);
        input.type = input.type === 'password' ? 'text' : 'password';
      });

      function level(v) {
        var s = 0;
        if (v.length >= 8) s++;
        if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
        if (/\d/.test(v) || /[^\w\s]/.test(v)) s++;
        return v ? Math.max(1, s) : 0;
      }

      function validate() {
        var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value);
        var lv = level(pass.value);
        strength.dataset.level = lv;
        UI.qs('.pstrength__label', strength).textContent = ['—', 'Weak', 'Fair', 'Strong'][lv];
        UI.qs('[data-email-err]', el).innerHTML = (email.value && !okEmail)
          ? '<div class="field__error">' + I('alert') + 'Enter a valid email address.</div>' : '';
        email.classList.toggle('is-invalid', !!email.value && !okEmail);
        var match = !pass2.value || pass.value === pass2.value;
        UI.qs('[data-pass2-err]', el).innerHTML = match ? ''
          : '<div class="field__error">' + I('alert') + 'Passwords do not match.</div>';
        pass2.classList.toggle('is-invalid', !match);
        btn.disabled = !(okEmail && pass.value.length >= 8 && pass.value === pass2.value);
      }

      [email, pass, pass2].forEach(function (i) { i.addEventListener('input', validate); });
      btn.addEventListener('click', function () { go('a08', { next: 'setup' }, { mode: 'replace' }); });
    }
  });

  screen('a07', {
    render: function () {
      return topbar({ back: true }) +
        '<div class="scr__body scr__body--pad">' +
          '<h1 class="h-title">Log in</h1>' +
          '<p class="h-sub">Welcome back. Enter your details to continue.</p>' +
          '<div style="margin-top:28px">' +
            '<div class="field"><label class="field__label">Email address</label>' +
              '<input class="input" type="email" inputmode="email" placeholder="you@example.com" data-email></div>' +
            '<div class="field"><label class="field__label">Password</label>' +
              '<div class="input-wrap"><input class="input" type="password" placeholder="Your password" data-pass>' +
              '<button class="input-reveal" data-reveal="pass">' + I('eye') + '</button></div>' +
              '<div data-login-err></div></div>' +
          '</div>' +
        '</div>' +
        '<div class="scr__foot"><button class="mbtn mbtn--primary" data-login disabled>Log in</button></div>';
    },
    mount: function (el) {
      var email = UI.qs('[data-email]', el), pass = UI.qs('[data-pass]', el);
      var btn = UI.qs('[data-login]', el);
      UI.on(el, 'click', '[data-reveal]', function () {
        pass.type = pass.type === 'password' ? 'text' : 'password';
      });
      function v() { btn.disabled = !(email.value && pass.value.length >= 4); }
      [email, pass].forEach(function (i) { i.addEventListener('input', v); });
      btn.addEventListener('click', function () {
        btn.disabled = true;
        btn.innerHTML = '<svg class="spinner" viewBox="0 0 34 34" style="width:22px;height:22px"><circle cx="17" cy="17" r="14"/><path d="M17 3a14 14 0 0 1 14 14"/></svg>';
        setTimeout(function () { go('a08', { next: 'app' }, { mode: 'replace' }); }, 900);
      });
    }
  });

  screen('a08', {
    render: function (p) {
      return '<div class="scr__body" style="display:flex;align-items:center;justify-content:center;padding:32px">' +
        '<div class="center" style="width:100%">' +
          '<div class="success-mark">' + I('check') + '</div>' +
          '<h1 class="h-display">' + (p.next === 'app' ? 'Welcome back, Yusuf' : "You're verified") + '</h1>' +
          '<p class="h-sub">' + (p.next === 'app'
            ? 'Taking you to your recommendations.'
            : 'Next, we will build the profile that people will see.') + '</p>' +
          '<div style="margin-top:36px;display:flex;justify-content:center">' +
            '<svg class="spinner" viewBox="0 0 34 34"><circle cx="17" cy="17" r="14"/><path d="M17 3a14 14 0 0 1 14 14"/></svg>' +
          '</div>' +
        '</div></div>';
    },
    mount: function (el, p) {
      /* 'root' clears the authentication stack — there is nothing to go back to. */
      el._timer = setTimeout(function () {
        go(p.next === 'app' ? 'd01' : 'b01', {}, { mode: 'root' });
      }, 1500);
    }
  });

  /* ======================================================================
     B — Profile creation
     ====================================================================== */

  screen('b01', {
    render: function () {
      var items = [
        ['profile', 'About you', 'Name, age, where you live'],
        ['faith', 'Faith and background', 'Sect, practice, nationality, languages'],
        ['intentions', 'What you are looking for', 'Family values, intentions, lifestyle'],
        ['photo', 'Photos', 'Up to six photos, in the order you choose']
      ];
      return topbar({}) +
        '<div class="scr__body scr__body--pad">' +
          '<div class="step-head__ico">' + I('edit') + '</div>' +
          '<h1 class="h-display">Let us build your profile</h1>' +
          '<p class="h-sub">A considered profile attracts people who are serious. You can change anything later.</p>' +
          '<div class="intro-list">' + items.map(function (it) {
            return '<div class="intro-item"><div class="intro-item__ico">' + I(it[0]) + '</div>' +
              '<div><div class="intro-item__t">' + it[1] + '</div><div class="intro-item__d">' + it[2] + '</div></div></div>';
          }).join('') + '</div>' +
          '<div class="time-note">' + I('clock') + 'Takes about four minutes</div>' +
        '</div>' +
        '<div class="scr__foot"><button class="mbtn mbtn--primary" data-go="builder" data-param="0">Get started</button></div>';
    }
  });

  screen('builder', {
    render: function (p) {
      var i = +p.i || 0;
      var steps = DATA.BUILDER_STEPS;
      var step = steps[i];
      return topbar({ back: true, right: '<button class="mlink mlink--muted" data-skip>Skip</button>' }) +
        '<div class="progress-meta"><span class="progress-meta__step">' + E(step.short) + '</span>' +
          '<span class="progress-meta__count">Step ' + (i + 1) + ' of ' + steps.length + '</span></div>' +
        '<div class="progress">' + steps.map(function (_, k) {
          return '<div class="progress__seg ' + (k < i ? 'is-done' : (k === i ? 'is-now' : '')) + '"></div>';
        }).join('') + '</div>' +
        '<div class="scr__body scr__body--pad">' +
          '<div class="step-head" style="padding-left:0;padding-right:0;padding-top:8px">' +
            '<div class="step-head__ico">' + I(step.icon) + '</div>' +
            '<h1 class="h-title">' + E(step.title) + '</h1>' +
            '<p class="h-sub">' + E(step.subtitle) + '</p>' +
          '</div>' +
          step.fields.map(function (f) { return fieldHTML(f, S.profile); }).join('') +
        '</div>' +
        '<div class="scr__foot"><button class="mbtn mbtn--primary" data-next>' +
          (i === DATA.BUILDER_STEPS.length - 1 ? 'Preview my profile' : 'Continue') + '</button></div>';
    },
    mount: function (el, p) {
      var i = +p.i || 0;
      var step = DATA.BUILDER_STEPS[i];
      var btn = UI.qs('[data-next]', el);

      wireFields(el, S.profile, step.fields, function (key) {
        if (key === 'bio') validateBio();
        if (key === 'firstName') S.profile.name = S.profile.firstName + ' Karim';
      });

      function validateBio() {
        var f = step.fields[0];
        if (step.key !== 'about') return;
        var v = S.profile.bio || '';
        var wrap = UI.qs('[data-field="bio"] .field__slot', el);
        var ta = UI.qs('[data-input="bio"]', el);
        if (v.length && v.length < (f.min || 60)) {
          wrap.innerHTML = '<div class="field__error">' + I('alert') + 'Please write at least ' + f.min + ' characters — you have ' + v.length + '.</div>';
          ta.classList.add('is-invalid');
          btn.disabled = true;
        } else {
          wrap.innerHTML = '';
          ta.classList.remove('is-invalid');
          btn.disabled = false;
        }
      }

      /* Steps push, so Back walks through the wizard one step at a time. */
      function advance() {
        if (i < DATA.BUILDER_STEPS.length - 1) go('builder', { i: i + 1 });
        else go('b13', {});
      }
      btn.addEventListener('click', function () {
        if (step.key === 'about') { validateBio(); if (btn.disabled) return; }
        advance();
      });
      UI.on(el, 'click', '[data-skip]', advance);
    }
  });

  screen('b13', {
    render: function () {
      return topbar({ back: true, title: 'Profile preview', bordered: true }) +
        '<div class="scr__body">' +
          '<div style="padding:16px 20px 0"><div class="time-note" style="margin-top:0">' + I('eye') +
            'This is how your profile appears to others</div></div>' +
          profileBodyHTML(S.profile) +
        '</div>' +
        '<div class="scr__foot scr__foot--solid" style="display:flex;gap:12px">' +
          '<button class="mbtn mbtn--outline" style="flex:0 0 120px" data-back>Edit</button>' +
          '<button class="mbtn mbtn--primary" data-go="b14">Looks good</button>' +
        '</div>';
    },
    mount: mountGallery
  });

  screen('b14', {
    render: function () {
      return '<div class="scr__body" style="display:flex;align-items:center;justify-content:center;padding:32px">' +
        '<div class="center" style="width:100%">' +
          '<div class="success-mark">' + I('check') + '</div>' +
          '<h1 class="h-display">Your profile is live</h1>' +
          '<p class="h-sub">Eleven sections complete. You can refine any of them at any time from your profile.</p>' +
          '<div style="margin-top:28px;display:flex;justify-content:center;gap:8px;flex-wrap:wrap">' +
            UI.chips(['Photos', 'About', 'Faith', 'Background', 'Career', 'Family', 'Intentions']) +
          '</div>' +
        '</div></div>' +
        '<div class="scr__foot"><button class="mbtn mbtn--primary" data-go="d01" data-mode="root">Start discovering</button></div>';
    }
  });

  /* ======================================================================
     D — Discovery
     ====================================================================== */

  function activeQueue() {
    return S.queue.filter(function (id) { return !S.acted[id]; });
  }

  function currentPerson() {
    var q = activeQueue();
    return q.length ? DATA.BY_ID[q[0]] : null;
  }

  function filterCount() {
    var n = 0, f = S.filters;
    Object.keys(f).forEach(function (k) {
      var v = f[k];
      if (Array.isArray(v) && v.length && typeof v[0] === 'string') n++;
      else if (Array.isArray(v) && typeof v[0] === 'number') {
        var d = DATA.DEFAULT_FILTERS[k];
        if (v[0] !== d[0] || v[1] !== d[1]) n++;
      }
    });
    return n;
  }

  screen('d01', {
    tab: 'discover',
    cls: 'scr--soft',
    render: function () {
      var p = currentPerson();
      var fc = filterCount();
      var head = topbar({
        brand: true,
        right: '<button class="icon-btn icon-btn--badge" data-go="filters" data-mode="modal" aria-label="Filters">' +
          I('filter') + (fc ? '<span class="icon-btn__badge">' + fc + '</span>' : '') + '</button>'
      });

      if (!p) {
        return head + '<div class="empty">' +
          '<div class="empty__ico empty__ico--warm">' + I('sparkle') + '</div>' +
          '<h2 class="empty__title">You are all caught up</h2>' +
          '<p class="empty__text">That is everyone we have for you today. New recommendations arrive each morning — or widen your filters to see more people now.</p>' +
          '<div class="empty__cta"><button class="mbtn mbtn--primary" data-go="filters" data-mode="modal">Adjust filters</button></div>' +
          '</div>';
      }

      var total = S.queue.length;
      var done = total - activeQueue().length;
      return head +
        '<div class="disc">' +
          '<div class="disc__meta">' +
            '<span class="disc__count">Today\'s recommendations · <b>' + (done + 1) + ' of ' + total + '</b></span>' +
            '<span class="disc__count">' + (fc ? fc + ' filters on' : 'No filters') + '</span>' +
          '</div>' +
          '<div class="disc__deck" data-deck>' + cardHTML(p) + '</div>' +
          '<div class="disc__actions">' +
            '<button class="act-btn act-btn--pass" data-act="pass" aria-label="Pass">' + I('pass') + '</button>' +
            '<button class="act-btn act-btn--like" data-act="like" aria-label="Like">' + I('heart-filled') + '</button>' +
          '</div>' +
        '</div>';
    },
    mount: function (el) { mountDeck(el); }
  });

  function cardHTML(p) {
    return '<article class="disc__card disc__card--enter" data-card="' + p.id + '">' +
      '<div class="disc__photo">' + img(p.photos[0], 820, 1120, p.firstName) + '</div>' +
      '<div class="stamp stamp--like">Like</div>' +
      '<div class="stamp stamp--pass">Pass</div>' +
      '<div class="disc__why">' + p.matchedOn.slice(0, 3).map(function (m) {
        return '<span class="why-chip">' + I('check') + E(m) + '</span>';
      }).join('') + '</div>' +
      '<div class="disc__info">' +
        '<div class="disc__name"><h2>' + E(p.firstName) + '</h2><span class="disc__age">' + p.age + '</span></div>' +
        '<div class="disc__where">' + I('location') + E(p.location) + ' · ' + E(p.distance) + '</div>' +
        '<div class="disc__chips">' +
          gchip(p.profession, 'profession') +
          gchip(p.sect, 'faith') +
          gchip(p.education, 'education') +
          gchip(p.languages[0] + (p.languages.length > 1 ? ' +' + (p.languages.length - 1) : ''), 'language') +
        '</div>' +
        '<button class="disc__open" data-open>' + I('chevron-up') + 'View full profile</button>' +
      '</div>' +
      '</article>';
  }

  function mountDeck(el) {
    var deck = UI.qs('[data-deck]', el);
    if (!deck) return;
    var card = UI.qs('.disc__card', deck);
    if (!card) return;

    var stampLike = UI.qs('.stamp--like', card);
    var stampPass = UI.qs('.stamp--pass', card);
    var startX = 0, startY = 0, dx = 0, dy = 0, dragging = false, moved = false;

    card.addEventListener('pointerdown', function (ev) {
      if (ev.target.closest('[data-open]')) return;
      dragging = true; moved = false;
      startX = ev.clientX; startY = ev.clientY;
      card.style.transition = 'none';
      card.setPointerCapture(ev.pointerId);
    });
    card.addEventListener('pointermove', function (ev) {
      if (!dragging) return;
      dx = ev.clientX - startX; dy = ev.clientY - startY;
      if (Math.abs(dx) > 6) moved = true;
      card.style.transform = 'translate(' + dx + 'px,' + dy * 0.28 + 'px) rotate(' + (dx / 18) + 'deg)';
      stampLike.style.opacity = UI.clamp(dx / 110, 0, 1);
      stampPass.style.opacity = UI.clamp(-dx / 110, 0, 1);
    });
    function release() {
      if (!dragging) return;
      dragging = false;
      card.style.transition = '';
      if (dx > 105) { decide('like'); return; }
      if (dx < -105) { decide('pass'); return; }
      card.style.transform = '';
      stampLike.style.opacity = 0;
      stampPass.style.opacity = 0;
      dx = 0;
    }
    card.addEventListener('pointerup', release);
    card.addEventListener('pointercancel', release);

    UI.on(el, 'click', '[data-open]', function () {
      var p = currentPerson();
      if (p) go('d02', { id: p.id });
    });
    card.addEventListener('click', function (ev) {
      if (moved) { moved = false; return; }
      if (ev.target.closest('[data-open]')) return;
      var p = currentPerson();
      if (p) go('d02', { id: p.id });
    });

    UI.on(el, 'click', '[data-act]', function (e, t) { decide(t.dataset.act); });

    function decide(kind) {
      var p = currentPerson();
      if (!p) return;
      var btn = UI.qs('.act-btn--' + kind, el);
      if (btn) { btn.classList.add('act-btn--pulse'); setTimeout(function () { btn.classList.remove('act-btn--pulse'); }, 480); }
      if (kind === 'like') heartBurst(deck);
      card.classList.add('disc__card--' + kind);
      applyDecision(p, kind);
    }
  }

  function heartBurst(host) {
    var b = UI.h('<div class="burst"></div>');
    for (var i = 0; i < 7; i++) {
      var s = UI.h('<i style="--dx:' + (Math.random() * 200 - 100) + 'px;--rot:' +
        (Math.random() * 60 - 30) + 'deg;animation-delay:' + (i * 55) + 'ms">' + I('heart-filled') + '</i>');
      b.appendChild(s);
    }
    host.appendChild(b);
    setTimeout(function () { b.remove(); }, 1400);
  }

  function applyDecision(p, kind) {
    S.acted[p.id] = kind;
    if (kind === 'like' && p.likedYou && !S.celebrated[p.id]) {
      S.celebrated[p.id] = true;
      S.matches.unshift({ id: p.id, matchedOn: 'Just now', state: 'new' });
      setTimeout(function () { go('e01', { id: p.id }, { mode: 'replace' }); }, 380);
      return;
    }
    setTimeout(function () {
      go('d01', {}, { mode: 'replace' });
      if (kind === 'like') {
        UI.toast(root, 'Liked. We will let you know if it is mutual.', 'heart');
      }
    }, 400);
  }

  screen('d02', {
    render: function (p) {
      var person = who(p);
      return topbar({ back: true, backIcon: 'chevron-down', title: person.firstName, bordered: true }) +
        '<div class="scr__body">' + profileBodyHTML(person) +
          '<div class="pv__actions">' +
            '<button class="act-btn act-btn--pass" data-act="pass" aria-label="Pass">' + I('pass') + '</button>' +
            '<button class="act-btn act-btn--like" data-act="like" aria-label="Like">' + I('heart-filled') + '</button>' +
          '</div>' +
        '</div>';
    },
    mount: function (el, p) {
      mountGallery(el);
      var person = who(p);
      UI.on(el, 'click', '[data-act]', function (e, t) {
        var kind = t.dataset.act;
        t.classList.add('act-btn--pulse');
        if (kind === 'like') heartBurst(el);
        S.acted[person.id] = kind;
        if (kind === 'like' && person.likedYou && !S.celebrated[person.id]) {
          S.celebrated[person.id] = true;
          S.matches.unshift({ id: person.id, matchedOn: 'Just now', state: 'new' });
          setTimeout(function () { go('e01', { id: person.id }, { mode: 'replace' }); }, 420);
        } else {
          setTimeout(function () {
            go('d01', {}, { mode: 'root' });
            if (kind === 'like') UI.toast(root, 'Liked. We will let you know if it is mutual.', 'heart');
          }, 420);
        }
      });
    }
  });

  /* ======================================================================
     E — Mutual match
     ====================================================================== */

  screen('e01', {
    status: 'light', cls: 'scr--dark scr--bleed',
    render: function (p) {
      var person = who(p);
      /* Sparks stay in the side margins so they never land inside a word. */
      var sparks = '';
      for (var i = 0; i < 14; i++) {
        var side = i % 2 ? (78 + Math.random() * 18) : (4 + Math.random() * 18);
        sparks += '<i style="left:' + side + '%;top:' + (18 + Math.random() * 64) +
          '%;animation-delay:' + (Math.random() * 2400) + 'ms"></i>';
      }
      return '<div class="cel">' +
        '<div class="cel__spark">' + sparks + '</div>' +
        '<div class="cel__in">' +
          '<div class="cel__avatars">' +
            '<div class="cel__av cel__av--a">' + img(S.profile.photos[0], 320, 320, 'You', 'face') + '</div>' +
            '<div class="cel__badge">' + I('heart-filled') + '</div>' +
            '<div class="cel__av cel__av--b">' + img(person.photos[0], 320, 320, person.firstName, 'face') + '</div>' +
          '</div>' +
          '<div class="cel__fade">' +
            '<div class="cel__eyebrow">Mutual match</div>' +
            '<h1 class="cel__title">You and ' + E(person.firstName) + '<br>both said yes</h1>' +
            '<p class="cel__text">Conversations open only when the interest is mutual. Take your time and start when you are ready.</p>' +
            '<div class="cel__actions">' +
              '<button class="mbtn mbtn--gold" data-go="f01" data-param="' + person.id + '">Start conversation</button>' +
              '<button class="mbtn mbtn--outline-light" data-go="d01" data-mode="root">Keep discovering</button>' +
              '<button class="mlink mlink--light" data-go="e02" data-param="' + person.id + '">View ' + E(person.firstName) + '\'s profile</button>' +
            '</div>' +
          '</div>' +
        '</div></div>';
    }
  });

  screen('e02', {
    render: function (p) {
      var person = who(p);
      return topbar({ back: true, backIcon: 'chevron-down', title: person.firstName, bordered: true }) +
        '<div class="scr__body">' +
          '<div style="padding:16px 20px 0"><div class="time-note" style="margin-top:0;background:var(--brand-50);border-color:var(--brand-200);color:var(--brand-800)">' +
            I('match') + 'You matched ' + E(matchMeta(person.id)) + '</div></div>' +
          profileBodyHTML(person) +
        '</div>' +
        '<div class="scr__foot scr__foot--solid">' +
          '<button class="mbtn mbtn--primary" data-go="' + (threadOf(person.id).messages.length ? 'h02' : 'f01') +
          '" data-param="' + person.id + '">' + I('chat') + 'Message ' + E(person.firstName) + '</button></div>';
    },
    mount: mountGallery
  });

  /* Screens that take a person always resolve to someone, even if a jump or
     a stale link arrives without an id. */
  function who(p) {
    return (p && DATA.BY_ID[p.id]) || currentPerson() || DATA.BY_ID[DATA.DISCOVERY_ORDER[0]];
  }

  function matchMeta(id) {
    var m = S.matches.filter(function (x) { return x.id === id; })[0];
    return m ? m.matchedOn.toLowerCase() : 'recently';
  }
  function threadOf(id) {
    if (!S.threads[id]) S.threads[id] = { id: id, updated: '', unread: 0, messages: [] };
    return S.threads[id];
  }

  /* ======================================================================
     F — Conversation starters
     ====================================================================== */

  screen('f01', {
    render: function (p) {
      var person = who(p);
      return topbar({ back: true, backIcon: 'close', title: 'Start a conversation', bordered: true }) +
        '<div class="scr__body">' +
          '<div class="starters">' +
            '<div class="starters__head">' +
              '<div style="display:flex;justify-content:center;margin-bottom:14px">' + avatar(person.photos[0], 72, person.firstName) + '</div>' +
              '<h3>Say salaam to ' + E(person.firstName) + '</h3>' +
              '<p>Pick a prompt to open with, or write your own message.</p>' +
            '</div>' +
            DATA.STARTERS.map(function (s, i) {
              return '<button class="starter" data-starter="' + i + '">' +
                '<span class="starter__theme">' + E(s.theme) + '</span>' +
                '<span class="starter__text">' + E(s.text) + '</span></button>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="scr__foot scr__foot--solid">' +
          '<button class="mbtn mbtn--primary" data-use disabled>Use this opener</button>' +
          '<div class="center" style="margin-top:8px">' +
          '<button class="mlink mlink--muted" data-go="h02" data-param="' + person.id + '" data-mode="replace">Write my own instead</button></div>' +
        '</div>';
    },
    mount: function (el, p) {
      var person = who(p);
      var chosen = null;
      var btn = UI.qs('[data-use]', el);
      UI.on(el, 'click', '[data-starter]', function (e, t) {
        UI.qsa('.starter', el).forEach(function (s) { s.classList.remove('is-on'); });
        t.classList.add('is-on');
        chosen = DATA.STARTERS[+t.dataset.starter].text;
        btn.disabled = false;
      });
      btn.addEventListener('click', function () {
        S.draftStarter = chosen;
        go('h02', { id: person.id }, { mode: 'replace' });
      });
    }
  });

  /* ======================================================================
     G — Matches
     ====================================================================== */

  screen('g01', {
    tab: 'matches',
    render: function () {
      var head = topbar({ title: 'Matches', bordered: true });
      if (!S.matches.length) {
        return head + '<div class="empty">' +
          '<div class="empty__ico">' + I('match') + '</div>' +
          '<h2 class="empty__title">No matches yet</h2>' +
          '<p class="empty__text">When you and someone else both say yes, they will appear here and a conversation opens up.</p>' +
          '<div class="empty__cta"><button class="mbtn mbtn--primary" data-go="d01" data-mode="root">Start discovering</button></div>' +
          '</div>';
      }
      var fresh = S.matches.filter(function (m) { return !threadOf(m.id).messages.length; });
      var rail = fresh.length ? '<div class="new-matches">' +
        '<div class="sec-title" style="padding-bottom:12px">New matches</div>' +
        '<div class="new-matches__rail">' + fresh.map(function (m) {
          var p = DATA.BY_ID[m.id];
          return '<button class="nm" data-go="f01" data-param="' + p.id + '">' +
            '<span class="nm__ring">' + avatar(p.photos[0], 63, p.firstName) + '</span>' +
            '<span class="nm__name">' + E(p.firstName) + '</span></button>';
        }).join('') + '</div></div>' : '';

      return head + '<div class="scr__body">' + rail +
        '<div class="sec-title">All matches · ' + S.matches.length + '</div>' +
        '<div class="matches-grid">' + S.matches.map(function (m) {
          var p = DATA.BY_ID[m.id];
          var t = threadOf(m.id);
          var pill = t.messages.length
            ? '<span class="mcard__pill">Chatting</span>'
            : '<span class="mcard__pill mcard__pill--new">New</span>';
          return '<button class="mcard" data-go="e02" data-param="' + p.id + '">' +
            img(p.photos[0], 420, 560, p.firstName) + pill +
            '<span class="mcard__info"><span class="mcard__name">' + E(p.firstName) + ', ' + p.age + '</span>' +
            '<span class="mcard__meta">' + E(p.location.split(',')[0]) + ' · Matched ' + E(m.matchedOn.toLowerCase()) + '</span></span>' +
            '</button>';
        }).join('') + '</div></div>';
    }
  });

  /* ======================================================================
     H — Chat
     ====================================================================== */

  screen('h01', {
    tab: 'chats',
    render: function () {
      var head = topbar({ title: 'Chats', bordered: true });
      var withMsgs = S.matches.filter(function (m) { return threadOf(m.id).messages.length; });
      var without = S.matches.filter(function (m) { return !threadOf(m.id).messages.length; });

      if (!S.matches.length) {
        return head + '<div class="empty">' +
          '<div class="empty__ico">' + I('chat') + '</div>' +
          '<h2 class="empty__title">No conversations yet</h2>' +
          '<p class="empty__text">Chat opens as soon as you and someone else have both shown interest.</p>' +
          '<div class="empty__cta"><button class="mbtn mbtn--primary" data-go="d01" data-mode="root">Start discovering</button></div>' +
          '</div>';
      }

      var rail = without.length ? '<div class="new-matches" style="border-bottom:1px solid var(--line-soft)">' +
        '<div class="sec-title" style="padding-bottom:12px">Say salaam</div>' +
        '<div class="new-matches__rail">' + without.map(function (m) {
          var p = DATA.BY_ID[m.id];
          return '<button class="nm" data-go="f01" data-param="' + p.id + '">' +
            '<span class="nm__ring">' + avatar(p.photos[0], 63, p.firstName) + '</span>' +
            '<span class="nm__name">' + E(p.firstName) + '</span></button>';
        }).join('') + '</div></div>' : '';

      var rows = withMsgs.length ? withMsgs.map(function (m) {
        var p = DATA.BY_ID[m.id], t = threadOf(m.id);
        var last = t.messages[t.messages.length - 1];
        var mine = last.from === 'me';
        var st = last.st || (last.read ? 'read' : 'delivered');
        return '<button class="chat-row' + (t.unread ? ' is-unread' : '') + '" data-go="h02" data-param="' + p.id + '">' +
          '<span class="chat-row__av">' + avatar(p.photos[0], 54, p.firstName) + '</span>' +
          '<span class="chat-row__main">' +
            '<span class="chat-row__top"><span class="chat-row__name">' + E(p.firstName) + '</span>' +
            '<span class="chat-row__time">' + E(t.updated) + '</span></span>' +
            '<span class="chat-row__msg">' +
              (mine ? I('read', st === 'read' ? 'is-read' : '') : '') +
              '<span class="chat-row__text">' + E(last.text) + '</span></span>' +
          '</span>' +
          (t.unread ? '<span class="chat-row__badge">' + t.unread + '</span>' : '') +
          '</button>';
      }).join('') : '<div class="field__hint" style="padding:32px 20px;text-align:center">No messages yet. Open a new match to say salaam.</div>';

      return head + '<div class="scr__body"><div class="chat-list">' + rail + rows + '</div></div>';
    }
  });

  screen('h02', {
    cls: 'scr--soft',
    render: function (p) {
      var person = who(p);
      var t = threadOf(person.id);
      t.unread = 0;
      return '<header class="topbar topbar--bordered">' +
          '<div class="topbar__side"><button class="icon-btn" data-back>' + I('chevron-left') + '</button></div>' +
          '<button class="chat-head" data-go="e02" data-param="' + person.id + '">' +
            avatar(person.photos[0], 38, person.firstName) +
            '<span><span class="chat-head__name">' + E(person.firstName) + '</span>' +
            '<span class="chat-head__status" data-status>Matched ' + E(matchMeta(person.id).toLowerCase()) + '</span></span>' +
          '</button>' +
          '<div class="topbar__side topbar__side--end"></div>' +
        '</header>' +
        '<div class="msgs" data-msgs>' + messagesHTML(t) + '</div>' +
        (t.messages.length ? '' : starterStripHTML()) +
        '<div class="composer">' +
          '<button class="composer__starter" data-open-starters aria-label="Conversation starters">' + I('quote') + '</button>' +
          '<div class="composer__box">' +
            '<textarea class="composer__input" rows="1" placeholder="Write a message" data-composer></textarea>' +
          '</div>' +
          '<button class="composer__send" data-send disabled aria-label="Send">' + I('send') + '</button>' +
        '</div>';
    },
    mount: function (el, p) {
      var person = who(p);
      var t = threadOf(person.id);
      var msgs = UI.qs('[data-msgs]', el);
      var input = UI.qs('[data-composer]', el);
      var send = UI.qs('[data-send]', el);
      var status = UI.qs('[data-status]', el);
      msgs.scrollTop = msgs.scrollHeight;

      if (S.draftStarter) {
        input.value = S.draftStarter;
        S.draftStarter = null;
        send.disabled = false;
        autoGrow();
        setTimeout(function () { input.focus(); }, 380);
      }

      function autoGrow() {
        input.style.height = 'auto';
        input.style.height = Math.min(90, input.scrollHeight) + 'px';
      }
      input.addEventListener('input', function () {
        send.disabled = !input.value.trim();
        autoGrow();
      });
      input.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); doSend(); }
      });
      send.addEventListener('click', doSend);

      UI.on(el, 'click', '[data-starter-pill]', function (e, tEl) {
        input.value = DATA.STARTERS[+tEl.dataset.starterPill].text;
        send.disabled = false;
        autoGrow();
        input.focus();
      });

      UI.on(el, 'click', '[data-open-starters]', function () {
        var sh = UI.sheet(root, {
          title: 'Conversation starters',
          body: '<p class="field__hint" style="margin:-4px 0 16px">Marriage-minded prompts to open with.</p>' +
            DATA.STARTERS.map(function (s, i) {
              return '<button class="starter" data-sheet-starter="' + i + '">' +
                '<span class="starter__theme">' + E(s.theme) + '</span>' +
                '<span class="starter__text">' + E(s.text) + '</span></button>';
            }).join('')
        });
        UI.on(sh.el, 'click', '[data-sheet-starter]', function (e, tEl) {
          input.value = DATA.STARTERS[+tEl.dataset.sheetStarter].text;
          send.disabled = false;
          sh.close();
          setTimeout(function () { autoGrow(); input.focus(); }, 240);
        });
      });

      function doSend() {
        var text = input.value.trim();
        if (!text) return;
        var strip = UI.qs('.starter-strip', el);
        if (strip) strip.remove();

        var msg = { from: 'me', text: text, time: nowTime(), st: 'sent' };
        t.messages.push(msg);
        t.updated = 'Now';
        input.value = '';
        input.style.height = 'auto';
        send.disabled = true;
        redraw();

        setTimeout(function () { msg.st = 'delivered'; redraw(); }, 700);

        var pool = AUTO_REPLIES[person.id] || AUTO_REPLIES.default;
        var turn = S.replyTurn[person.id] || 0;
        if (turn < pool.length) {
          setTimeout(function () {
            status.textContent = person.firstName + ' is typing…';
            status.classList.add('is-typing');
            msgs.insertAdjacentHTML('beforeend', '<div class="typing" data-typing><i></i><i></i><i></i></div>');
            msgs.scrollTop = msgs.scrollHeight;
          }, 1100);

          setTimeout(function () {
            var typing = UI.qs('[data-typing]', msgs);
            if (typing) typing.remove();
            status.textContent = 'Online';
            status.classList.remove('is-typing');
            msg.st = 'read';
            t.messages.push({ from: 'them', text: pool[turn], time: nowTime() });
            S.replyTurn[person.id] = turn + 1;
            t.updated = 'Now';
            redraw();
          }, 3100);
        }
      }

      function redraw() {
        msgs.innerHTML = messagesHTML(t);
        msgs.scrollTop = msgs.scrollHeight;
      }
    }
  });

  function nowTime() {
    return '21:0' + Math.min(9, 2 + Math.floor(Math.random() * 7));
  }

  function starterStripHTML() {
    return '<div class="starter-strip">' +
      '<div class="starter-strip__label">' + I('quote') + 'Conversation starters</div>' +
      '<div class="starter-strip__rail">' + DATA.STARTERS.slice(0, 5).map(function (s, i) {
        return '<button class="starter-pill" data-starter-pill="' + i + '">' + E(s.text) + '</button>';
      }).join('') + '</div></div>';
  }

  function messagesHTML(t) {
    if (!t.messages.length) {
      return '<div style="flex:1;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px">' +
        '<div><div class="empty__ico" style="width:64px;height:64px;margin:0 auto 14px">' + I('chat') + '</div>' +
        '<p class="field__hint" style="max-width:230px">This conversation is open because you both showed interest. Say salaam when you are ready.</p></div></div>';
    }
    var out = '<div class="msg-day">Today</div>';
    t.messages.forEach(function (m, i) {
      var prev = t.messages[i - 1];
      var stacked = prev && prev.from === m.from;
      var mine = m.from === 'me';
      var st = m.st || (m.read ? 'read' : 'delivered');
      var label = st === 'read' ? 'Read' : st === 'delivered' ? 'Delivered' : 'Sent';
      out += '<div class="msg msg--' + (mine ? 'me' : 'them') +
        (stacked ? ' msg--stack-' + (mine ? 'me' : 'them') : '') + '">' +
        E(m.text) +
        '<span class="msg__meta">' + E(m.time) +
        (mine ? ' · ' + label + I('read', st === 'read' ? 'is-read' : '') : '') +
        '</span></div>';
    });
    return out;
  }

  /* ======================================================================
     I — My profile
     ====================================================================== */

  screen('i01', {
    tab: 'profile',
    render: function () {
      var p = S.profile;
      return '<div class="scr__body">' +
        '<div class="me-head"><div class="me-head__photo">' + img(p.photos[0], 820, 820, 'Your main photo') +
          '<div class="me-head__info"><div class="me-head__name">' + E(p.firstName) + ', ' + p.age + '</div>' +
          '<div class="disc__where">' + I('location') + E(p.location) + '</div></div></div>' +
        '</div>' +
        '<div class="me-head__actions">' +
          '<button class="mbtn mbtn--primary mbtn--sm" data-go="i02">' + I('edit') + 'Edit profile</button>' +
        '</div>' +
        '<div class="tile-row">' +
          '<button class="tile" data-go="filters" data-mode="modal"><span class="tile__ico">' + I('filter') + '</span>' +
            '<span><span class="tile__t">Match preferences</span><span class="tile__d">' + filterCount() + ' active</span></span></button>' +
          '<button class="tile" data-go="i03"><span class="tile__ico">' + I('photo') + '</span>' +
            '<span><span class="tile__t">Photos</span><span class="tile__d">' + p.photos.length + ' of 6</span></span></button>' +
        '</div>' +
        '<div class="pv"><div class="pv__body">' +
          '<div class="bio"><div class="bio__q">' + I('quote') + '</div>' + E(p.bio) + '</div>' +
          DATA.sections(p).map(sectionHTML).join('') +
        '</div></div>' +
        '</div>';
    }
  });

  var EDIT_ROWS = [
    { key: 'photos', step: 'photos', icon: 'photo', title: 'Photos', screen: 'i03' },
    { key: 'about', step: 'about', icon: 'about', title: 'About me' },
    { key: 'basic', step: 'basic', icon: 'profile', title: 'Basic information' },
    { key: 'faith', step: 'faith', icon: 'faith', title: 'Faith and practice' },
    { key: 'background', step: 'background', icon: 'globe', title: 'Background' },
    { key: 'education', step: 'education', icon: 'education', title: 'Education and career' },
    { key: 'personal', step: 'personal', icon: 'height', title: 'Personal details' },
    { key: 'family', step: 'family', icon: 'family', title: 'Family values' },
    { key: 'intentions', step: 'intentions', icon: 'intentions', title: 'Marital intentions' },
    { key: 'lifestyle', step: 'lifestyle', icon: 'lifestyle', title: 'Lifestyle' },
    { key: 'interests', step: 'interests', icon: 'personality', title: 'Personality and interests' }
  ];

  function editSummary(stepKey) {
    var p = S.profile;
    switch (stepKey) {
      case 'photos': return p.photos.length + ' photo' + (p.photos.length === 1 ? '' : 's');
      case 'about': return (p.bio || '').slice(0, 46) + '…';
      case 'basic': return p.firstName + ' · ' + p.age + ' · ' + p.location;
      case 'faith': return p.sect + ' · ' + p.prayer;
      case 'background': return p.nationality + ' · ' + UI.list(p.languages, 2);
      case 'education': return p.education + ' · ' + p.profession;
      case 'personal': return p.maritalStatus + ' · ' + UI.height(p.height);
      case 'family': return p.familyInvolvement + ' · ' + p.livingArrangements;
      case 'intentions': return p.timeline + ' · ' + p.relocate;
      case 'lifestyle': return p.diet + ' · ' + p.activity;
      case 'interests': return UI.list(p.interests, 3);
    }
    return '';
  }

  screen('i02', {
    render: function () {
      return topbar({ back: true, title: 'Edit profile', bordered: true }) +
        '<div class="scr__body"><div class="edit-list">' +
          EDIT_ROWS.map(function (r) {
            var target = r.screen ? ('data-go="' + r.screen + '"') : ('data-go="editStep" data-param="' + r.step + '"');
            return '<button class="edit-row" ' + target + '>' +
              '<span class="edit-row__ico">' + I(r.icon) + '</span>' +
              '<span class="edit-row__main"><span class="edit-row__t">' + E(r.title) + '</span>' +
              '<span class="edit-row__d">' + E(editSummary(r.step)) + '</span></span>' +
              '<span class="edit-row__chev">' + I('chevron-right') + '</span></button>';
          }).join('') +
          '<div style="padding-top:20px">' +
          '<button class="mbtn mbtn--outline" data-go="b13">' + I('eye') + 'Preview my profile</button></div>' +
        '</div></div>';
    }
  });

  screen('i03', {
    render: function () {
      return topbar({ back: true, title: 'Edit photos', bordered: true }) +
        '<div class="scr__body scr__body--pad">' +
          '<p class="h-sub" style="margin-top:0">Your first photo is your main photo. Use the arrows to reorder.</p>' +
          '<div style="margin-top:20px">' + fieldHTML({ key: 'photos', type: 'photos', label: 'Photos' }, S.profile) + '</div>' +
        '</div>' +
        '<div class="scr__foot scr__foot--solid"><button class="mbtn mbtn--primary" data-back>Done</button></div>';
    },
    mount: function (el) {
      wireFields(el, S.profile, [{ key: 'photos', type: 'photos', label: 'Photos' }], null);
    }
  });

  screen('editStep', {
    render: function (p) {
      var step = DATA.BUILDER_STEPS.filter(function (s) { return s.key === p.key; })[0];
      return topbar({ back: true, backIcon: 'close', title: step.title, bordered: true }) +
        '<div class="scr__body scr__body--pad">' +
          '<p class="h-sub" style="margin-top:0">' + E(step.subtitle) + '</p>' +
          '<div style="margin-top:24px">' +
            step.fields.map(function (f) { return fieldHTML(f, S.profile); }).join('') +
          '</div>' +
        '</div>' +
        '<div class="scr__foot scr__foot--solid"><button class="mbtn mbtn--primary" data-save>Save changes</button></div>';
    },
    mount: function (el, p) {
      var step = DATA.BUILDER_STEPS.filter(function (s) { return s.key === p.key; })[0];
      wireFields(el, S.profile, step.fields, null);
      UI.on(el, 'click', '[data-save]', function () {
        back();
        setTimeout(function () { UI.toast(root, 'Profile updated', 'check'); }, 320);
      });
    }
  });

  /* ======================================================================
     Match preferences / filters
     ====================================================================== */

  function filterValueText(f) {
    var v = S.filters[f.key];
    if (f.type === 'range') {
      if (f.key === 'height') return v[0] + '–' + v[1] + ' cm';
      return v[0] + ' – ' + v[1];
    }
    return v && v.length ? UI.list(v, 2) : 'Any';
  }

  screen('filters', {
    render: function () {
      var n = filterCount();
      return topbar({ back: true, backIcon: 'close', title: 'Match preferences', bordered: true }) +
        '<div class="scr__body">' +
          '<div style="padding:16px 20px 0"><div class="time-note" style="margin-top:0">' + I('filter') +
            'Recommendations are ranked by how closely people match these preferences</div></div>' +
          DATA.FILTER_GROUPS.map(function (g) {
            return '<div class="filters__group">' +
              '<div class="filters__gtitle">' + I(g.icon) + '<h3>' + E(g.title) + '</h3></div>' +
              g.filters.map(function (f) {
                var v = S.filters[f.key];
                var count = (f.type !== 'range' && v && v.length) ? v.length : 0;
                return '<button class="frow" data-filter="' + f.key + '" data-group="' + g.key + '">' +
                  '<span class="frow__main"><span class="frow__label">' + E(f.label) + '</span>' +
                  '<span class="frow__value' + (count || f.type === 'range' ? ' is-set' : '') + '">' + E(filterValueText(f)) + '</span></span>' +
                  (count ? '<span class="frow__count">' + count + '</span>' : '') +
                  '<span class="frow__chev">' + I('chevron-right') + '</span></button>';
              }).join('') +
              '</div>';
          }).join('') +
        '</div>' +
        '<div class="filters__foot">' +
          '<button class="mbtn mbtn--outline" data-clear>Clear all</button>' +
          '<button class="mbtn mbtn--primary" data-apply>Apply' + (n ? ' · ' + n : '') + '</button>' +
        '</div>';
    },
    mount: function (el) {
      UI.on(el, 'click', '[data-filter]', function (e, t) {
        var group = DATA.FILTER_GROUPS.filter(function (g) { return g.key === t.dataset.group; })[0];
        var f = group.filters.filter(function (x) { return x.key === t.dataset.filter; })[0];
        if (f.type === 'range') openRangeSheet(f);
        else openSelectSheet({
          key: f.key, label: f.label, options: f.options, type: 'multiselect'
        }, S.filters, function () { go('filters', {}, { mode: 'replace' }); });
      });

      UI.on(el, 'click', '[data-clear]', function () {
        S.filters = {
          age: [18, 60], height: [140, 210], location: [], nationality: [], ethnicity: [],
          language: [], sect: [], religious: [], familyValues: [], education: [],
          profession: [], maritalStatus: []
        };
        go('filters', {}, { mode: 'replace' });
        UI.toast(root, 'Filters cleared', 'refresh');
      });

      UI.on(el, 'click', '[data-apply]', function () {
        var n = filterCount();
        go('applying', { count: n }, { mode: 'replace' });
      });
    }
  });

  function openRangeSheet(f) {
    var v = S.filters[f.key];
    var tmp = {}; tmp[f.key] = v.slice();
    var sh = UI.sheet(root, {
      title: f.label,
      body: '<div style="padding:8px 0 16px">' +
        rangeHTML(f.key, f.min, f.max, v[0], v[1], f.key === 'height' ? 'height' : '') + '</div>',
      footer: '<button class="mbtn mbtn--primary" data-done>Done</button>'
    });
    wireSliders(sh.el, tmp, null);
    UI.on(sh.el, 'click', '[data-done]', function () {
      S.filters[f.key] = tmp[f.key];
      sh.close();
      go('filters', {}, { mode: 'replace' });
    });
  }

  screen('applying', {
    render: function () {
      return '<div class="loading-full">' +
        '<svg class="spinner" viewBox="0 0 34 34"><circle cx="17" cy="17" r="14"/><path d="M17 3a14 14 0 0 1 14 14"/></svg>' +
        '<p>Ranking your recommendations…</p></div>';
    },
    mount: function (el, p) {
      setTimeout(function () {
        S.queue = DATA.DISCOVERY_ORDER.filter(function (id) { return !S.acted[id]; });
        go('d01', {}, { mode: 'root' });
        setTimeout(function () {
          UI.toast(root, 'Filters applied · ' + activeQueue().length + ' recommendations', 'check');
        }, 260);
      }, 1200);
    }
  });

  /* ======================================================================
     Supporting states (reachable from the presenter's States menu)
     ====================================================================== */

  screen('state-loading', {
    tab: 'discover', cls: 'scr--soft',
    render: function () {
      return topbar({ brand: true, right: '<button class="icon-btn">' + I('filter') + '</button>' }) +
        '<div class="disc">' +
          '<div class="disc__meta"><span class="skeleton sk-line" style="width:160px;margin:0"></span></div>' +
          '<div class="disc__deck"><div class="skeleton sk-card"></div></div>' +
          '<div class="disc__actions">' +
            '<span class="skeleton" style="width:62px;height:62px;border-radius:50%"></span>' +
            '<span class="skeleton" style="width:70px;height:70px;border-radius:50%"></span>' +
          '</div></div>';
    }
  });

  screen('state-empty-matches', {
    tab: 'matches',
    render: function () {
      return topbar({ title: 'Matches', bordered: true }) +
        '<div class="empty">' +
          '<div class="empty__ico">' + I('match') + '</div>' +
          '<h2 class="empty__title">No matches yet</h2>' +
          '<p class="empty__text">When you and someone else both say yes, they will appear here and a conversation opens up.</p>' +
          '<div class="empty__cta"><button class="mbtn mbtn--primary" data-go="d01" data-mode="root">Start discovering</button></div>' +
        '</div>';
    }
  });

  screen('state-empty-chats', {
    tab: 'chats',
    render: function () {
      return topbar({ title: 'Chats', bordered: true }) +
        '<div class="empty">' +
          '<div class="empty__ico">' + I('chat') + '</div>' +
          '<h2 class="empty__title">No conversations yet</h2>' +
          '<p class="empty__text">Chat opens as soon as you and someone else have both shown interest. Nothing before that.</p>' +
          '<div class="empty__cta"><button class="mbtn mbtn--primary" data-go="d01" data-mode="root">Start discovering</button></div>' +
        '</div>';
    }
  });

  screen('state-caught-up', {
    tab: 'discover', cls: 'scr--soft',
    render: function () {
      return topbar({ brand: true, right: '<button class="icon-btn" data-go="filters" data-mode="modal">' + I('filter') + '</button>' }) +
        '<div class="empty">' +
          '<div class="empty__ico empty__ico--warm">' + I('sparkle') + '</div>' +
          '<h2 class="empty__title">You are all caught up</h2>' +
          '<p class="empty__text">That is everyone we have for you today. New recommendations arrive each morning — or widen your filters to see more people now.</p>' +
          '<div class="empty__cta"><button class="mbtn mbtn--primary" data-go="filters" data-mode="modal">Adjust filters</button></div>' +
        '</div>';
    }
  });

  screen('state-error', {
    tab: 'discover', cls: 'scr--soft',
    render: function () {
      return topbar({ brand: true }) +
        '<div class="empty">' +
          '<div class="empty__ico empty__ico--muted">' + I('offline') + '</div>' +
          '<h2 class="empty__title">No connection</h2>' +
          '<p class="empty__text">We could not reach Qiran just now. Check your connection and try again.</p>' +
          '<div class="empty__cta"><button class="mbtn mbtn--primary" data-retry>' + I('refresh') + 'Try again</button></div>' +
        '</div>';
    },
    mount: function (el) {
      UI.on(el, 'click', '[data-retry]', function (e, t) {
        t.innerHTML = '<svg class="spinner" viewBox="0 0 34 34" style="width:20px;height:20px"><circle cx="17" cy="17" r="14"/><path d="M17 3a14 14 0 0 1 14 14"/></svg>Retrying';
        setTimeout(function () { go('d01', {}, { mode: 'root' }); }, 1300);
      });
    }
  });

  /* ======================================================================
     Mount & global wiring
     ====================================================================== */

  function mount(container) {
    S = freshState();
    container.innerHTML =
      '<div class="stage-mobile">' +
        '<div class="phone"><div class="phone__screen">' +
          '<div class="app-notch"></div>' +
          '<div class="app-status">' + statusBar() + '</div>' +
          '<div class="app-stack"></div>' +
          '<nav class="tabbar" hidden>' + TABS.map(function (t) {
            return '<button class="tab" data-tab="' + t.key + '" data-tab-go="' + t.screen + '">' +
              I(t.icon) + '<span>' + t.label + '</span></button>';
          }).join('') + '</nav>' +
        '</div></div>' +
        '<div class="stage-mobile__hint">' + I('mobile') +
          'Simulated iOS / Android application · the production app is built in Flutter</div>' +
      '</div>';

    root = UI.qs('.phone__screen', container);
    stack = UI.qs('.app-stack', root);
    statusEl = UI.qs('.app-status', root);
    tabsEl = UI.qs('.tabbar', root);

    UI.on(root, 'click', '[data-back]', function (e) { e.preventDefault(); back(); });
    UI.on(root, 'click', '[data-go]', function (e, t) {
      e.preventDefault();
      var id = t.dataset.go;
      var param = t.dataset.param;
      var params = {};
      if (param !== undefined && param !== '') {
        if (id === 'builder') params.i = +param;
        else if (id === 'editStep') params.key = param;
        else if (id === 'a03' || id === 'a04') params.mode = param;
        else params.id = param;
      }
      go(id, params, { mode: t.dataset.mode || 'push' });
    });
    UI.on(root, 'click', '[data-tab-go]', function (e, t) {
      go(t.dataset.tabGo, {}, { mode: 'root' });
    });

    go('a01', {}, { mode: 'root' });
  }

  function restart() {
    if (!root) return;
    UI.qsa('.sheet-layer, .modal-layer, .toast', root).forEach(function (n) { n.remove(); });
    S = freshState();
    go('a01', {}, { mode: 'root' });
  }

  function jump(id, params) {
    if (!root) return;
    UI.qsa('.sheet-layer, .modal-layer, .toast', root).forEach(function (n) { n.remove(); });
    go(id, params || {}, { mode: 'root' });
  }

  /* Renders any screen as a static, non-interactive screenshot for the
     marketing website — guaranteeing the site shows the real product UI. */
  function screenshot(id, params) {
    if (!S) S = freshState();
    /* Render against a snapshot so a screenshot can never mutate live state. */
    var snapshot = clone(S);
    var def = SCREENS[id];
    if (!def) return '';
    var sandbox = document.createElement('div');
    sandbox.className = 'phone__screen';
    var st = document.createElement('div');
    st.className = 'app-status' + (def.status === 'light' ? ' app-status--light' : '');
    st.innerHTML = statusBar();
    var body = document.createElement('div');
    body.className = 'app-stack';
    var sc = document.createElement('section');
    sc.className = 'scr' + (def.cls ? ' ' + def.cls : '');
    sc.innerHTML = def.render(params || {});
    body.appendChild(sc);
    sandbox.appendChild(st);
    sandbox.appendChild(body);
    if (def.tab) {
      var nav = document.createElement('nav');
      nav.className = 'tabbar';
      nav.innerHTML = TABS.map(function (t) {
        return '<button class="tab' + (t.key === def.tab ? ' is-active' : '') + '">' +
          I(t.icon) + '<span>' + t.label + '</span></button>';
      }).join('');
      sandbox.appendChild(nav);
    }
    S = snapshot;
    return sandbox.outerHTML;
  }

  global.MOBILE = {
    mount: mount, restart: restart, jump: jump, screenshot: screenshot,
    STATES: [
      { id: 'state-loading', title: 'Skeleton loading', desc: 'Discovery while recommendations load' },
      { id: 'state-caught-up', title: 'Daily queue complete', desc: 'No more recommendations today' },
      { id: 'state-empty-matches', title: 'No matches', desc: 'Empty matches state' },
      { id: 'state-empty-chats', title: 'No conversations', desc: 'Empty chat inbox' },
      { id: 'state-error', title: 'Network error', desc: 'Offline state with retry' }
    ]
  };
})(window);
