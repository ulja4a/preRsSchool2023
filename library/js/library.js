(function () {
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.nav');
  const menuClose = document.querySelector('.nav__close');
  const menuItem = document.querySelectorAll('.nav-link');
  const menuIcon = document.querySelector('.icon__burger');

  

  burger.addEventListener('click', (e) => {
    menu.classList.add('nav_active');
  });
  menuClose.addEventListener('click', (e) => {
    menu.classList.remove('nav_active');
  });
  menuItem.forEach(item => {
    item.addEventListener('click', () => {
      menu.classList.remove('nav_active');
    });
  });
  document.onclick = function(event) {
    if (!menu.contains(event.target) && event.target !== burger && !menu.contains(event.target) && !menuClose.contains(event.target) && event.target !== menuIcon) {
      menu.classList.remove('nav_active');
    }
  }, { passive: true };
} ());