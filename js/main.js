/* Zenith 官网 — 共享交互脚本 */
(function () {
  'use strict';

  /* 移动端导航 */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  /* 当前导航高亮 */
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });

  /* 滚动渐入 */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* 数字滚动计数 */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var dur = 1400, start = null;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = prefix + val.toLocaleString('en-US') + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target.toLocaleString('en-US') + suffix;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('.count-up');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* 文档页目录滚动高亮 */
  var tocLinks = document.querySelectorAll('.toc a');
  var headings = tocLinks.length ? document.querySelectorAll('.doc-body h2[id]') : null;
  if (headings && headings.length && 'IntersectionObserver' in window) {
    var setActive = function (id) {
      tocLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
    };
    var hio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) setActive(en.target.id);
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    headings.forEach(function (h) { hio.observe(h); });
  }

  /* 终端打字机效果 */
  var typer = document.querySelector('[data-type]');
  if (typer) {
    var full = typer.getAttribute('data-type');
    var i = 0;
    typer.textContent = '';
    function type() {
      if (i <= full.length) {
        typer.textContent = full.slice(0, i);
        i++;
        setTimeout(type, 14);
      } else {
        typer.textContent = full;
      }
    }
    setTimeout(type, 500);
  }
})();