/* ==========================================================================
   QIRAN — Marketing website
   Public and informational. Visitors cannot discover, match or chat here;
   product screens appear only as non-interactive screenshots of the real app.
   ========================================================================== */
(function (global) {
  'use strict';

  var I = ICO.icon, E = UI.esc;

  var host = null;
  var page = 'home';
  var menuOpen = false;

  var PAGES = [
    { key: 'home', label: 'Home' },
    { key: 'how', label: 'How it works' },
    { key: 'features', label: 'Features' },
    { key: 'safety', label: 'Safety & privacy' },
    { key: 'contact', label: 'Contact' }
  ];

  /* ---- Reusable pieces -------------------------------------------------- */

  function frame(screenId, params, cls) {
    return '<div class="pframe ' + (cls || '') + '"><div class="pframe__in">' +
      MOBILE.screenshot(screenId, params) + '</div></div>';
  }

  function nav() {
    return '<nav class="site-nav"><div class="container site-nav__in">' +
      '<button data-page="home">' + ICO.wordmark({ size: 32, text: 22 }) + '</button>' +
      '<div class="site-nav__links">' + PAGES.map(function (p) {
        return '<button class="site-nav__link' + (p.key === page ? ' is-active' : '') +
          '" data-page="' + p.key + '">' + E(p.label) + '</button>';
      }).join('') + '</div>' +
      '<button class="site-nav__cta" data-app>' + I('mobile') + 'Get the app</button>' +
      '<button class="site-nav__burger" data-burger aria-label="Menu">' + I(menuOpen ? 'close' : 'menu') + '</button>' +
      '</div></nav>' +
      (menuOpen ? '<div class="site-menu">' + PAGES.map(function (p) {
        return '<button data-page="' + p.key + '">' + E(p.label) + '</button>';
      }).join('') + '<button data-app style="color:var(--brand-700)">Get the app</button></div>' : '');
  }

  function shead(eyebrow, title, text, mod) {
    return '<div class="shead ' + (mod || '') + '">' +
      (eyebrow ? '<span class="eyebrow">' + I('sparkle') + E(eyebrow) + '</span>' : '') +
      '<h2 class="shead__title">' + title + '</h2>' +
      (text ? '<p class="shead__text">' + E(text) + '</p>' : '') +
      '</div>';
  }

  function fcard(icon, title, text) {
    return '<article class="fcard"><div class="fcard__ico">' + I(icon) + '</div>' +
      '<h3 class="fcard__title">' + E(title) + '</h3>' +
      '<p class="fcard__text">' + E(text) + '</p></article>';
  }

  function ticks(items) {
    return '<div class="tick-list">' + items.map(function (t) {
      return '<div class="tick"><span class="tick__i">' + I('check') + '</span><span>' + E(t) + '</span></div>';
    }).join('') + '</div>';
  }

  var STEPS = [
    ['Create your profile', 'Sign up with your phone number or email, then build a profile across eleven short steps — photos, faith and practice, background, education, family values, marital intentions and interests.'],
    ['Set your preferences', 'Choose what matters: age, location, height, nationality, ethnicity, language, sect, religious preferences, family values, education, profession and marital status.'],
    ['Discover and decide', 'Each day you receive a queue of recommendations, ranked by how closely someone matches the preferences you set. Like or pass — privately.'],
    ['Match, then talk', 'A conversation only opens when interest is mutual. Start with a marriage-minded prompt or write your own, then chat one to one.']
  ];

  var FEATURES = [
    ['profile', 'Profiles built for marriage', 'Eleven sections covering faith and practice, background, education and career, family values, marital intentions, lifestyle and interests.'],
    ['filter', 'Preferences that genuinely filter', 'Age, location, nationality, education, profession, marital status, height, religious preferences, family values, sect, ethnicity and language.'],
    ['discover', 'A considered daily queue', 'Recommendations are ranked by how closely each person matches the preferences you have set — no guesswork, no gimmicks.'],
    ['heart', 'Like or pass, privately', 'Nobody is told you liked them unless they like you back. There is no pressure and no public record.'],
    ['match', 'Chat opens on a mutual match', 'One to one text conversations unlock the moment interest is mutual — with typing indicators and read receipts.'],
    ['quote', 'Conversation starters', 'A small set of marriage-appropriate prompts for the moments when a blank message box is the hardest part.'],
    ['photo', 'Photos you control', 'Add up to six photos, choose your main one, reorder them or remove any of them at any time.'],
    ['lock', 'Phone or email sign-in', 'Sign up with a phone number verified by a one-time code, or with an email address and password.'],
    ['flag', 'Reporting and moderation', 'Report a profile or conversation and a human moderator reviews it. Accounts can be restricted or suspended.']
  ];

  /* ---- Pages ------------------------------------------------------------ */

  function pageHome() {
    return '<section class="hero"><div class="container hero__grid">' +
        '<div>' +
          '<span class="eyebrow">' + I('faith') + 'Muslim matrimony</span>' +
          '<h1 class="hero__title">Marriage,<br><em>with intention.</em></h1>' +
          '<p class="hero__text">Qiran is a matrimony app for Muslims who are serious about marriage. Build a profile that says something real, set the preferences that actually matter, and meet people whose intentions match your own.</p>' +
          '<div class="hero__actions">' +
            '<button class="site-btn site-btn--primary" data-app>' + I('mobile') + 'Get the app</button>' +
            '<button class="site-btn site-btn--ghost" data-page="how">See how it works' + I('arrow-right') + '</button>' +
          '</div>' +
          '<div class="hero__meta">' +
            '<div class="hero__stat"><strong>11</strong><span>profile sections</span></div>' +
            '<div class="hero__stat"><strong>12</strong><span>match preferences</span></div>' +
            '<div class="hero__stat"><strong>1:1</strong><span>chat after a mutual match</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="shots">' +
          frame('h02', { id: 'fatima' }, 'pframe--sm pframe--tilt-l') +
          frame('d01', {}, 'pframe--raise') +
          frame('i01', {}, 'pframe--sm pframe--tilt-r') +
        '</div>' +
      '</div></section>' +

      '<section class="section"><div class="container">' +
        shead('How it works', 'Four steps, and none of them are guesswork', 'Qiran is built around the way Muslim marriages actually begin — considered profiles, clear intentions and families who matter.') +
        '<div class="steps">' + STEPS.map(function (s, i) {
          return '<article class="step-card"><div class="step-card__n">0' + (i + 1) + '</div>' +
            '<h3 class="step-card__t">' + E(s[0]) + '</h3>' +
            '<p class="step-card__d">' + E(s[1]) + '</p></article>';
        }).join('') + '</div>' +
      '</div></section>' +

      '<section class="section section--soft"><div class="container">' +
        '<div class="split">' +
          '<div><span class="eyebrow">' + I('discover') + 'Discovery</span>' +
            '<h2 class="shead__title" style="margin-top:20px">A daily queue, ranked by what you asked for</h2>' +
            '<p class="shead__text">Every recommendation shows you why it is there. Discovery is driven by your preferences and filters — not by opaque scoring.</p>' +
            ticks([
              'One profile at a time, with large, honest photography',
              'Faith, profession, education and language visible at a glance',
              'Like or pass with a tap or a swipe',
              'Filters grouped into Basic, Background, Faith and values, and Education and life'
            ]) +
          '</div>' +
          '<div class="split__media">' + frame('d01') + '</div>' +
        '</div>' +
        '<div class="split split--flip">' +
          '<div><span class="eyebrow">' + I('match') + 'Mutual matching</span>' +
            '<h2 class="shead__title" style="margin-top:20px">Conversations start only when both people say yes</h2>' +
            '<p class="shead__text">Nobody can message you out of nowhere. A chat opens at the moment interest becomes mutual, and never before.</p>' +
            ticks([
              'Likes stay private until they are returned',
              'A clear match moment for both people',
              'Marriage-minded conversation starters to open with',
              'Typing indicators and read receipts in every chat'
            ]) +
          '</div>' +
          '<div class="split__media">' + frame('e01', { id: 'amina' }) + '</div>' +
        '</div>' +
      '</div></section>' +

      '<section class="section"><div class="container">' +
        shead('Features', 'Everything the app does', 'One product, built for one purpose. Every capability below is part of the app.') +
        '<div class="fgrid">' + FEATURES.slice(0, 6).map(function (f) { return fcard(f[0], f[1], f[2]); }).join('') + '</div>' +
        '<div style="text-align:center;margin-top:40px">' +
          '<button class="site-btn site-btn--ghost" data-page="features">See all features' + I('arrow-right') + '</button></div>' +
      '</div></section>' +

      trustSection() +

      '<section class="section section--sand"><div class="container">' +
        shead('', 'Designed for every screen', 'The app is built for iOS and Android. This website adapts from desktop to tablet to phone.') +
        '<div class="viewports">' +
          viewport('desktop', 'Desktop', 'Full-width layout, four column grids') +
          viewport('tablet', 'Tablet', 'Two column grids, same content') +
          viewport('mobile', 'Mobile', 'Single column, stacked navigation') +
        '</div>' +
      '</div></section>' +

      ctaBand() + footer();
  }

  function viewport(kind, label, note) {
    return '<div class="vp vp--' + kind + '"><div class="vp__screen">' +
      '<div class="vp__bar"><i></i><i></i><i></i></div>' +
      '<div class="vp__body"><div class="vp__hero"></div>' +
      '<div class="vp__lines"><i></i><i></i><i></i></div>' +
      '<div class="vp__cols"><i></i><i></i><i></i></div></div></div>' +
      '<div class="vp__label">' + E(label) + '</div>' +
      '<div class="vp__note">' + E(note) + '</div></div>';
  }

  function trustSection() {
    return '<section class="section section--dark"><div class="container">' +
      shead('Safety', 'Built to feel respectful, because it has to be', 'Qiran is a place for serious marriage intentions. The product is shaped around that from the first screen.') +
      '<div class="trust">' +
        '<div class="trust-card"><div class="trust-card__ico">' + I('lock') + '</div>' +
          '<h3>Your details stay yours</h3>' +
          '<p>Your phone number and email address are used to sign you in. They are never shown on your profile.</p></div>' +
        '<div class="trust-card"><div class="trust-card__ico">' + I('match') + '</div>' +
          '<h3>No unsolicited messages</h3>' +
          '<p>A conversation can only begin after both people have shown interest. Nobody can message you before that.</p></div>' +
        '<div class="trust-card"><div class="trust-card__ico">' + I('flag') + '</div>' +
          '<h3>Reported, then reviewed</h3>' +
          '<p>Reports go to a moderation team who review them and can restrict or suspend an account.</p></div>' +
      '</div></div></section>';
  }

  function ctaBand() {
    return '<section class="section"><div class="container"><div class="cta-band"><div class="cta-band__in">' +
      '<h2>Start with intention</h2>' +
      '<p>Build your profile, set your preferences, and meet people who are looking for the same thing you are.</p>' +
      '<div class="cta-band__actions">' +
        '<button class="site-btn site-btn--light" data-app>' + I('mobile') + 'Get the app</button>' +
        '<button class="site-btn site-btn--outline-light" data-page="contact">Contact us</button>' +
      '</div></div></div></div></section>';
  }

  function pageHow() {
    return '<section class="hero" style="padding-bottom:64px"><div class="container">' +
        '<div class="shead" style="margin-bottom:0">' +
          '<span class="eyebrow">' + I('about') + 'How it works</span>' +
          '<h1 class="shead__title" style="font-size:clamp(34px,4.6vw,54px)">From profile to conversation</h1>' +
          '<p class="shead__text">Four steps. Each one exists to make the next conversation a more serious one.</p>' +
        '</div></div></section>' +

      '<section class="section"><div class="container">' +
        '<div class="split">' +
          '<div><div class="step-card__n">01</div><h2 class="shead__title">' + E(STEPS[0][0]) + '</h2>' +
            '<p class="shead__text">' + E(STEPS[0][1]) + '</p>' +
            ticks(['Phone number with a one-time code, or email and password',
              'Photos, bio, faith and practice, background, education and career',
              'Family values, marital intentions, lifestyle, personality and interests',
              'Preview exactly how your profile will look before it goes live']) +
          '</div><div class="split__media">' + frame('builder', { i: 4 }) + '</div>' +
        '</div>' +
        '<div class="split split--flip">' +
          '<div><div class="step-card__n">02</div><h2 class="shead__title">' + E(STEPS[1][0]) + '</h2>' +
            '<p class="shead__text">' + E(STEPS[1][1]) + '</p>' +
            ticks(['Grouped into Basic, Background, Faith and values, and Education and life',
              'Sliders for age and height, searchable lists for everything else',
              'See how many filters are active at a glance',
              'Clear them all in one tap']) +
          '</div><div class="split__media">' + frame('filters') + '</div>' +
        '</div>' +
        '<div class="split">' +
          '<div><div class="step-card__n">03</div><h2 class="shead__title">' + E(STEPS[2][0]) + '</h2>' +
            '<p class="shead__text">' + E(STEPS[2][1]) + '</p>' +
            ticks(['One profile at a time, shown large',
              'Every card explains which of your preferences it matched',
              'Scroll the full profile before you decide',
              'When the day\'s queue is done, it tells you honestly']) +
          '</div><div class="split__media">' + frame('d02', { id: 'amina' }) + '</div>' +
        '</div>' +
        '<div class="split split--flip">' +
          '<div><div class="step-card__n">04</div><h2 class="shead__title">' + E(STEPS[3][0]) + '</h2>' +
            '<p class="shead__text">' + E(STEPS[3][1]) + '</p>' +
            ticks(['A match moment you both see',
              'Conversation starters grouped by theme',
              'One to one text chat with typing indicators and read receipts',
              'Revisit the full profile from inside the conversation']) +
          '</div><div class="split__media">' + frame('h02', { id: 'fatima' }) + '</div>' +
        '</div>' +
      '</div></section>' +
      ctaBand() + footer();
  }

  function pageFeatures() {
    return '<section class="hero" style="padding-bottom:64px"><div class="container">' +
        '<div class="shead" style="margin-bottom:0">' +
          '<span class="eyebrow">' + I('list') + 'Features</span>' +
          '<h1 class="shead__title" style="font-size:clamp(34px,4.6vw,54px)">What you get</h1>' +
          '<p class="shead__text">One app, one purpose. Everything below is in the product — and nothing beyond it.</p>' +
        '</div></div></section>' +

      '<section class="section"><div class="container">' +
        '<div class="fgrid">' + FEATURES.map(function (f) { return fcard(f[0], f[1], f[2]); }).join('') + '</div>' +
      '</div></section>' +

      '<section class="section section--soft"><div class="container">' +
        shead('Inside the app', 'The screens themselves', 'These are the real product screens, not illustrations.') +
        '<div class="shots" style="flex-wrap:wrap;gap:28px">' +
          frame('d01', {}, 'pframe--sm') +
          frame('g01', {}, 'pframe--sm') +
          frame('h01', {}, 'pframe--sm') +
          frame('i01', {}, 'pframe--sm') +
        '</div>' +
      '</div></section>' +
      ctaBand() + footer();
  }

  function pageSafety() {
    return '<section class="hero" style="padding-bottom:64px"><div class="container">' +
        '<div class="shead" style="margin-bottom:0">' +
          '<span class="eyebrow">' + I('shield') + 'Safety and privacy' +
          '</span><h1 class="shead__title" style="font-size:clamp(34px,4.6vw,54px)">Respect, by design</h1>' +
          '<p class="shead__text">How Qiran handles your information, your conversations and your peace of mind.</p>' +
        '</div></div></section>' +

      '<section class="section"><div class="container">' +
        '<div class="fgrid">' +
          fcard('match', 'Chat only after a mutual match', 'No one can send you a message unless you have both shown interest. There is no inbox from strangers, because there is no way to reach it.') +
          fcard('lock', 'Contact details are never published', 'Your phone number and email address are used only to sign you in and secure your account. They do not appear on your profile.') +
          fcard('heart', 'Likes stay private', 'If you like someone and they do not like you back, they are never told. Nothing about your activity is public.') +
          fcard('photo', 'You control your photos', 'Add, reorder or remove any photo whenever you want. Removing a photo removes it from your profile immediately.') +
          fcard('flag', 'Report anything that feels wrong', 'You can report a profile or a conversation. Reports go to a moderation team who review them and act on them.') +
          fcard('ban', 'Accounts can be restricted', 'Where our guidelines have been broken, an account can be restricted or suspended by a moderator.') +
        '</div>' +
      '</div></section>' +

      '<section class="section section--soft"><div class="container">' +
        '<div class="split">' +
          '<div>' + shead('', 'How moderation works', '', 'shead--left') +
            ticks([
              'A member reports a profile or a conversation and chooses a reason',
              'The report enters a moderation queue with the reason and the date',
              'A moderator reviews the report alongside the relevant profile',
              'The moderator updates the report status and, where needed, the account status',
              'Every action is taken by a person — nothing is decided automatically'
            ]) +
          '</div>' +
          '<div>' + shead('', 'What we ask of members', '', 'shead--left') +
            ticks([
              'Be honest about your intentions, your circumstances and your photos',
              'Treat every conversation as one you would be comfortable showing your family',
              'Use your own recent photographs',
              'Step away respectfully if a conversation is not going anywhere',
              'Report anything that does not belong here'
            ]) +
          '</div>' +
        '</div>' +
      '</div></section>' +

      '<section class="section"><div class="container">' +
        '<div class="cta-band" style="background:linear-gradient(150deg,var(--ink-800),var(--ink-900))">' +
          '<div class="cta-band__in">' +
            '<h2>Questions about privacy?</h2>' +
            '<p>Our team is happy to walk through how your information is stored and used.</p>' +
            '<div class="cta-band__actions"><button class="site-btn site-btn--light" data-page="contact">Contact us</button></div>' +
          '</div></div>' +
      '</div></section>' + footer();
  }

  function pageContact() {
    return '<section class="hero" style="padding-bottom:64px"><div class="container">' +
        '<div class="shead" style="margin-bottom:0">' +
          '<span class="eyebrow">' + I('mail') + 'Contact' +
          '</span><h1 class="shead__title" style="font-size:clamp(34px,4.6vw,54px)">Get in touch</h1>' +
          '<p class="shead__text">Questions about the app, partnerships or press — we read everything.</p>' +
        '</div></div></section>' +

      '<section class="section"><div class="container"><div class="contact-grid">' +
        '<div class="contact-info">' +
          '<div class="cinfo"><div class="cinfo__ico">' + I('mail') + '</div><div>' +
            '<div class="cinfo__t">Email</div><div class="cinfo__v">hello@qiran.app</div>' +
            '<div class="cinfo__d">We aim to reply within two working days.</div></div></div>' +
          '<div class="cinfo"><div class="cinfo__ico">' + I('phone') + '</div><div>' +
            '<div class="cinfo__t">Phone</div><div class="cinfo__v">+44 20 7946 0113</div>' +
            '<div class="cinfo__d">Monday to Friday, 9am to 5pm GMT.</div></div></div>' +
          '<div class="cinfo"><div class="cinfo__ico">' + I('location') + '</div><div>' +
            '<div class="cinfo__t">Office</div><div class="cinfo__v">London, United Kingdom</div>' +
            '<div class="cinfo__d">Visits by appointment only.</div></div></div>' +
          '<div class="cinfo"><div class="cinfo__ico">' + I('flag') + '</div><div>' +
            '<div class="cinfo__t">Report a profile</div><div class="cinfo__v">safety@qiran.app</div>' +
            '<div class="cinfo__d">Reports can also be made from inside the app.</div></div></div>' +
        '</div>' +

        '<form class="cform" data-cform novalidate>' +
          '<h3 style="font-family:var(--font-display);font-size:24px;color:var(--brand-900);margin-bottom:6px">Send an enquiry</h3>' +
          '<p style="font-size:14px;color:var(--ink-500);margin-bottom:24px">Fill in the form and we will come back to you.</p>' +
          '<div class="cform__row">' +
            '<div class="cfield"><label for="cf-name">Full name</label>' +
              '<input id="cf-name" type="text" name="name" placeholder="Your name"><div data-err="name"></div></div>' +
            '<div class="cfield"><label for="cf-email">Email address</label>' +
              '<input id="cf-email" type="email" name="email" placeholder="you@example.com"><div data-err="email"></div></div>' +
          '</div>' +
          '<div class="cfield"><label for="cf-subject">Subject</label>' +
            '<select id="cf-subject" name="subject">' +
              '<option>General enquiry</option><option>Account and sign-in</option>' +
              '<option>Safety and moderation</option><option>Partnerships</option><option>Press</option>' +
            '</select></div>' +
          '<div class="cfield"><label for="cf-message">Message</label>' +
            '<textarea id="cf-message" name="message" placeholder="How can we help?"></textarea>' +
            '<div data-err="message"></div></div>' +
          '<button type="submit" class="site-btn site-btn--primary" style="width:100%">' + I('send') + 'Send enquiry</button>' +
          '<p style="font-size:12px;color:var(--ink-400);margin-top:14px;text-align:center">We use your details only to reply to this enquiry.</p>' +
        '</form>' +
      '</div></div></section>' + footer();
  }

  function footer() {
    return '<footer class="site-footer"><div class="container">' +
      '<div class="site-footer__grid">' +
        '<div>' + ICO.wordmark({ variant: 'light', size: 32, text: 22 }) +
          '<p class="site-footer__blurb">A matrimony app for Muslims who are serious about marriage. Built around faith, family and clear intentions.</p></div>' +
        '<div><h4>Product</h4><ul>' +
          '<li><button data-page="how">How it works</button></li>' +
          '<li><button data-page="features">Features</button></li>' +
          '<li><button data-app>Get the app</button></li></ul></div>' +
        '<div><h4>Trust</h4><ul>' +
          '<li><button data-page="safety">Safety and privacy</button></li>' +
          '<li><button data-page="safety">Community guidelines</button></li>' +
          '<li><button data-page="contact">Report a profile</button></li></ul></div>' +
        '<div><h4>Company</h4><ul>' +
          '<li><button data-page="contact">Contact</button></li>' +
          '<li><button data-page="safety">Privacy policy</button></li>' +
          '<li><button data-page="safety">Terms of use</button></li></ul></div>' +
      '</div>' +
      '<div class="site-footer__bottom">' +
        '<span>© 2026 Qiran. All rights reserved.</span>' +
        '<span>Prototype content — all people and details shown are fictional.</span>' +
      '</div></div></footer>';
  }

  var RENDER = {
    home: pageHome, how: pageHow, features: pageFeatures,
    safety: pageSafety, contact: pageContact
  };

  /* ---- Mount ------------------------------------------------------------ */

  function paint() {
    host.innerHTML = '<div class="site">' + nav() + '<div data-site-body>' + RENDER[page]() + '</div></div>';
    wireForm();
  }

  function wireForm() {
    var form = UI.qs('[data-cform]', host);
    if (!form) return;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = form.name, email = form.email, message = form.message;
      var ok = true;

      function err(field, msg) {
        var slot = UI.qs('[data-err="' + field.name + '"]', form);
        field.classList.toggle('is-invalid', !!msg);
        slot.innerHTML = msg ? '<div class="cfield__err">' + I('alert') + E(msg) + '</div>' : '';
        if (msg) ok = false;
      }

      err(name, name.value.trim() ? '' : 'Please tell us your name.');
      err(email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value) ? '' : 'Enter a valid email address.');
      err(message, message.value.trim().length >= 10 ? '' : 'Please write a little more so we can help.');
      if (!ok) return;

      var btn = UI.qs('button[type="submit"]', form);
      btn.disabled = true;
      btn.innerHTML = 'Sending…';
      setTimeout(function () {
        form.innerHTML = '<div class="cform__sent">' +
          '<div class="success-mark">' + I('check') + '</div>' +
          '<h3 style="font-family:var(--font-display);font-size:26px;color:var(--brand-900)">Thank you, ' + E(name.value.trim().split(' ')[0]) + '</h3>' +
          '<p style="font-size:15px;color:var(--ink-600);margin-top:10px;max-width:340px;margin-left:auto;margin-right:auto">' +
          'Your enquiry has reached us. We will reply to ' + E(email.value) + ' within two working days.</p></div>';
      }, 1000);
    });
  }

  function mount(container) {
    host = container;
    page = 'home';
    menuOpen = false;
    paint();

    UI.on(host, 'click', '[data-page]', function (e, t) {
      e.preventDefault();
      page = t.dataset.page;
      menuOpen = false;
      paint();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    UI.on(host, 'click', '[data-burger]', function () {
      menuOpen = !menuOpen;
      paint();
    });

    UI.on(host, 'click', '[data-app]', function () {
      UI.modal(document.body, {
        tone: 'info', icon: 'mobile',
        title: 'Qiran is a mobile application',
        text: 'The app will be available on iOS and Android. Discovery, matching and messaging all happen in the app — this website is informational only.',
        actions: [{ label: 'Got it', variant: 'btn--primary' }]
      });
    });
  }

  global.SITE = { mount: mount };
})(window);
