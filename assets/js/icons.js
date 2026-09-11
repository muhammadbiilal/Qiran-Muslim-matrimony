/* ==========================================================================
   QIRAN — Icon system
   One consistent 24x24 outline family, stroke-based, drawn for this product.
   Filled variants exist only where a selected state needs them.
   ========================================================================== */
(function (global) {
  'use strict';

  var P = {
    /* --- Navigation & system ------------------------------------------- */
    'chevron-left':  '<path d="M15 18 9 12l6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'chevron-down':  '<path d="m6 9.5 6 6 6-6"/>',
    'chevron-up':    '<path d="m6 14.5 6-6 6 6"/>',
    'arrow-left':    '<path d="M19.5 12H4.5"/><path d="m11 18.5-6.5-6.5L11 5.5"/>',
    'arrow-right':   '<path d="M4.5 12h15"/><path d="m13 5.5 6.5 6.5L13 18.5"/>',
    'arrow-up-right':'<path d="M7 17 17 7"/><path d="M8.5 7H17v8.5"/>',
    'close':         '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'menu':          '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
    'more':          '<circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
    'more-vertical': '<circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/>',
    'check':         '<path d="M20 6.5 9.2 17.3 4 12.1"/>',
    'check-circle':  '<circle cx="12" cy="12" r="9"/><path d="m8.2 12.2 2.6 2.6 5-5"/>',
    'read':          '<path d="M17.5 6.5 8.3 15.7l-3.8-3.8"/><path d="m22 8.5-7.6 7.6-1.2-1.2"/>',
    'plus':          '<path d="M12 5v14"/><path d="M5 12h14"/>',
    'minus':         '<path d="M5 12h14"/>',
    'search':        '<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4.2-4.2"/>',
    'refresh':       '<path d="M20.5 12a8.5 8.5 0 1 1-2.5-6"/><path d="M20.5 4v5h-5"/>',
    'logout':        '<path d="M9.5 20.5h-4a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h4"/><path d="m15.5 16.5 4.5-4.5-4.5-4.5"/><path d="M20 12H9"/>',
    'grip':          '<circle cx="9" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="18" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="18" r="1.4" fill="currentColor" stroke="none"/>',
    'filter':        '<path d="M4 7h10"/><path d="M18.2 7H20"/><path d="M4 17h4.2"/><path d="M12.4 17H20"/><circle cx="16" cy="7" r="2.2"/><circle cx="10.3" cy="17" r="2.2"/>',

    /* --- Profile attributes -------------------------------------------- */
    'location':      '<path d="M20 10.3c0 5.7-8 11.7-8 11.7s-8-6-8-11.7a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    'education':     '<path d="M21.5 8.6 12 4 2.5 8.6 12 13.2l9.5-4.6Z"/><path d="M6.3 10.7V16c0 1.5 2.6 2.9 5.7 2.9s5.7-1.4 5.7-2.9v-5.3"/><path d="M21.5 8.6v5.7"/>',
    'profession':    '<rect x="2.5" y="7.2" width="19" height="12.3" rx="2.5"/><path d="M8.8 7.2V5.8a2 2 0 0 1 2-2h2.4a2 2 0 0 1 2 2v1.4"/><path d="M2.5 12.4h19"/>',
    'faith':         '<path d="M20.4 15.6A8.6 8.6 0 1 1 9.6 3.8a6.9 6.9 0 0 0 10.8 11.8Z"/><path d="m18.6 3.2.75 1.65 1.65.75-1.65.75-.75 1.65-.75-1.65-1.65-.75 1.65-.75.75-1.65Z"/>',
    'language':      '<circle cx="12" cy="12" r="9"/><path d="M3.3 9.2h17.4"/><path d="M3.3 14.8h17.4"/><path d="M12 3a14.5 14.5 0 0 1 0 18"/><path d="M12 3a14.5 14.5 0 0 0 0 18"/>',
    'height':        '<path d="M12 3.4v17.2"/><path d="m8.2 7 3.8-3.6L15.8 7"/><path d="m8.2 17 3.8 3.6L15.8 17"/><path d="M4.5 3.4v17.2"/><path d="M19.5 3.4v17.2"/>',
    'family':        '<path d="M15.8 19.5v-1.4a3.6 3.6 0 0 0-3.6-3.6H7.6A3.6 3.6 0 0 0 4 18.1v1.4"/><circle cx="9.9" cy="7.6" r="3.6"/><path d="M20 19.5v-1.4a3.6 3.6 0 0 0-2.7-3.5"/><path d="M15.4 4.2a3.6 3.6 0 0 1 0 6.9"/>',
    'intentions':    '<circle cx="8.8" cy="14.5" r="5.4"/><circle cx="15.2" cy="14.5" r="5.4"/><path d="m8.8 4.2 1.9 2.6-1.9 2.4-1.9-2.4 1.9-2.6Z"/>',
    'lifestyle':     '<path d="M4 20.2c-.4-8.2 4.8-13.4 16-13.4.5 9.3-4.6 13.4-11 13.4H4Z"/><path d="M4.5 20.2c2.6-5 5.8-7.8 9.8-9.5"/>',
    'personality':   '<circle cx="12" cy="12" r="9"/><path d="M8.4 14.2a4.5 4.5 0 0 0 7.2 0"/><path d="M9.2 9.4h.01"/><path d="M14.8 9.4h.01"/>',
    'about':         '<path d="M12 7.4v12.2"/><path d="M12 7.4C10.4 5.9 8.3 5.4 3.8 5.4v12.2c4.5 0 6.6.5 8.2 2 1.6-1.5 3.7-2 8.2-2V5.4c-4.5 0-6.6.5-8.2 2Z"/>',
    'calendar':      '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17"/><path d="M8 3v4"/><path d="M16 3v4"/>',

    /* --- Matchmaking ---------------------------------------------------- */
    'heart':         '<path d="M19 13.9c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.4c0 2.3 1.5 4 3 5.5l7 7 7-7Z"/>',
    'heart-filled':  '<path d="M19 13.9c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.4c0 2.3 1.5 4 3 5.5l7 7 7-7Z" fill="currentColor"/>',
    'pass':          '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'match':         '<path d="M19 13.9c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.4c0 2.3 1.5 4 3 5.5l7 7 7-7Z"/><path d="m9 11.4 2.2 2.2 4-4"/>',
    'discover':      '<circle cx="12" cy="12" r="9"/><path d="m15.2 8.8-2 4.4-4.4 2 2-4.4 4.4-2Z"/>',
    'chat':          '<path d="M20.7 11.7a8.3 8.3 0 0 1-12 7.5l-5.2 1.5 1.5-5.1A8.3 8.3 0 1 1 20.7 11.7Z"/>',
    'profile':       '<circle cx="12" cy="8.2" r="4.2"/><path d="M4.3 20.3a7.7 7.7 0 0 1 15.4 0"/>',
    'quote':         '<path d="M9.5 5.5H5.8A1.8 1.8 0 0 0 4 7.3v2.4a1.8 1.8 0 0 0 1.8 1.8h3.7V9.3c0 4.8-1.4 7.4-4 8.6"/><path d="M20 5.5h-3.7a1.8 1.8 0 0 0-1.8 1.8v2.4a1.8 1.8 0 0 0 1.8 1.8H20V9.3c0 4.8-1.4 7.4-4 8.6"/>',
    'sparkle':       '<path d="m12 3.2 1.9 5 5 1.9-5 1.9-1.9 5-1.9-5-5-1.9 5-1.9 1.9-5Z"/><path d="m18.6 15.4.85 2.15 2.15.85-2.15.85-.85 2.15-.85-2.15-2.15-.85 2.15-.85.85-2.15Z"/>',

    /* --- Media & editing ------------------------------------------------ */
    'photo':         '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><circle cx="8.6" cy="10" r="1.6"/><path d="m3.6 17.4 4.8-4.3a2 2 0 0 1 2.7 0l3.4 3"/><path d="m13.6 15 1.8-1.6a2 2 0 0 1 2.7 0l2.3 2"/>',
    'camera':        '<path d="M4.2 8.4h2.5l1.3-2.2a1.6 1.6 0 0 1 1.4-.8h5.2a1.6 1.6 0 0 1 1.4.8l1.3 2.2h2.5a2 2 0 0 1 2 2v7.4a2 2 0 0 1-2 2H4.2a2 2 0 0 1-2-2v-7.4a2 2 0 0 1 2-2Z"/><circle cx="12" cy="13.8" r="3.4"/>',
    'edit':          '<path d="M4 20h4.2L19.6 8.6a2.2 2.2 0 0 0-3.1-3.1L5 16.9V20Z"/><path d="m15 6.2 3 3"/>',
    'trash':         '<path d="M4.5 7h15"/><path d="M9.5 7V5.6A1.6 1.6 0 0 1 11.1 4h1.8a1.6 1.6 0 0 1 1.6 1.6V7"/><path d="m6.6 7 .8 12.1a1.6 1.6 0 0 0 1.6 1.5h6a1.6 1.6 0 0 0 1.6-1.5L17.4 7"/>',
    'send':          '<path d="M21 3 10.3 13.7"/><path d="M21 3 14.4 21l-4.1-7.3L3 9.6 21 3Z"/>',
    'eye':           '<path d="M2.5 12S6 5.6 12 5.6 21.5 12 21.5 12 18 18.4 12 18.4 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3.2"/>',

    /* --- Trust & status -------------------------------------------------- */
    'shield':        '<path d="M12 3.2 5 6.1v5.5c0 4.3 2.9 8 7 9.4 4.1-1.4 7-5.1 7-9.4V6.1l-7-2.9Z"/>',
    'shield-check':  '<path d="M12 3.2 5 6.1v5.5c0 4.3 2.9 8 7 9.4 4.1-1.4 7-5.1 7-9.4V6.1l-7-2.9Z"/><path d="m9.2 12 2 2 3.6-3.6"/>',
    'lock':          '<rect x="4.5" y="10.2" width="15" height="10" rx="2.5"/><path d="M8 10.2V7.8a4 4 0 0 1 8 0v2.4"/>',
    'mail':          '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="m3.6 7.2 7.3 5.2a2 2 0 0 0 2.2 0l7.3-5.2"/>',
    'phone':         '<path d="M6.4 3.2h2.9l1.5 3.9-2 1.5a12.2 12.2 0 0 0 5.6 5.6l1.5-2 3.9 1.5v2.9a2 2 0 0 1-2.2 2A16.7 16.7 0 0 1 4.4 5.4a2 2 0 0 1 2-2.2Z"/>',
    'flag':          '<path d="M5 21.2V4.2"/><path d="M5 5.4h9.9a.8.8 0 0 1 .72 1.16L14.5 8.9a.8.8 0 0 0 0 .72l1.12 2.34a.8.8 0 0 1-.72 1.16H5"/>',
    'alert':         '<circle cx="12" cy="12" r="9"/><path d="M12 7.4v5.4"/><path d="M12 16.4h.01"/>',
    'info':          '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.6"/><path d="M12 7.6h.01"/>',
    'ban':           '<circle cx="12" cy="12" r="9"/><path d="m5.7 5.7 12.6 12.6"/>',
    'offline':       '<path d="m2.5 2.5 19 19"/><path d="M8.7 15.8a4.7 4.7 0 0 1 6.2-.3"/><path d="M5.3 12.3a9.4 9.4 0 0 1 2.6-1.7"/><path d="M18.8 12.4a9.4 9.4 0 0 0-4.6-2.4"/><path d="M2.2 8.9a14.3 14.3 0 0 1 3.9-2.5"/><path d="M21.8 8.9a14.3 14.3 0 0 0-7.3-3.5"/><path d="M12 19.2h.01"/>',
    'clock':         '<circle cx="12" cy="12" r="9"/><path d="M12 6.8v5.5l3.4 2"/>',
    'star':          '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9L12 3.5Z"/>',

    /* --- Admin ----------------------------------------------------------- */
    'dashboard':     '<rect x="3.5" y="3.5" width="7.2" height="7.2" rx="1.8"/><rect x="13.3" y="3.5" width="7.2" height="4.6" rx="1.8"/><rect x="13.3" y="10.7" width="7.2" height="9.8" rx="1.8"/><rect x="3.5" y="13.3" width="7.2" height="7.2" rx="1.8"/>',
    'users':         '<path d="M15.8 19.5v-1.4a3.6 3.6 0 0 0-3.6-3.6H7.6A3.6 3.6 0 0 0 4 18.1v1.4"/><circle cx="9.9" cy="7.6" r="3.6"/><path d="M20 19.5v-1.4a3.6 3.6 0 0 0-2.7-3.5"/><path d="M15.4 4.2a3.6 3.6 0 0 1 0 6.9"/>',
    'table':         '<rect x="3.5" y="4.5" width="17" height="15" rx="2.2"/><path d="M3.5 9.6h17"/><path d="M3.5 14.6h17"/><path d="M9.6 9.6v9.9"/>',
    'list':          '<path d="M8.5 6.5h11.5"/><path d="M8.5 12h11.5"/><path d="M8.5 17.5h11.5"/><path d="M4.2 6.5h.01"/><path d="M4.2 12h.01"/><path d="M4.2 17.5h.01"/>',
    'home':          '<path d="m3.4 10.6 8.6-7.1 8.6 7.1"/><path d="M5.5 9.2v9.6a1.7 1.7 0 0 0 1.7 1.7h9.6a1.7 1.7 0 0 0 1.7-1.7V9.2"/><path d="M9.8 20.5V14h4.4v6.5"/>',
    'globe':         '<circle cx="12" cy="12" r="9"/><path d="M3.3 9.2h17.4"/><path d="M3.3 14.8h17.4"/><path d="M12 3a14.5 14.5 0 0 1 0 18"/><path d="M12 3a14.5 14.5 0 0 0 0 18"/>',
    'mobile':        '<rect x="6.5" y="2.5" width="11" height="19" rx="2.6"/><path d="M10.6 5.4h2.8"/><path d="M10.8 18.6h2.4"/>',
    'desktop':       '<rect x="2.8" y="4" width="18.4" height="12.4" rx="2.2"/><path d="M8.6 20h6.8"/><path d="M12 16.4V20"/>'
  };

  var FILLED = { 'heart-filled': true };

  function icon(name, cls) {
    var body = P[name];
    if (!body) { body = P['info']; }
    var stroke = FILLED[name] ? 'none' : 'currentColor';
    return '<svg class="icon ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="' + stroke +
      '" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      body + '</svg>';
  }

  /* Original Qiran brand mark: two halves of a single heart, joined.
     The seam between them is the idea — two people, one shape. */
  var markSeq = 0;

  function logoMark(size, variant) {
    var s = size || 32;
    var left = variant === 'light' ? '#F4E2C4' : 'var(--brand-700)';
    var right = variant === 'light' ? '#FFFFFF' : 'var(--gold-500)';
    var uid = 'qm' + (++markSeq);
    var HEART = 'M19 13.9c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 2.9c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.4c0 2.3 1.5 4 3 5.5l7 7 7-7Z';
    return '<svg class="wordmark__mark" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<defs>' +
        '<clipPath id="' + uid + 'a"><rect x="0" y="0" width="11.6" height="24"/></clipPath>' +
        '<clipPath id="' + uid + 'b"><rect x="12.4" y="0" width="11.6" height="24"/></clipPath>' +
      '</defs>' +
      '<path d="' + HEART + '" fill="' + left + '" clip-path="url(#' + uid + 'a)"/>' +
      '<path d="' + HEART + '" fill="' + right + '" clip-path="url(#' + uid + 'b)"/>' +
      '</svg>';
  }

  function wordmark(opts) {
    opts = opts || {};
    var variant = opts.variant || 'dark';
    return '<span class="wordmark ' + (variant === 'light' ? 'wordmark--light' : '') + '">' +
      logoMark(opts.size || 30, variant) +
      '<span class="wordmark__text" style="font-size:' + (opts.text || 20) + 'px">Qiran</span>' +
      '</span>';
  }

  global.ICO = { icon: icon, logoMark: logoMark, wordmark: wordmark, paths: P };
})(window);
