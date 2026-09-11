/* ==========================================================================
   QIRAN — Shared UI utilities
   ========================================================================== */
(function (global) {
  'use strict';

  /* ---- DOM ------------------------------------------------------------ */

  function h(html) {
    var t = document.createElement('template');
    t.innerHTML = String(html).trim();
    return t.content.firstElementChild;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* Event delegation bound to a root element. */
  function on(root, evt, sel, fn) {
    root.addEventListener(evt, function (e) {
      var t = e.target.closest(sel);
      if (t && root.contains(t)) fn.call(t, e, t);
    });
  }

  function raf(fn) { requestAnimationFrame(function () { requestAnimationFrame(fn); }); }

  /* ---- Photography ----------------------------------------------------
     A single photo layer. Every image in the prototype resolves through
     `photo()`, so licensed client photography can replace this in one place.
     ------------------------------------------------------------------- */

  var PHOTO_BASE = 'https://images.unsplash.com/';

  function photo(id, w, hgt, mode) {
    if (!id) return '';
    /* 'face' tightly frames the face — used for avatars, where a full-length
       photo would otherwise become an unreadable speck. */
    if (mode === 'face') {
      return PHOTO_BASE + id + '?auto=format&fit=facearea&facepad=3' +
        '&w=' + (w || 300) + (hgt ? '&h=' + hgt : '') + '&q=75&fm=jpg';
    }
    var crop = mode === 'scene' ? 'entropy' : 'faces,center';
    return PHOTO_BASE + id + '?auto=format&fit=crop&crop=' + crop +
      '&w=' + (w || 800) + (hgt ? '&h=' + hgt : '') + '&q=72&fm=jpg';
  }

  /* <img> that fades in and degrades gracefully to a soft brand panel. */
  function img(id, w, hgt, alt, mode, cls) {
    if (!id) {
      return '<div class="ph ph--fallback ' + (cls || '') + '" role="img" aria-label="' + esc(alt || '') + '"></div>';
    }
    return '<img class="ph-img ' + (cls || '') + '" loading="lazy" decoding="async" src="' +
      photo(id, w, hgt, mode) + '" alt="' + esc(alt || '') + '" ' +
      'onload="this.classList.add(\'is-loaded\')" ' +
      'onerror="this.classList.add(\'is-error\')">';
  }

  function avatar(id, size, alt, cls) {
    return '<span class="avatar ' + (cls || '') + '" style="width:' + size + 'px;height:' + size + 'px">' +
      img(id, size * 2, size * 2, alt, 'face') + '</span>';
  }

  /* ---- Formatting ------------------------------------------------------ */

  function cm2ft(cm) {
    var inches = Math.round(cm / 2.54);
    return Math.floor(inches / 12) + "'" + (inches % 12) + '"';
  }

  function height(cm) { return cm + ' cm · ' + cm2ft(cm); }

  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : (many || one + 's')); }

  function list(arr, max) {
    if (!arr || !arr.length) return '—';
    if (max && arr.length > max) return arr.slice(0, max).join(', ') + ' +' + (arr.length - max);
    return arr.join(', ');
  }

  /* ---- Chips ----------------------------------------------------------- */

  function chip(label, opts) {
    opts = opts || {};
    var ico = opts.icon ? ICO.icon(opts.icon, 'icon-16') : '';
    return '<span class="chip ' + (opts.cls || '') + '">' + ico + '<span>' + esc(label) + '</span></span>';
  }

  function chips(arr, opts) {
    if (!arr || !arr.length) return '';
    return '<div class="chip-row">' + arr.map(function (a) { return chip(a, opts); }).join('') + '</div>';
  }

  /* ---- Overlays: sheets, modals, toasts -------------------------------
     `host` is the element the overlay is trapped inside — the phone
     viewport for mobile, the page for website/admin. This keeps simulated
     product overlays from escaping the device frame.
     ------------------------------------------------------------------- */

  function sheet(host, opts) {
    opts = opts || {};
    var el = h(
      '<div class="sheet-layer">' +
        '<div class="sheet-scrim"></div>' +
        '<div class="sheet" role="dialog" aria-modal="true">' +
          '<div class="sheet__grab"></div>' +
          (opts.title ? '<header class="sheet__head">' +
            '<h3 class="sheet__title">' + esc(opts.title) + '</h3>' +
            '<button class="icon-btn sheet__close" aria-label="Close">' + ICO.icon('close') + '</button>' +
            '</header>' : '') +
          '<div class="sheet__body">' + (opts.body || '') + '</div>' +
          (opts.footer ? '<footer class="sheet__foot">' + opts.footer + '</footer>' : '') +
        '</div>' +
      '</div>');

    host.appendChild(el);
    raf(function () { el.classList.add('is-open'); });

    function close() {
      el.classList.remove('is-open');
      setTimeout(function () { el.remove(); }, 240);
      if (opts.onClose) opts.onClose();
    }
    el.querySelector('.sheet-scrim').addEventListener('click', close);
    var x = el.querySelector('.sheet__close');
    if (x) x.addEventListener('click', close);

    return { el: el, close: close, body: el.querySelector('.sheet__body') };
  }

  function modal(host, opts) {
    opts = opts || {};
    var buttons = (opts.actions || []).map(function (a, i) {
      return '<button class="btn ' + (a.variant || 'btn--ghost') + '" data-act="' + i + '">' + esc(a.label) + '</button>';
    }).join('');

    /* On the page itself (admin/website) overlays must be fixed, not absolute,
       or they anchor to the whole document instead of the viewport. */
    var fixed = host === document.body ? ' is-fixed' : '';
    var el = h(
      '<div class="modal-layer' + fixed + '">' +
        '<div class="modal-scrim"></div>' +
        '<div class="modal" role="dialog" aria-modal="true">' +
          (opts.tone ? '<div class="modal__icon modal__icon--' + opts.tone + '">' + ICO.icon(opts.icon || 'alert') + '</div>' : '') +
          '<h3 class="modal__title">' + esc(opts.title || '') + '</h3>' +
          (opts.text ? '<p class="modal__text">' + esc(opts.text) + '</p>' : '') +
          (opts.body || '') +
          '<div class="modal__actions">' + buttons + '</div>' +
        '</div>' +
      '</div>');

    host.appendChild(el);
    raf(function () { el.classList.add('is-open'); });

    function close() {
      el.classList.remove('is-open');
      setTimeout(function () { el.remove(); }, 200);
    }
    el.querySelector('.modal-scrim').addEventListener('click', function () {
      if (!opts.mandatory) close();
    });
    on(el, 'click', '[data-act]', function (e, t) {
      var a = opts.actions[+t.dataset.act];
      close();
      if (a && a.onClick) a.onClick();
    });
    return { el: el, close: close };
  }

  function toast(host, message, iconName) {
    var el = h('<div class="toast' + (host === document.body ? ' is-fixed' : '') + '">' +
      (iconName ? ICO.icon(iconName, 'icon-18') : '') +
      '<span>' + esc(message) + '</span></div>');
    host.appendChild(el);
    raf(function () { el.classList.add('is-on'); });
    setTimeout(function () {
      el.classList.remove('is-on');
      setTimeout(function () { el.remove(); }, 260);
    }, 2000);
  }

  /* ---- Misc ------------------------------------------------------------ */

  function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }

  function debounce(fn, ms) {
    var t;
    return function () {
      var a = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, a); }, ms || 180);
    };
  }

  function initials(name) {
    return String(name).split(/\s+/).map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase();
  }

  global.UI = {
    h: h, esc: esc, qs: qs, qsa: qsa, on: on, raf: raf,
    photo: photo, img: img, avatar: avatar,
    cm2ft: cm2ft, height: height, plural: plural, list: list,
    chip: chip, chips: chips,
    sheet: sheet, modal: modal, toast: toast,
    clamp: clamp, debounce: debounce, initials: initials
  };
})(window);
