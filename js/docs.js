/* Zenith 官网 — 文档侧边栏组件
   通过 body[data-doc] 标识当前文档，统一渲染共享侧边栏导航。 */
(function () {
  'use strict';

  var current = document.body.getAttribute('data-doc') || 'index';
  var container = document.getElementById('doc-sidebar');

  /* 父级 docs.html 位于 html/，子教程页位于 html/docs/。
     根据当前位置选择前缀，避免子页出现 docs/docs/ 嵌套。 */
  var inSubfolder = current !== 'index';
  var prefix = inSubfolder ? '' : 'docs/';
  var indexHref = inSubfolder ? '../docs.html' : 'docs.html';

  var DOCS = [
    { id: 'index',      title: '文档总览', href: indexHref },
    { id: 'quickstart', title: '快速开始', href: prefix + 'quickstart.html' },
    { id: 'architecture', title: '架构分层', href: prefix + 'architecture.html' },
    { id: 'features',   title: 'Feature 矩阵', href: prefix + 'features.html' },
    { id: 'web',        title: 'Web 框架指南', href: prefix + 'web.html' },
    { id: 'http',       title: '协议实现', href: prefix + 'http.html' },
    { id: 'security',   title: '安全管道', href: prefix + 'security.html' },
    { id: 'hotreload',  title: '运行时热更新', href: prefix + 'hot-reload.html' },
    { id: 'deploy',     title: '部署与降级', href: prefix + 'deploy.html' },
  ];

  if (!container) return;

  var html = '<nav class="doc-sidebar"><div class="doc-sidebar-head">教程</div><ul class="doc-sidebar-list">';
  DOCS.forEach(function (d) {
    var active = d.id === current ? ' active' : '';
    html += '<li><a class="doc-sidebar-link' + active + '" href="' + d.href + '">' + d.title + '</a></li>';
  });
  html += '</ul></nav>';
  container.innerHTML = html;

  /* 当前页目录（TOC）——由每页 .doc-toc 容器填充 */
  var tocBox = document.getElementById('doc-toc');
  if (tocBox) {
    var headings = document.querySelectorAll('.doc-body h2[id]');
    if (headings.length) {
      var toc = '<div class="doc-toc-inner"><div class="doc-toc-title">本页目录</div><ul>';
      headings.forEach(function (h) {
        toc += '<li><a href="#' + h.id + '">' + h.textContent + '</a></li>';
      });
      toc += '</ul></div>';
      tocBox.innerHTML = toc;
      /* 滚动高亮 */
      var links = tocBox.querySelectorAll('a');
      if ('IntersectionObserver' in window) {
        var setAct = function (id) {
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
        };
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) setAct(e.target.id); });
        }, { rootMargin: '-15% 0px -70% 0px' });
        headings.forEach(function (h) { io.observe(h); });
      }
    }
  }
})();