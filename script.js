
/* ──────────────────────────────────────────────────
   AUTHENTICATION & LOGIN (Page 0)
   ────────────────────────────────────────────────── */

const VALID_USER_EMAIL = 'pouras.suryavanshi23@pccoepune.org';
const ALT_USER_EMAIL = 'pourassuryawanshi2@gmail.com';
const VALID_USER_PASS = 'pouras';

function goToLogin() {
  document.getElementById('page-login').classList.add('active');
  document.getElementById('page-outline').classList.remove('active');
  document.getElementById('page-progress').classList.remove('active');
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const emailInput = document.getElementById('login-email').value.trim();
  const passInput = document.getElementById('login-password').value;
  const errBox = document.getElementById('login-error-msg');
  const submitBtn = document.getElementById('btn-submit-login');

  if ((emailInput.toLowerCase() === VALID_USER_EMAIL.toLowerCase() || emailInput.toLowerCase() === ALT_USER_EMAIL.toLowerCase()) && passInput === VALID_USER_PASS) {
    errBox.style.display = 'none';
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;

    setTimeout(function() {
      submitBtn.textContent = 'Sign In';
      submitBtn.disabled = false;
      document.getElementById('page-login').classList.remove('active');
      document.getElementById('page-outline').classList.add('active');
      initResize('rh1');
    }, 450);
  } else {
    errBox.style.display = 'block';
    errBox.textContent = 'Invalid email or password. Please use your registered Swayam credentials.';
  }
}

function fillDemoCreds() {
  document.getElementById('login-email').value = VALID_USER_EMAIL;
  document.getElementById('login-password').value = VALID_USER_PASS;
}

function clearLoginForm() {
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-error-msg').style.display = 'none';
}

/* =====================================================
   NPTEL / Swayam — script.js
   Two-page navigation + accordion + sidebar resize
   ===================================================== */

/* ──────────────────────────────────────────────────
   PAGE NAVIGATION
   ────────────────────────────────────────────────── */

function goToOutline() {
  document.getElementById('page-login').classList.remove('active');
  document.getElementById('page-outline').classList.add('active');
  document.getElementById('page-progress').classList.remove('active');
  resetAccordions();
}

function goToProgress() {
  document.getElementById('page-login').classList.remove('active');
  document.getElementById('page-outline').classList.remove('active');
  document.getElementById('page-progress').classList.add('active');
}

/* ──────────────────────────────────────────────────
   SIDEBAR OUTLINE — Group toggle (Page 1)
   ────────────────────────────────────────────────── */

function toggleOL(headerEl) {
  var body    = headerEl.nextElementSibling;
  var chevron = headerEl.querySelector('.ol-chevron');

  if (body.classList.contains('open')) {
    body.classList.remove('open');
    headerEl.classList.remove('expanded');
    headerEl.classList.add('collapsed');
    if (chevron) {
      chevron.classList.remove('down');
      chevron.classList.add('right');
      chevron.innerHTML = '&#9654;';
    }
  } else {
    body.classList.add('open');
    headerEl.classList.add('expanded');
    headerEl.classList.remove('collapsed');
    if (chevron) {
      chevron.classList.add('down');
      chevron.classList.remove('right');
      chevron.innerHTML = '&#9660;';
    }
  }
}

/* ──────────────────────────────────────────────────
   SIDEBAR OUTLINE — Item selection (Page 1)
   ────────────────────────────────────────────────── */

function selectOLItem(el, label) {
  var allItems = document.querySelectorAll('#page-outline .ol-item');
  allItems.forEach(function(item) { item.classList.remove('active'); });
  el.classList.add('active');

  if (label) {
    var pill = document.getElementById('reading-pill-btn');
    var displayLabel = label.length > 30
      ? label.substring(0, 28) + '\u2026'
      : label;
    pill.textContent = 'Reading Material: ' + displayLabel;
  }
}

/* ──────────────────────────────────────────────────
   ACCORDION PANELS (Page 2 — Progress Report)
   ────────────────────────────────────────────────── */

function toggleAcc(panelId) {
  var panel  = document.getElementById(panelId);
  var header = panel.querySelector('.acc-header');
  var body   = panel.querySelector('.acc-body');
  var isOpen = header.getAttribute('aria-expanded') === 'true';

  if (isOpen) {
    header.setAttribute('aria-expanded', 'false');
    body.classList.remove('open');
  } else {
    header.setAttribute('aria-expanded', 'true');
    body.classList.add('open');
  }
}

function resetAccordions() {
  ['acc1', 'acc3'].forEach(function(id) {
    var panel = document.getElementById(id);
    if (!panel) return;
    panel.querySelector('.acc-header').setAttribute('aria-expanded', 'false');
    panel.querySelector('.acc-body').classList.remove('open');
  });
  var panel2 = document.getElementById('acc2');
  if (panel2) {
    panel2.querySelector('.acc-header').setAttribute('aria-expanded', 'true');
    panel2.querySelector('.acc-body').classList.add('open');
  }
}

/* ──────────────────────────────────────────────────
   SIDEBAR RESIZE
   ────────────────────────────────────────────────── */

function initResize(handleId) {
  var handle  = document.getElementById(handleId);
  var sidebar = handle ? handle.previousElementSibling : null;
  if (!handle || !sidebar) return;

  var dragging = false;
  var startX   = 0;
  var startW   = 0;

  handle.addEventListener('mousedown', function(e) {
    dragging = true;
    startX   = e.clientX;
    startW   = sidebar.offsetWidth;
    handle.classList.add('dragging');
    document.body.style.cursor     = 'col-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    var newW = Math.max(180, Math.min(440, startW + (e.clientX - startX)));
    sidebar.style.width = newW + 'px';
  });

  document.addEventListener('mouseup', function() {
    if (dragging) {
      dragging = false;
      handle.classList.remove('dragging');
      document.body.style.cursor     = '';
      document.body.style.userSelect = '';
    }
  });
}

/* ──────────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function() {
  goToOutline();
  initResize('rh1');
  initResize('rh2');
});
