/* ==========================================================================
   QIRAN — Prototype shell
   Showcase home, presenter navigation and the scope overview screen.
   This layer is deliberately separate from the simulated product UI.
   ========================================================================== */
(function (global) {
  'use strict';

  var I = ICO.icon, E = UI.esc, img = UI.img;
  var PX = DATA.PX;

  var stage = null, bar = null;
  var route = 'home';
  var panel = null;

  var ROUTES = [
    { key: 'home', label: 'Prototype home', icon: 'home' },
    { key: 'mobile', label: 'Mobile app', icon: 'mobile' },
    { key: 'site', label: 'Marketing website', icon: 'globe' },
    { key: 'admin', label: 'Admin panel', icon: 'dashboard' }
  ];

  /* ======================================================================
     Presenter bar
     ====================================================================== */

  function renderBar() {
    bar.innerHTML = '<div class="pbar">' +
      '<div class="pbar__brand">' + ICO.logoMark(20, 'light') + '<span>Prototype</span></div>' +
      '<div class="pbar__nav">' + ROUTES.map(function (r) {
        return '<button class="pnav' + (route === r.key ? ' is-active' : '') + '" data-route="' + r.key +
          '" title="' + E(r.label) + '">' + I(r.icon) + '<span>' + E(r.label) + '</span></button>';
      }).join('') + '</div>' +
      '<div class="pbar__tools">' +
        (route === 'mobile'
          ? '<button class="ptool" data-restart>' + I('refresh') + '<span>Restart demo</span></button>' +
            '<button class="ptool" data-panel="states">' + I('list') + '<span>States</span></button>'
          : '') +
        '<button class="ptool" data-panel="guide">' + I('info') + '<span>Demo guide</span></button>' +
      '</div></div>';
  }

  /* ======================================================================
     Presenter panels
     ====================================================================== */

  var JOURNEY = [
    ['Welcome', 'Create account'],
    ['Phone number', 'OTP verification'],
    ['Profile setup', '11 guided steps'],
    ['Profile preview', 'Profile complete'],
    ['Discovery', 'Filters, then Apply'],
    ['View full profile', 'Like Amina'],
    ['Mutual match', 'Start conversation'],
    ['Conversation starter', 'Send message'],
    ['Chat', 'Typing indicator, read receipt']
  ];

  var TIPS = [
    ['OTP verification', 'Any six digits verify successfully. Enter 000000 to show the invalid-code state.'],
    ['Discovery', 'Amina is the scripted mutual match — she has already liked Yusuf. Like her to trigger the match moment. Cards can be swiped or tapped.'],
    ['Other profiles', 'Liking anyone else shows the "no match yet" behaviour, which is the honest default.'],
    ['Bio validation', 'Clear the bio field in the About step to show inline form validation.'],
    ['Photos', 'Tap an empty photo slot to show the upload progress, reorder and remove controls.'],
    ['Chat', 'Send a message to see delivery and read receipts plus the typing indicator.'],
    ['Admin', 'Suspend or restrict an account, or resolve a report, to show the confirmation dialogs.']
  ];

  function openPanel(kind) {
    closePanel();
    var html;
    if (kind === 'guide') {
      html = '<div class="ppanel">' +
        '<div class="ppanel__head"><div class="ppanel__title">Demo guide</div>' +
          '<div class="ppanel__sub">Presenter notes — not part of the product</div></div>' +
        '<div class="ppanel__body">' +
          '<div class="pgroup">Primary journey</div>' +
          JOURNEY.map(function (j, i) {
            return '<div class="pitem"><span class="pitem__ico">' + I('check-circle') + '</span>' +
              '<span><span class="pitem__t">' + (i + 1) + '. ' + E(j[0]) + '</span>' +
              '<span class="pitem__d">' + E(j[1]) + '</span></span></div>';
          }).join('') +
          '<div class="pgroup">Things to point out</div>' +
          TIPS.map(function (t) {
            return '<div class="pitem"><span class="pitem__ico">' + I('sparkle') + '</span>' +
              '<span><span class="pitem__t">' + E(t[0]) + '</span>' +
              '<span class="pitem__d">' + E(t[1]) + '</span></span></div>';
          }).join('') +
        '</div></div>';
    } else {
      html = '<div class="ppanel">' +
        '<div class="ppanel__head"><div class="ppanel__title">Supporting states</div>' +
          '<div class="ppanel__sub">Jump straight to a state that is hard to reach naturally</div></div>' +
        '<div class="ppanel__body">' + MOBILE.STATES.map(function (s) {
          return '<button class="pitem" data-state="' + s.id + '">' +
            '<span class="pitem__ico">' + I('mobile') + '</span>' +
            '<span><span class="pitem__t">' + E(s.title) + '</span>' +
            '<span class="pitem__d">' + E(s.desc) + '</span></span></button>';
        }).join('') + '</div></div>';
    }
    panel = UI.h(html);
    document.getElementById('proto-root').appendChild(panel);
    setTimeout(function () { document.addEventListener('click', outside); }, 0);
  }

  function outside(e) {
    if (panel && !panel.contains(e.target) && !e.target.closest('[data-panel]')) closePanel();
  }
  function closePanel() {
    if (panel) { panel.remove(); panel = null; }
    document.removeEventListener('click', outside);
  }

  /* ======================================================================
     Prototype home
     ====================================================================== */

  function renderHome() {
    return '<div class="home"><div class="home__inner">' +
      '<div class="home__head">' +
        '<div class="home__logo">' + ICO.logoMark(56) + '</div>' +
        '<span class="eyebrow">' + I('sparkle') + 'Interactive Product Experience</span>' +
        '<h1 class="home__title">Muslim Matrimony &amp;<br>Matchmaking Platform</h1>' +
        '<p class="home__sub">Three connected experiences, shown exactly as they will feel in the finished product. Choose one to begin.</p>' +
      '</div>' +

      '<div class="home__cards">' +
        '<article class="ecard ecard--mobile">' +
          '<div class="ecard__visual"><div class="mini-phone">' + img(PX.amina1, 300, 460, '') + '</div></div>' +
          '<div class="ecard__body">' +
            '<div class="ecard__kicker">iOS &amp; Android</div>' +
            '<h2 class="ecard__title">Mobile app</h2>' +
            '<p class="ecard__text">Explore the core matchmaking journey — sign-up, profile creation, preferences, discovery, mutual matches and chat.</p>' +
            '<div class="ecard__foot"><button class="ebtn" data-route="mobile">View experience' + I('arrow-right') + '</button></div>' +
          '</div></article>' +

        '<article class="ecard ecard--site">' +
          '<div class="ecard__visual"><div class="mini-browser">' +
            '<div class="mini-browser__bar"><i></i><i></i><i></i></div>' +
            '<div class="mini-browser__body">' + img(PX.zainab, 460, 300, '') + '<div class="mini-browser__strip"></div></div>' +
          '</div></div>' +
          '<div class="ecard__body">' +
            '<div class="ecard__kicker">Responsive website</div>' +
            '<h2 class="ecard__title">Marketing website</h2>' +
            '<p class="ecard__text">Explore the public-facing experience — positioning, how it works, features, safety and privacy, and contact.</p>' +
            '<div class="ecard__foot"><button class="ebtn" data-route="site">View experience' + I('arrow-right') + '</button></div>' +
          '</div></article>' +

        '<article class="ecard ecard--admin">' +
          '<div class="ecard__visual"><div class="mini-admin">' +
            '<div class="mini-admin__side"><i></i><i></i><i></i><i></i><i></i></div>' +
            '<div class="mini-admin__main">' +
              '<div class="mini-admin__kpis"><i></i><i></i><i></i></div>' +
              '<div class="mini-admin__rows"><i></i><i></i><i></i><i></i><i></i></div>' +
            '</div></div></div>' +
          '<div class="ecard__body">' +
            '<div class="ecard__kicker">Web dashboard</div>' +
            '<h2 class="ecard__title">Admin panel</h2>' +
            '<p class="ecard__text">Explore the operational experience — dashboard, users and profiles, match visibility, conversation metadata and moderation.</p>' +
            '<div class="ecard__foot"><button class="ebtn" data-route="admin">View experience' + I('arrow-right') + '</button></div>' +
          '</div></article>' +
      '</div>' +

      '<div class="home__foot">' +
        '<button class="home__overview" data-route="overview">' + I('list') + 'Product experience overview' + I('chevron-right') + '</button>' +
        '<p class="home__note">This is a client experience prototype. It demonstrates the functionality already agreed in the Statement of Work using realistic sample data. All people, names and details shown are fictional. The production mobile application is built for iOS and Android in Flutter.</p>' +
      '</div>' +
      '</div></div>';
  }

  /* ======================================================================
     Product experience overview
     ====================================================================== */

  var OVERVIEW = [
    {
      icon: 'mobile', title: 'Mobile application', meta: 'iOS and Android', route: 'mobile',
      items: ['Authentication', 'Profile creation', 'Preferences', 'Discovery', 'Like / Pass',
        'Mutual match', 'Conversation starters', 'Chat', 'Profile management']
    },
    {
      icon: 'globe', title: 'Marketing website', meta: 'Public and responsive', route: 'site',
      items: ['Home', 'How it works', 'Features', 'Safety / Privacy', 'Contact']
    },
    {
      icon: 'dashboard', title: 'Administration panel', meta: 'Web dashboard', route: 'admin',
      items: ['Dashboard', 'Users / Profiles', 'Match visibility', 'Conversation metadata',
        'Flagged profiles', 'Basic moderation']
    }
  ];

  function renderOverview() {
    return '<div class="ovw"><div class="ovw__inner">' +
      '<div class="ovw__head">' +
        '<span class="eyebrow">' + I('list') + 'Scope at a glance</span>' +
        '<h1 class="ovw__title">Product experience overview</h1>' +
        '<p class="ovw__sub">Everything included in this prototype, grouped by the three experiences that make up the platform.</p>' +
      '</div>' +
      '<div class="ovw__grid">' + OVERVIEW.map(function (o) {
        return '<article class="ocard">' +
          '<div class="ocard__head"><div class="ocard__ico">' + I(o.icon) + '</div>' +
            '<div><div class="ocard__title">' + E(o.title) + '</div>' +
            '<div class="ocard__meta">' + E(o.meta) + '</div></div></div>' +
          '<div class="ocard__list">' + o.items.map(function (it) {
            return '<div class="oitem"><span class="oitem__check">' + I('check-circle') + '</span>' + E(it) + '</div>';
          }).join('') + '</div>' +
          '<div class="ocard__foot"><button class="ocard__cta" data-route="' + o.route + '">Open' + I('arrow-right') + '</button></div>' +
          '</article>';
      }).join('') + '</div>' +
      '<div class="ovw__back"><button class="home__overview" data-route="home">' + I('arrow-left') + 'Back to prototype home</button></div>' +
      '</div></div>';
  }

  /* ======================================================================
     Routing
     ====================================================================== */

  /* Each experience mounts into a brand new <main>, so switching routes can
     never leave delegated listeners from the previous one attached. */
  function freshStage() {
    var el = document.createElement('main');
    el.id = 'stage';
    el.setAttribute('aria-live', 'polite');
    stage.replaceWith(el);
    stage = el;
    return el;
  }

  function navigate(next) {
    closePanel();
    route = next;
    document.body.className = 'route-' + next;
    renderBar();
    freshStage();

    if (next === 'home') { stage.innerHTML = renderHome(); }
    else if (next === 'overview') { stage.innerHTML = renderOverview(); }
    else if (next === 'mobile') { MOBILE.mount(stage); }
    else if (next === 'site') { SITE.mount(stage); }
    else if (next === 'admin') { ADMIN.mount(stage); }

    window.scrollTo(0, 0);
  }

  function init() {
    stage = document.getElementById('stage');
    bar = document.getElementById('presenter-bar');

    UI.on(document.body, 'click', '[data-route]', function (e, t) {
      e.preventDefault();
      navigate(t.dataset.route);
    });

    UI.on(bar, 'click', '[data-restart]', function () {
      closePanel();
      MOBILE.restart();
    });

    UI.on(bar, 'click', '[data-panel]', function (e, t) {
      e.stopPropagation();
      if (panel) { closePanel(); return; }
      openPanel(t.dataset.panel);
    });

    UI.on(document.body, 'click', '[data-state]', function (e, t) {
      var id = t.dataset.state;
      closePanel();
      if (route !== 'mobile') {
        navigate('mobile');
        setTimeout(function () { MOBILE.jump(id); }, 120);
      } else {
        MOBILE.jump(id);
      }
    });

    navigate('home');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})(window);
