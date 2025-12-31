// CJH博客主页专属JS | 左上角折叠菜单修复 | 三大模块面板控制 | 导航高亮 | 无冗余逻辑
const menuToggle = document.getElementById('menuToggle');
const menuPanel = document.getElementById('menuPanel');
const navContainer = document.querySelector('.nav-container');
const navLinks = document.querySelectorAll('.nav-link');
const navMenu = document.getElementById('navMenu');
const panelLinks = document.querySelectorAll('.panel-link'); // 折叠面板三大模块链接
const sections = document.querySelectorAll('section');

// DOM加载完成执行，不阻塞渲染
document.addEventListener('DOMContentLoaded', () => {
  initMenuPanel(); // 核心：初始化左上角折叠菜单面板
  initNavActive(); // 导航高亮跟随
  initNavScroll(); // 导航滚动渐变
});

/** 核心修复：左上角折叠菜单面板逻辑（点击展开/收起+图标切换+锚点收菜单） */
function initMenuPanel() {
  // 1. 点击菜单按钮，切换面板显示/隐藏 + 图标切换（汉堡 ↔ 叉号）
  menuToggle.addEventListener('click', () => {
    menuPanel.classList.toggle('show');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });

  // 2. 点击面板内三大模块链接，自动收起菜单 + 跳转对应板块（核心体验优化）
  panelLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuPanel.classList.remove('show');
      menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
    });
  });

  // 3. 点击页面空白处，自动收起菜单（可选优化，防止面板一直展开）
  document.addEventListener('click', (e) => {
    if(!menuToggle.contains(e.target) && !menuPanel.contains(e.target)) {
      menuPanel.classList.remove('show');
      menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
    }
  });
}

/** 原有逻辑：导航高亮跟随滚动，适配三大板块，无改动 */
function initNavActive() {
  window.addEventListener('scroll', () => {
    let currentId = '';
    const navHeight = navMenu.offsetHeight;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 40;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === currentId) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/** 原有逻辑：导航滚动渐变，无改动 */
function initNavScroll() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navMenu.style.backgroundColor = 'var(--bg-nav-scroll)';
      navMenu.style.backdropFilter = 'blur(15px)';
    } else {
      navMenu.style.backgroundColor = 'var(--bg-nav)';
      navMenu.style.backdropFilter = 'blur(12px)';
    }
  }, { passive: true });
}

// 页面卸载清理状态，避免内存泄漏
window.addEventListener('beforeunload', () => {
  menuPanel.classList.remove('show');
});
