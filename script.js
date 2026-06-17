(function () {
  "use strict";

  /* ── Header scroll state ───────────────────────────────────── */
  var header = document.getElementById('site-header');

  function updateHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ── Scroll reveal ─────────────────────────────────────────── */
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('in-view');
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ── Tabs ──────────────────────────────────────────────────── */
  var tabs       = Array.from(document.querySelectorAll('[data-tab-target]'));
  var panels     = Array.from(document.querySelectorAll('[data-tab-panel]'));
  var tabsList   = document.getElementById('tabs-list');
  var panelsWrap = document.getElementById('tab-panels-wrap');

  var AUTO_INTERVAL = 5400;
  var autoTimer = null;

  function activateTab(tab, fromAuto) {
    var target = tab.dataset.tabTarget;

    tabs.forEach(function (item) {
      var active = item === tab;
      item.classList.toggle('is-active', active);
      item.classList.remove('is-auto');
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });

    panels.forEach(function (panel) {
      var active = panel.dataset.tabPanel === target;
      panel.classList.toggle('is-active', active);
      panel.setAttribute('aria-hidden', String(!active));
    });

    if (fromAuto) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          tab.classList.add('is-auto');
        });
      });
    }
  }

  function nextTab() {
    var currentIndex = tabs.findIndex(function (t) {
      return t.classList.contains('is-active');
    });
    activateTab(tabs[(currentIndex + 1) % tabs.length], true);
  }

  function stopAuto() {
    clearInterval(autoTimer);
    autoTimer = null;
    tabs.forEach(function (t) { t.classList.remove('is-auto'); });
  }

  function startAuto() {
    stopAuto();
    // Show progress on the currently active tab
    var active = tabs.find(function (t) { return t.classList.contains('is-active'); });
    if (active) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (active.classList.contains('is-active')) active.classList.add('is-auto');
        });
      });
    }
    autoTimer = setInterval(nextTab, AUTO_INTERVAL);
  }

  // Click / keyboard on tabs
  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      stopAuto();
      activateTab(tab, false);
      setTimeout(startAuto, 9000);
    });

    tab.addEventListener('keydown', function (event) {
      var last = tabs.length - 1;
      var next = index;

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
      if (event.key === 'ArrowUp'   || event.key === 'ArrowLeft')  next = index === 0 ? last : index - 1;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End')  next = last;

      if (next !== index) {
        event.preventDefault();
        tabs[next].focus();
        stopAuto();
        activateTab(tabs[next], false);
        setTimeout(startAuto, 9000);
      }
    });
  });

  // Pause auto-rotate on hover (tabs or panels)
  [tabsList, panelsWrap].forEach(function (el) {
    if (!el) return;
    el.addEventListener('mouseenter', stopAuto);
    el.addEventListener('mouseleave', startAuto);
  });

  if (!reducedMotion) startAuto();

  /* ── Smooth scroll ─────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

})();
