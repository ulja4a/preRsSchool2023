document.addEventListener('DOMContentLoaded', () => {
  
 //Burger 
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.nav');
  const menuClose = document.querySelector('.nav__close');
  const menuItem = document.querySelectorAll('.nav-link');
  const menuIcon = document.querySelector('.icon__burger');

  (function () {
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
updatePagination();

window.addEventListener('resize', handleResize, { passive: true });

function handleResize() {
  let sliderWrapperWidth = (firstImgWidth * slidesToShow) + ((slidesToShow - 1) * 25);

  if (window.innerWidth - 40 < sliderWrapperWidth) {
    slidesToShow = Math.max(slidesToShow - 1, 1);
    sliderWrapperWidth = (firstImgWidth * slidesToShow) + ((slidesToShow - 1) * 25);
  }

  sliderWrapper.style.width = (firstImgWidth * slidesToShow) + ((slidesToShow - 1) * 25) + 'px';
  position = Math.min(position, caruselChildren.length - slidesToShow);
  updatePagination(); // Обновление точек пагинации при изменении slidesToShow
  updateCarretVisibility();
  rollSlider();
}

handleResize();

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
  if (slidesToShow === 1) {
    carretLeft.style.display = 'block';
    carretRight.style.display = 'block';
  } else {
    carretLeft.style.display = 'none';
    carretRight.style.display = 'none';
  }
}


carretLeft.addEventListener('click', () => {
  position --;
  if (position < 0) {
    position = 0;
    return false;
  }
  rollSlider();
  updateCarretVisibility();
  paginationIndex(position);
});

carretRight.addEventListener('click', () => {
  position ++;
  if (position >= caruselChildren.length) {
    position = caruselChildren.length;
    carretRight.style.display = 'none';
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
    position = index;
    rollSlider();
    paginationIndex(position);
  })
});

//Slider favorites
const cardBook = document.querySelectorAll('.card-book');
const seasonsButton = document.querySelectorAll('.radio_label');
const seasonsInput = document.querySelectorAll('.radio_input');

console.log(seasonsButton);

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


});