/* ==========================================================================
   QIRAN — Administration panel
   Operational only: users, matches, conversation metadata and moderation.
   No analytics, payments, or identity-verification workflows.
   ========================================================================== */
(function (global) {
  'use strict';

  var I = ICO.icon, E = UI.esc, img = UI.img;
  var A = DATA.ADMIN;

  var host = null;
  var view = 'login';
  var params = {};
  var state = null;

  var NAV = [
    { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { key: 'users', label: 'Users & profiles', icon: 'users' },
    { key: 'matches', label: 'Match visibility', icon: 'match' },
    { key: 'conversations', label: 'Conversations', icon: 'chat' },
    { key: 'moderation', label: 'Moderation', icon: 'flag', count: function () { return openReports(); } }
  ];

  function freshState() {
    return {
      accounts: A.users.reduce(function (m, u) { m[u.id] = u.account; return m; }, {}),
      reports: A.reports.reduce(function (m, r) { m[r.ref] = r.status; return m; }, {}),
      userSearch: '',
      userFilter: 'All'
    };
  }

  function openReports() {
    return A.reports.filter(function (r) { return state.reports[r.ref] !== 'Resolved'; }).length;
  }

  function person(id) { return DATA.person(id); }

  /* ---- Shared bits ------------------------------------------------------ */

  function accountBadge(status) {
    var map = { 'Active': 'ok', 'Restricted': 'warn', 'Suspended': 'danger' };
    return '<span class="badge badge--' + (map[status] || 'muted') + '">' + E(status) + '</span>';
  }

  function profileBadge(status) {
    var map = { 'Complete': 'ok', 'Incomplete': 'muted', 'Under review': 'info' };
    return '<span class="badge badge--' + (map[status] || 'muted') + '">' + E(status) + '</span>';
  }

  function reportBadge(status) {
    var map = { 'Open': 'danger', 'In review': 'warn', 'Resolved': 'ok' };
    return '<span class="badge badge--' + (map[status] || 'muted') + '">' + E(status) + '</span>';
  }

  function matchBadge(status) {
    var map = { 'Conversation started': 'ok', 'No conversation': 'muted', 'Ended': 'danger' };
    return '<span class="badge badge--' + (map[status] || 'muted') + '">' + E(status) + '</span>';
  }

  function convoBadge(status) {
    var map = { 'Active': 'ok', 'Inactive': 'muted', 'Closed': 'danger' };
    return '<span class="badge badge--' + (map[status] || 'muted') + '">' + E(status) + '</span>';
  }

  function userCell(id, name, sub) {
    var p = person(id);
    return '<div class="cell-user">' +
      UI.avatar(p && p.photos ? p.photos[0] : null, 36, name) +
      '<div><div class="cell-user__n">' + E(name) + '</div>' +
      (sub ? '<div class="cell-user__m">' + E(sub) + '</div>' : '') + '</div></div>';
  }

  function crumb(trail) {
    return '<div class="crumb">' + trail.map(function (t, i) {
      var sep = i ? I('chevron-right') : '';
      return sep + (t.view ? '<button data-view="' + t.view + '">' + E(t.label) + '</button>'
        : '<span>' + E(t.label) + '</span>');
    }).join('') + '</div>';
  }

  /* ======================================================================
     K01 — Login
     ====================================================================== */

  function renderLogin() {
    return '<div class="alogin">' +
      '<aside class="alogin__aside">' +
        ICO.wordmark({ variant: 'light', size: 34, text: 23 }) +
        '<div class="alogin__quote">The operational side of a product people trust with something this personal.</div>' +
        '<div class="alogin__meta">Qiran Administration · Internal use only</div>' +
      '</aside>' +
      '<main class="alogin__main"><div class="alogin__box">' +
        ICO.wordmark({ size: 34, text: 23 }) +
        '<h1 class="alogin__title">Administration</h1>' +
        '<p class="alogin__sub">Sign in with your administrator account.</p>' +
        '<form data-login novalidate>' +
          '<div class="cfield"><label for="al-user">Email or username</label>' +
            '<input id="al-user" type="text" name="user" value="admin@qiran.app" autocomplete="username">' +
            '<div data-err="user"></div></div>' +
          '<div class="cfield"><label for="al-pass">Password</label>' +
            '<input id="al-pass" type="password" name="pass" value="••••••••••" autocomplete="current-password">' +
            '<div data-err="pass"></div></div>' +
          '<button type="submit" class="abtn abtn--primary abtn--lg" style="width:100%;justify-content:center;margin-top:8px">' +
            I('lock') + 'Log in</button>' +
        '</form>' +
        '<p style="font-size:12px;color:var(--ink-400);margin-top:20px;text-align:center">Access is limited to authorised staff.</p>' +
      '</div></main>' +
      '</div>';
  }

  /* ======================================================================
     K02 — Dashboard
     ====================================================================== */

  function renderDashboard() {
    var recent = A.users.slice(0, 6);
    var queue = A.reports.filter(function (r) { return state.reports[r.ref] !== 'Resolved'; }).slice(0, 4);

    return '<div class="kpis">' + A.metrics.map(function (m) {
        var v = m.key === 'flagged' ? String(openReports()) : m.value;
        return '<div class="kpi' + (m.tone === 'warn' ? ' kpi--warn' : '') + '">' +
          '<div class="kpi__ico">' + I(m.icon) + '</div>' +
          '<div><div class="kpi__v">' + E(v) + '</div><div class="kpi__l">' + E(m.label) + '</div></div></div>';
      }).join('') + '</div>' +

      '<div style="display:grid;grid-template-columns:1.55fr 1fr;gap:24px;margin-top:24px" class="dash-grid">' +
        '<section class="panel">' +
          '<div class="panel__head"><div><div class="panel__title">Recently joined</div>' +
            '<div class="panel__sub">The newest accounts on the platform</div></div>' +
            '<div class="panel__tools"><button class="abtn" data-view="users">View all' + I('chevron-right') + '</button></div></div>' +
          '<div class="tablewrap"><table class="dtable" style="min-width:520px"><thead><tr>' +
            '<th>User</th><th>Location</th><th>Account</th><th>Joined</th><th></th></tr></thead><tbody>' +
            recent.map(function (u) {
              return '<tr><td>' + userCell(u.id, u.name, u.age + ' years') + '</td>' +
                '<td>' + E(u.location) + '</td>' +
                '<td>' + accountBadge(state.accounts[u.id]) + '</td>' +
                '<td class="num">' + E(u.joined) + '</td>' +
                '<td class="right"><button class="abtn" data-user="' + u.id + '">View</button></td></tr>';
            }).join('') + '</tbody></table></div>' +
        '</section>' +

        '<section class="panel">' +
          '<div class="panel__head"><div><div class="panel__title">Moderation queue</div>' +
            '<div class="panel__sub">' + openReports() + ' awaiting review</div></div>' +
            '<div class="panel__tools"><button class="abtn" data-view="moderation">Open' + I('chevron-right') + '</button></div></div>' +
          (queue.length ? '<div class="timeline">' + queue.map(function (r) {
            return '<div class="tl"><div class="tl__dot">' + I('flag') + '</div>' +
              '<div><div class="tl__t">' + E(r.name) + ' — ' + E(r.reason) + '</div>' +
              '<div class="tl__d">' + E(r.ref) + ' · ' + E(r.date) + ' · ' + E(state.reports[r.ref]) + '</div></div></div>';
          }).join('') + '</div>'
            : '<div class="aempty"><div class="aempty__ico">' + I('check-circle') + '</div>' +
              '<h3>Queue is clear</h3><p>No reports are waiting for review.</p></div>') +
        '</section>' +
      '</div>' +

      '<section class="panel" style="margin-top:24px">' +
        '<div class="panel__head"><div><div class="panel__title">Recent matches</div>' +
          '<div class="panel__sub">Operational visibility only — conversation content is not shown</div></div>' +
          '<div class="panel__tools"><button class="abtn" data-view="matches">View all' + I('chevron-right') + '</button></div></div>' +
        '<div class="tablewrap"><table class="dtable"><thead><tr>' +
          '<th>User</th><th>Matched with</th><th>Match date</th><th>Status</th></tr></thead><tbody>' +
          A.matches.slice(0, 5).map(function (m) {
            return '<tr><td>' + userCell(m.userId, m.user) + '</td>' +
              '<td>' + userCell(m.withId, m.withName) + '</td>' +
              '<td class="num">' + E(m.date) + '</td>' +
              '<td>' + matchBadge(m.status) + '</td></tr>';
          }).join('') + '</tbody></table></div>' +
      '</section>';
  }

  /* ======================================================================
     K03 — Users / profiles
     ====================================================================== */

  var USER_FILTERS = ['All', 'Active', 'Restricted', 'Suspended', 'Incomplete'];

  function filteredUsers() {
    var q = state.userSearch.toLowerCase();
    return A.users.filter(function (u) {
      var acc = state.accounts[u.id];
      var okFilter = state.userFilter === 'All' ||
        (state.userFilter === 'Incomplete' ? u.profile === 'Incomplete' : acc === state.userFilter);
      var okSearch = !q || u.name.toLowerCase().indexOf(q) > -1 || u.location.toLowerCase().indexOf(q) > -1;
      return okFilter && okSearch;
    });
  }

  function renderUsers() {
    var rows = filteredUsers();
    return '<section class="panel">' +
      '<div class="panel__head">' +
        '<div><div class="panel__title">Users and profiles</div>' +
        '<div class="panel__sub">' + rows.length + ' of ' + A.users.length + ' accounts</div></div>' +
        '<div class="panel__tools">' +
          '<div class="afilters">' + USER_FILTERS.map(function (f) {
            return '<button class="afilter' + (state.userFilter === f ? ' is-on' : '') + '" data-ufilter="' + f + '">' + f + '</button>';
          }).join('') + '</div>' +
          '<label class="asearch">' + I('search') +
            '<input type="text" placeholder="Search name or location" value="' + E(state.userSearch) + '" data-usearch></label>' +
        '</div>' +
      '</div>' +
      (rows.length ? '<div class="tablewrap"><table class="dtable"><thead><tr>' +
        '<th>User</th><th>Age</th><th>Location</th><th>Account status</th><th>Profile status</th><th>Joined</th><th></th>' +
        '</tr></thead><tbody>' + rows.map(function (u) {
          return '<tr><td>' + userCell(u.id, u.name) + '</td>' +
            '<td class="num">' + u.age + '</td>' +
            '<td>' + E(u.location) + '</td>' +
            '<td>' + accountBadge(state.accounts[u.id]) + '</td>' +
            '<td>' + profileBadge(u.profile) + '</td>' +
            '<td class="num">' + E(u.joined) + '</td>' +
            '<td class="right"><button class="abtn" data-user="' + u.id + '">' + I('eye') + 'View</button></td></tr>';
        }).join('') + '</tbody></table></div>'
        : '<div class="aempty"><div class="aempty__ico">' + I('search') + '</div>' +
          '<h3>No matching accounts</h3><p>Try a different search term or filter.</p></div>') +
      '<div class="panel__foot"><span>Showing ' + rows.length + ' record' + (rows.length === 1 ? '' : 's') + '</span>' +
        '<span>Updated 11 Sep 2026, 09:12</span></div>' +
      '</section>';
  }

  /* ======================================================================
     K04 / K05 — User detail and status management
     ====================================================================== */

  function renderUserDetail() {
    var u = A.users.filter(function (x) { return x.id === params.id; })[0];
    var p = person(params.id) || {};
    var acc = state.accounts[params.id];
    var photos = p.photos || [];
    var userMatches = A.matches.filter(function (m) { return m.userId === params.id || m.withId === params.id; });

    return crumb([{ label: 'Users and profiles', view: 'users' }, { label: u ? u.name : p.name }]) +
      '<div class="detail">' +
        '<div>' +
          '<section class="panel">' +
            '<div class="dphotos">' +
              '<div class="dphotos__main">' + img(photos[0], 520, 700, p.name) + '</div>' +
              (photos.slice(1, 4).map(function (ph) {
                return '<div class="dphotos__thumb">' + img(ph, 220, 220, 'Additional photo') + '</div>';
              }).join('') || '') +
            '</div>' +
            '<div class="dinfo">' +
              '<div class="dinfo__name">' + E(p.name) + '</div>' +
              '<div class="dinfo__meta">' + I('location') + E(p.location) + ' · ' + p.age + ' years</div>' +
              '<div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">' +
                accountBadge(acc) + (u ? profileBadge(u.profile) : '') + '</div>' +
            '</div>' +
          '</section>' +

          '<section class="panel">' +
            '<div class="panel__head"><div class="panel__title">Status management</div></div>' +
            '<div class="status-row"><span class="status-row__k">Account status</span>' +
              accountBadge(acc) +
              '<span class="status-row__actions">' +
                (acc !== 'Active' ? '<button class="abtn abtn--primary" data-status="Active">' + I('check') + 'Reactivate</button>' : '') +
                (acc !== 'Restricted' ? '<button class="abtn" data-status="Restricted">' + I('alert') + 'Restrict</button>' : '') +
                (acc !== 'Suspended' ? '<button class="abtn abtn--danger" data-status="Suspended">' + I('ban') + 'Suspend</button>' : '') +
              '</span></div>' +
            '<div class="status-row"><span class="status-row__k">Profile status</span>' +
              (u ? profileBadge(u.profile) : profileBadge('Complete')) +
              '<span class="status-row__actions"><span style="font-size:12px;color:var(--ink-400)">Set automatically from profile completeness</span></span></div>' +
            '<div class="status-row" style="border-bottom:0"><span class="status-row__k">Joined</span>' +
              '<span style="font-size:14px;font-weight:600">' + E(u ? u.joined : '—') + '</span></div>' +
          '</section>' +
        '</div>' +

        '<div>' +
          '<section class="panel">' +
            '<div class="panel__head"><div class="panel__title">Profile information</div>' +
              '<div class="panel__sub" style="margin-left:auto">Read only</div></div>' +
            '<div class="dgrid">' +
              dfield('Sect', p.sect) + dfield('Prayer and religiosity', p.prayer) +
              dfield('Nationality', p.nationality) + dfield('Ethnicity / region', p.ethnicity) +
              dfield('Languages', UI.list(p.languages)) + dfield('Marital status', p.maritalStatus) +
              dfield('Education', p.education) + dfield('Profession', p.profession) +
              dfield('Height', p.height ? UI.height(p.height) : '—') +
              dfield('Marriage timeline', p.timeline || '—') +
              '<div class="dfield dfield--wide"><div class="dfield__k">About</div>' +
                '<div class="dfield__v"><p>' + E(p.bio || '—') + '</p></div></div>' +
            '</div>' +
          '</section>' +

          '<section class="panel">' +
            '<div class="panel__head"><div class="panel__title">Matches</div>' +
              '<div class="panel__sub">' + userMatches.length + ' recorded</div></div>' +
            (userMatches.length ? '<div class="tablewrap"><table class="dtable" style="min-width:420px"><thead><tr>' +
              '<th>Matched with</th><th>Match date</th><th>Status</th></tr></thead><tbody>' +
              userMatches.map(function (m) {
                var other = m.userId === params.id ? { id: m.withId, n: m.withName } : { id: m.userId, n: m.user };
                return '<tr><td>' + userCell(other.id, other.n) + '</td>' +
                  '<td class="num">' + E(m.date) + '</td><td>' + matchBadge(m.status) + '</td></tr>';
              }).join('') + '</tbody></table></div>'
              : '<div class="aempty"><div class="aempty__ico">' + I('match') + '</div>' +
                '<h3>No matches yet</h3><p>This account has not matched with anyone.</p></div>') +
          '</section>' +
        '</div>' +
      '</div>';
  }

  function dfield(k, v) {
    return '<div class="dfield"><div class="dfield__k">' + E(k) + '</div>' +
      '<div class="dfield__v">' + E(v || '—') + '</div></div>';
  }

  /* ======================================================================
     K06 — Match visibility
     ====================================================================== */

  function renderMatches() {
    return '<section class="panel">' +
      '<div class="panel__head"><div><div class="panel__title">Match visibility</div>' +
        '<div class="panel__sub">Who matched with whom, and whether a conversation followed</div></div></div>' +
      '<div class="tablewrap"><table class="dtable"><thead><tr>' +
        '<th>User</th><th>Matched with</th><th>Match date</th><th>Status</th><th></th></tr></thead><tbody>' +
        A.matches.map(function (m) {
          return '<tr><td>' + userCell(m.userId, m.user) + '</td>' +
            '<td>' + userCell(m.withId, m.withName) + '</td>' +
            '<td class="num">' + E(m.date) + '</td>' +
            '<td>' + matchBadge(m.status) + '</td>' +
            '<td class="right"><button class="abtn" data-user="' + m.userId + '">View user</button></td></tr>';
        }).join('') + '</tbody></table></div>' +
      '<div class="panel__foot"><span>' + A.matches.length + ' matches</span>' +
        '<span>Match records are read only</span></div>' +
      '</section>';
  }

  /* ======================================================================
     K07 — Conversation metadata
     ====================================================================== */

  function renderConversations() {
    return '<div class="notice">' + I('lock') +
        '<div><b>Conversation content is private.</b> This view shows operational metadata only — who is talking, when the conversation started, when it was last active and how many messages it contains. Message text is never shown here.</div></div>' +
      '<section class="panel">' +
        '<div class="panel__head"><div><div class="panel__title">Conversations</div>' +
          '<div class="panel__sub">' + A.conversations.length + ' conversation records</div></div></div>' +
        '<div class="tablewrap"><table class="dtable"><thead><tr>' +
          '<th>Reference</th><th>Participants</th><th>Created</th><th>Last activity</th><th>Status</th><th class="right">Messages</th>' +
          '</tr></thead><tbody>' + A.conversations.map(function (c) {
            return '<tr><td class="num" style="font-weight:600;color:var(--ink-900)">' + E(c.id) + '</td>' +
              '<td>' + E(c.a) + ' &amp; ' + E(c.b) + '</td>' +
              '<td class="num">' + E(c.created) + '</td>' +
              '<td class="num">' + E(c.last) + '</td>' +
              '<td>' + convoBadge(c.status) + '</td>' +
              '<td class="num right">' + c.count + '</td></tr>';
          }).join('') + '</tbody></table></div>' +
      '</section>';
  }

  /* ======================================================================
     K08 / K09 — Moderation
     ====================================================================== */

  function renderModeration() {
    var open = A.reports.filter(function (r) { return state.reports[r.ref] !== 'Resolved'; });
    var resolved = A.reports.filter(function (r) { return state.reports[r.ref] === 'Resolved'; });

    function table(list, title, sub) {
      return '<section class="panel" style="margin-top:24px">' +
        '<div class="panel__head"><div><div class="panel__title">' + title + '</div>' +
          '<div class="panel__sub">' + sub + '</div></div></div>' +
        (list.length ? '<div class="tablewrap"><table class="dtable"><thead><tr>' +
          '<th>Reference</th><th>Profile</th><th>Reason</th><th>Reported</th><th>Status</th><th></th>' +
          '</tr></thead><tbody>' + list.map(function (r) {
            return '<tr><td class="num" style="font-weight:600;color:var(--ink-900)">' + E(r.ref) + '</td>' +
              '<td>' + userCell(r.id, r.name) + '</td>' +
              '<td>' + E(r.reason) + '</td>' +
              '<td class="num">' + E(r.date) + '</td>' +
              '<td>' + reportBadge(state.reports[r.ref]) + '</td>' +
              '<td class="right"><button class="abtn" data-report="' + r.ref + '">' + I('eye') + 'Review</button></td></tr>';
          }).join('') + '</tbody></table></div>'
          : '<div class="aempty"><div class="aempty__ico">' + I('check-circle') + '</div>' +
            '<h3>Nothing here</h3><p>No reports in this list.</p></div>') +
        '</section>';
    }

    return '<div class="notice notice--warn">' + I('info') +
      '<div>Every report is reviewed by a person. Nothing on Qiran is moderated automatically.</div></div>' +
      table(open, 'Awaiting review', open.length + ' open report' + (open.length === 1 ? '' : 's')) +
      table(resolved, 'Resolved', resolved.length + ' closed in the last 30 days');
  }

  function renderReport() {
    var r = A.reports.filter(function (x) { return x.ref === params.ref; })[0];
    var p = person(r.id) || {};
    var status = state.reports[r.ref];
    var acc = state.accounts[r.id] || 'Active';

    return crumb([{ label: 'Moderation', view: 'moderation' }, { label: r.ref }]) +
      '<div class="detail">' +
        '<div>' +
          '<section class="panel">' +
            '<div class="panel__head"><div><div class="panel__title">Report ' + E(r.ref) + '</div>' +
              '<div class="panel__sub">Raised ' + E(r.date) + '</div></div></div>' +
            '<div class="dgrid">' +
              dfield('Reason', r.reason) + dfield('Status', status) +
              dfield('Reported by', r.reporter) + dfield('Reported profile', r.name) +
              '<div class="dfield dfield--wide"><div class="dfield__k">Report detail</div>' +
                '<div class="dfield__v" style="margin-top:8px"><div class="report-quote">' + E(r.detail) + '</div></div></div>' +
            '</div>' +
          '</section>' +

          '<section class="panel">' +
            '<div class="panel__head"><div class="panel__title">Moderation actions</div></div>' +
            '<div class="status-row"><span class="status-row__k">Report status</span>' + reportBadge(status) +
              '<span class="status-row__actions">' +
                (status !== 'In review' ? '<button class="abtn" data-rstatus="In review">' + I('clock') + 'Mark in review</button>' : '') +
                (status !== 'Resolved' ? '<button class="abtn abtn--primary" data-rstatus="Resolved">' + I('check') + 'Resolve</button>' : '') +
                (status !== 'Open' ? '<button class="abtn" data-rstatus="Open">' + I('refresh') + 'Reopen</button>' : '') +
              '</span></div>' +
            '<div class="status-row" style="border-bottom:0"><span class="status-row__k">Account action</span>' +
              accountBadge(acc) +
              '<span class="status-row__actions">' +
                (acc !== 'Active' ? '<button class="abtn" data-status="Active" data-uid="' + r.id + '">' + I('check') + 'Reactivate</button>' : '') +
                (acc !== 'Restricted' ? '<button class="abtn" data-status="Restricted" data-uid="' + r.id + '">' + I('alert') + 'Restrict</button>' : '') +
                (acc !== 'Suspended' ? '<button class="abtn abtn--danger" data-status="Suspended" data-uid="' + r.id + '">' + I('ban') + 'Suspend</button>' : '') +
              '</span></div>' +
          '</section>' +
        '</div>' +

        '<div><section class="panel">' +
          '<div class="panel__head"><div><div class="panel__title">Profile context</div>' +
            '<div class="panel__sub">The profile this report refers to</div></div>' +
            '<div class="panel__tools"><button class="abtn" data-user="' + r.id + '">Open full profile' + I('chevron-right') + '</button></div></div>' +
          (function () {
            var ph = p.photos || [];
            var extra = ph.slice(1, 3);
            return '<div class="dphotos" style="grid-template-columns:repeat(4,1fr)">' +
              '<div class="dphotos__main" style="grid-column:span ' + (extra.length ? 2 : 4) + '">' +
                img(ph[0], 520, 700, p.name) + '</div>' +
              extra.map(function (x) {
                return '<div class="dphotos__thumb">' + img(x, 220, 220, 'Additional photo') + '</div>';
              }).join('') +
            '</div>';
          })() +
          '<div class="dgrid">' +
            dfield('Name', p.name) + dfield('Age', p.age) +
            dfield('Location', p.location) + dfield('Profession', p.profession) +
            dfield('Sect', p.sect) + dfield('Prayer and religiosity', p.prayer) +
            '<div class="dfield dfield--wide"><div class="dfield__k">About</div>' +
              '<div class="dfield__v"><p>' + E(p.bio || '—') + '</p></div></div>' +
          '</div>' +
        '</section></div>' +
      '</div>';
  }

  /* ======================================================================
     Shell
     ====================================================================== */

  var TITLES = {
    dashboard: ['Dashboard', 'Operational overview'],
    users: ['Users and profiles', 'Search, review and manage member accounts'],
    matches: ['Match visibility', 'Mutual matches recorded on the platform'],
    conversations: ['Conversations', 'Metadata only — message content is never shown'],
    moderation: ['Moderation', 'Reported profiles awaiting human review'],
    userDetail: ['User profile', 'Review profile information and account status'],
    report: ['Moderation review', 'Review the report and take action']
  };

  var BODY = {
    dashboard: renderDashboard, users: renderUsers, matches: renderMatches,
    conversations: renderConversations, moderation: renderModeration,
    userDetail: renderUserDetail, report: renderReport
  };

  function navKey() {
    if (view === 'userDetail') return 'users';
    if (view === 'report') return 'moderation';
    return view;
  }

  function paint() {
    if (view === 'login') {
      host.innerHTML = '<div class="admin">' + renderLogin() + '</div>';
      return;
    }
    var t = TITLES[view] || ['', ''];
    var active = navKey();

    host.innerHTML = '<div class="admin">' +
      '<aside class="aside">' +
        '<div class="aside__brand">' + ICO.wordmark({ variant: 'light', size: 30, text: 20 }) + '</div>' +
        '<div class="aside__label">Operations</div>' +
        '<nav class="anav">' + NAV.map(function (n) {
          var c = n.count ? n.count() : 0;
          return '<button class="anav__item' + (active === n.key ? ' is-active' : '') + '" data-view="' + n.key + '">' +
            I(n.icon) + '<span>' + E(n.label) + '</span>' +
            (c ? '<span class="anav__count">' + c + '</span>' : '') + '</button>';
        }).join('') + '</nav>' +
        '<div class="aside__foot">' +
          '<div class="auser"><span class="auser__av">SK</span>' +
            '<span class="auser__meta"><span class="auser__n">Sofia Karim</span>' +
            '<span class="auser__r">Administrator</span></span></div>' +
          '<button class="aside__signout" data-signout>' + I('logout') + '<span>Sign out</span></button>' +
        '</div>' +
      '</aside>' +
      '<main class="amain">' +
        '<div class="arail">' + NAV.map(function (n) {
          return '<button class="' + (active === n.key ? 'is-active' : '') + '" data-view="' + n.key + '">' +
            I(n.icon) + E(n.label) + '</button>';
        }).join('') + '</div>' +
        '<header class="ahead">' +
          '<div><div class="ahead__title">' + E(t[0]) + '</div><div class="ahead__sub">' + E(t[1]) + '</div></div>' +
          '<div class="ahead__tools">' +
            '<span class="badge badge--muted badge--plain">' + I('clock') + ' 11 Sep 2026</span>' +
          '</div>' +
        '</header>' +
        '<div class="abody">' + BODY[view]() + '</div>' +
      '</main>' +
      '</div>';
  }

  function goView(next, p) {
    view = next;
    params = p || {};
    paint();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ======================================================================
     Wiring — bound once per mount. Everything is delegated from `host`, so
     re-rendering the body never accumulates duplicate handlers.
     ====================================================================== */

  function wire() {
    UI.on(host, 'submit', 'form[data-login]', function (ev, form) {
      ev.preventDefault();
      var user = form.user, pass = form.pass, ok = true;
      function err(f, msg) {
        UI.qs('[data-err="' + f.name + '"]', form).innerHTML = msg
          ? '<div class="cfield__err">' + I('alert') + E(msg) + '</div>' : '';
        f.classList.toggle('is-invalid', !!msg);
        if (msg) ok = false;
      }
      err(user, user.value.trim() ? '' : 'Enter your email or username.');
      err(pass, pass.value.length >= 6 ? '' : 'Enter your password.');
      if (!ok) return;

      var btn = UI.qs('button[type="submit"]', form);
      btn.disabled = true;
      btn.innerHTML = 'Signing in…';
      setTimeout(function () { view = 'dashboard'; paint(); }, 800);
    });

    UI.on(host, 'click', '[data-view]', function (e, t) { goView(t.dataset.view); });
    UI.on(host, 'click', '[data-user]', function (e, t) { goView('userDetail', { id: t.dataset.user }); });
    UI.on(host, 'click', '[data-report]', function (e, t) { goView('report', { ref: t.dataset.report }); });

    UI.on(host, 'click', '[data-ufilter]', function (e, t) {
      state.userFilter = t.dataset.ufilter;
      paint();
    });

    var repaintSearch = UI.debounce(function () {
      paint();
      var s = UI.qs('[data-usearch]', host);
      if (s) { s.focus(); s.setSelectionRange(s.value.length, s.value.length); }
    }, 220);
    UI.on(host, 'input', '[data-usearch]', function (e, t) {
      state.userSearch = t.value;
      repaintSearch();
    });

    /* K05 — consequential actions are confirmed */
    UI.on(host, 'click', '[data-status]', function (e, t) {
      var next = t.dataset.status;
      var uid = t.dataset.uid || params.id;
      var p = person(uid) || { name: 'this account' };
      var copy = {
        'Suspended': ['Suspend this account?', E(p.name) + ' will be signed out, their profile will be hidden from discovery, and their conversations will be closed.'],
        'Restricted': ['Restrict this account?', E(p.name) + ' will stay signed in but their profile will not appear in anyone\'s recommendations while it is under review.'],
        'Active': ['Reactivate this account?', E(p.name) + ' will appear in recommendations again and can use the app normally.']
      }[next];

      UI.modal(document.body, {
        tone: next === 'Suspended' ? 'danger' : next === 'Restricted' ? 'warn' : 'ok',
        icon: next === 'Suspended' ? 'ban' : next === 'Restricted' ? 'alert' : 'check',
        title: copy[0],
        text: copy[1].replace(/&#39;/g, "'"),
        actions: [
          { label: 'Cancel', variant: 'btn--ghost' },
          {
            label: { 'Active': 'Reactivate', 'Restricted': 'Restrict', 'Suspended': 'Suspend' }[next],
            variant: next === 'Suspended' ? 'btn--danger' : 'btn--primary',
            onClick: function () {
              state.accounts[uid] = next;
              paint();
              UI.toast(document.body, 'Account set to ' + next, 'check');
            }
          }
        ]
      });
    });

    UI.on(host, 'click', '[data-rstatus]', function (e, t) {
      var next = t.dataset.rstatus;
      if (next === 'Resolved') {
        UI.modal(document.body, {
          tone: 'ok', icon: 'check', title: 'Resolve this report?',
          text: 'The report will be closed and removed from the review queue. You can reopen it later if you need to.',
          actions: [
            { label: 'Cancel', variant: 'btn--ghost' },
            {
              label: 'Resolve', variant: 'btn--primary',
              onClick: function () {
                state.reports[params.ref] = next;
                paint();
                UI.toast(document.body, 'Report ' + params.ref + ' resolved', 'check');
              }
            }
          ]
        });
      } else {
        state.reports[params.ref] = next;
        paint();
        UI.toast(document.body, 'Report set to ' + next, 'check');
      }
    });

    UI.on(host, 'click', '[data-signout]', function () {
      UI.modal(document.body, {
        tone: 'info', icon: 'logout', title: 'Sign out?',
        text: 'You will be returned to the administration login screen.',
        actions: [
          { label: 'Cancel', variant: 'btn--ghost' },
          { label: 'Sign out', variant: 'btn--primary', onClick: function () { view = 'login'; paint(); } }
        ]
      });
    });
  }

  function mount(container) {
    host = container;
    state = freshState();
    view = 'login';
    params = {};
    wire();
    paint();
  }

  global.ADMIN = { mount: mount };
})(window);
