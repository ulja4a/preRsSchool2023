document.addEventListener('DOMContentLoaded', () => {
  
 //Burger 
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.nav');
  const menuClose = document.querySelector('.nav__close');
  const menuItem = document.querySelectorAll('.nav-link');
  const menuIcon = document.querySelector('.icon');
  const iconProfile = document.querySelector('.icon');
  const menuProfile = document.querySelector('.menu_register');
  const register = document.querySelector('.regist');
  const popupRegister = document.querySelector('.popup_register');
  const popupRegisterMenu = document.querySelector('.popup_register-content')
  const popupClose = document.querySelector('.popup-close');
  const signUpCard = document.querySelector('.signup-card');
  const inputPopup = document.querySelectorAll('.input-popup');
  const registerBtn = document.querySelector('.register');

  (function () {
  burger.addEventListener('click', (e) => {
    console.log(1);
    menu.classList.add('nav_active');
  });
  menuClose.addEventListener('click', (e) => {
    menu.classList.remove('nav_active');
  });
  iconProfile.addEventListener('click', (e) => {
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



//Slider
let sliderWrapper = document.querySelector('.about__slider');
const carusel = document.querySelector('.about__slider-track');
const firstImgWidth = carusel.querySelector('.about__img').offsetWidth;
const caruselChildren = [...carusel.children];
const pagination = document.querySelectorAll('.element__pagination');
const carretLeft = document.querySelector('.carret_left');
const carretRight = document.querySelector('.carret_right');


let slidesToShow =3;
let position = 0;

updateCarretVisibility();
rollSlider();
//updatePagination();

// Перерассчитываем количество отображаемых слайдов при загрузке страницы
window.addEventListener('load', ()=> {
  let windowWidth = window.innerWidth;
  handleResize(windowWidth); // Вызываем функцию handleResize() при загрузке страницы
  updatePagination(); 
  updateCarretVisibility();
});
// Вызываем функцию handleResize() при изменении размера окна
window.addEventListener('resize', ()=> {
  let windowWidth = window.innerWidth;
  handleResize(windowWidth);
  updatePagination(); 
  updateCarretVisibility();
});

function handleResize(windowWidth) {
  let x = (windowWidth-40)/450;
  let y = ((x-1)*25);
  slidesToShow = Math.ceil(((windowWidth-40)-y)/450);
  let sliderWrapperWidth = (firstImgWidth * slidesToShow) + ((slidesToShow - 1) * 25);
  if (sliderWrapperWidth > (windowWidth - 40)) {
    slidesToShow = Math.max(slidesToShow - 1, 1);
    sliderWrapperWidth = (firstImgWidth * slidesToShow) + ((slidesToShow - 1) * 25);
    updatePagination(); // Обновление точек пагинации при изменении slidesToShow
    updateCarretVisibility();
  }
  sliderWrapper.style.width = (firstImgWidth * slidesToShow) + ((slidesToShow - 1) * 25) + 'px';
  position = Math.min(position, caruselChildren.length - slidesToShow);
  rollSlider();
}

function updatePagination() {
  // Сброс элементов пагинации в исходное состояние
  pagination.forEach(paginationElement => {
    paginationElement.style.display = 'none';
  });

  // Подсчет количества элементов пагинации в зависимости от количества slidesToShow
  const numPaginationElements = slidesToShow === 1 ? 5 : (slidesToShow === 2 ? 4 : 3);

  // Отображение необходимого количества элементов пагинации
  for (let i = 0; i < numPaginationElements; i++) {
    pagination[i].style.display = 'block';
  }
}

function updateCarretVisibility() {
  if (slidesToShow === 1 && position!==0 && position!==(caruselChildren.length - slidesToShow)) {
    carretLeft.style.display = 'block';
    carretRight.style.display = 'block';
  } else {
    if (slidesToShow === 1 && position === 0) {
      carretLeft.style.display = 'none';
      carretRight.style.display = 'block';
    } else if (slidesToShow === 1 && position === caruselChildren.length - slidesToShow) {
      carretLeft.style.display = 'block';
      carretRight.style.display = 'none';
    } else {
      carretLeft.style.display = 'none';
      carretRight.style.display = 'none';
    }
  }
}


carretLeft.addEventListener('click', () => {
  position --;
  if (position < 0) {
    position = 0;
  }
  rollSlider();
  updateCarretVisibility();
  paginationIndex(position);
});

carretRight.addEventListener('click', () => {
  position ++;
  if (position > caruselChildren.length - slidesToShow) {
    position = caruselChildren.length - slidesToShow;
    return false;
  }
  rollSlider();
  updateCarretVisibility();
  paginationIndex(position);
});

function rollSlider() {
  carusel.style.transform = `translateX(-${position * (firstImgWidth + 25)}px)`;
}

function paginationIndex(index) {
  pagination.forEach(item => item.classList.remove('active'));
  pagination[index].classList.add('active');
}

pagination.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    position = index * slidesToShow;
    rollSlider();
    updateCarretVisibility();
    paginationIndex(position);
  })
});

//Slider favorites
const cardBook = document.querySelectorAll('.card-book');
const seasonsButton = document.querySelectorAll('.radio_label');
const seasonsInput = document.querySelectorAll('.radio_input');

let currentSeasonIndex = 0;

updateCardVisibility(); // Показ нужніх карточек с книгами в соответствие с сезоном

seasonsButton.forEach((radioLabel, index) => {
    radioLabel.addEventListener('click', () => {
        currentSeasonIndex = index; // Обновляется индекс сезона
        updateCardVisibility(); // фннкция отображения карточек
    });
});

function updateCardVisibility() {
    const startIndex = currentSeasonIndex * 4;
    const endIndex = startIndex + 3;

    cardBook.forEach((card, index) => {
        if (index >= startIndex && index <= endIndex) {
            card.classList.remove('unvisible');
        } else {
            card.classList.add('unvisible');
        }
        seasonsInput[currentSeasonIndex].checked = true;
    });
};

// Функция для автоматического переключения с таймером
function autoSwitchSeason() {
  currentSeasonIndex++; // Увеличиваем индекс текущего сезона

  // Если индекс выходит за пределы доступных сезонов, сбрасываем его
  if (currentSeasonIndex >= seasonsButton.length) {
      currentSeasonIndex = 0;
  }

  // Затемняем текущий слайд и плавно показываем следующий слайд
  cardBook.forEach((card, index) => {
      card.classList.add('fadeOut'); // Применяем CSS-класс для затемнения
      setTimeout(() => {
          card.classList.remove('fadeOut'); // Удаляем CSS-класс затемнения
          updateCardVisibility(); // Обновляем видимость слайдов
      }, 1000); 
  });
}

let timer = setInterval(autoSwitchSeason, 5000); // Запускаем автоматическое переключение через таймер


// Меню авторизации
iconProfile.addEventListener('click', ()=> {
  menuProfile.classList.toggle('menu-visable');
  if (!menu.classList.contains('nav_active')) {
    menu.classList.remove('nav_active');
  }
})

document.addEventListener('click', (event) => {
  if (!menuProfile.classList.contains('menu-visable') && !iconProfile.contains(event.target) && !register.contains(event.target)) {
    menuProfile.classList.add('menu-visable');
  }
});

//Меню регистрации
register.addEventListener('click', ()=> {
  popupRegister.classList.remove('hidden');
  if (!menuProfile.classList.contains('menu-visable')) {
    menuProfile.classList.add('menu-visable');
  }
  
});

popupClose.addEventListener('click', (e) => {
  popupRegister.classList.add('hidden');
});

popupRegister.addEventListener('click', (e) => {
  if (e.target === popupRegister) {
    popupRegister.classList.add('hidden');
  }
});

signUpCard.addEventListener('click', ()=> {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'})
  popupRegister.classList.remove('hidden');
});

//Валидация при регистрации
registerBtn.addEventListener('click', ()=> {
  let valid = true;
  inputPopup.forEach((inputPopup)=> {
    if (!inputPopup.value) {
      valid = false;
    }
  });
    if (password.value.length < 8) {
      valid = false;
    }
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.value)) {
      valid = false;
    }
    if (!valid) {
      alert('Пожалуйста, заполните все поля правильно!');
      return;
    }
  });
  


});