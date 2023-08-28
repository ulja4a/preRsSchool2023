//console.log("Ваша оценка - 100 баллов\nОтзыв по пунктам ТЗ:\nВыполненные пункты:\n1) Вёрстка валидная.\n2) `header`, `main`, `footer`\n3) Шесть элементов `section` (по количеству секций)\n4) Только один заголовок `h1`. Если элементов `h1` на странице больше одного, считаем это ошибкой.\n5) Пять заголовков `h2` (легко отличимы на верхних границах секций, имеют единый стиль)\n6) Один элемент `nav` (панель навигации в хедере)\n7) Два списка ul > li > a (панель навигации, ссылки на соцсети в футере)\n8) Семь кнопок `button`\n9) Два инпута `input`\n10) Блок `header`\n11) Секция `Welcome`\n12) Секция `About`\n13) Секция `Favorites`\n14) Секция `CoffeShop`\n15) Секция `Contacts`\n16) Секция `LibraryCard`\n17) Блок `footer` - Адрес библиотеки должен быть ссылкой (место на карте, например).\n18) Для построения сетки используются флексы или гриды (display: flex... или display: grid...)\n19) При уменьшении масштаба страницы браузера вся вёрстка (контент и фоны) размещается по центру, а не сдвигается в сторону. Фон за рамками страницы может быть черным, белым или любого оттенка серого.\n20) Иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления\n21) Изображения добавлены в формате .jpg (.jpeg) или .png\n22) Есть favicon\n23) Плавная прокрутка по якорям\n24) В футере название ссылки Username заменено и ведет на GitHub студента\n25) В футере ссылка The Rolling Scopes School ведет на страницу курса \n26) Интерактивность элементов согласно макету. Интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты, например, изменение цвета фона или цвета шрифта. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета\n27) Обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияет на соседние элементы");
//Slider
/*let position = 0;
const slidesToScroll = 1;
const slidesContainer = document.querySelector('.about__slider');
const slidesTrack = document.querySelectorAll('.about__slider-track');
const pagination = document.querySelectorAll('.element__pagination');
const paginationCount = pagination.length;
const activeIndex = Array.from(pagination).findIndex(item => item.classList.contains('active'));



const prevCarret = document.querySelector('.carret_left');
const nextCarret = document.querySelector('.carret_right');

//const slides = Array.from(sliderColumns3.querySelectorAll('img'));*/




/*
let paginationIndex = 0;

pagination.forEach((page, index) => {
  page.addEventListener('click', () => {
    paginationIndex = index; // Обновите индекс пагинации
    slideIndex = paginationIndex * 3; // Обновите индекс слайдов
    console.log(paginationIndex);
    console.log(slideIndex);
    
    nextIndex = (paginationIndex + 1) % paginationCount;
    prevIndex = (paginationIndex - 1 + paginationCount) % paginationCount;
    nextElement = pagination[nextIndex];
    prevElement = pagination[prevIndex];
    updateSlider(); // Обновите слайдер с учетом нового индекса
  });
});

function showNextSlide() {
  if(slideIndex<slideCount-1) {
  slideIndex += 1;
  updateSlider();
  }
}

function updateSlider() {
  slides.forEach((slide, index) => {
    if (index >= slideIndex && index < slideIndex + 3) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

// Инициализация слайдера
updateSlider();*/
document.addEventListener('DOMContentLoaded', () => {


let sliderWrapper = document.querySelector('.about__slider');
const carusel = document.querySelector('.about__slider-track');
const firstImgWidth = carusel.querySelector('.about__img').offsetWidth;
const caruselChildren = [...carusel.children];
const pagination = document.querySelectorAll('.element__pagination');
const carretLeft = document.querySelector('.carret_left');
const carretRight = document.querySelector('.carret_right');

let slidesToShow = 3;
let position = 0;

updateCarretVisibility();
console.log(caruselChildren)
console.log(firstImgWidth)
rollSlider();
updatePagination();


function handleResize() {
  const sliderWrapperWidth = (firstImgWidth * slidesToShow) + ((slidesToShow - 1) * 25);

  if (window.innerWidth - 40 < sliderWrapperWidth) {
    slidesToShow = Math.max(slidesToShow - 1, 1);
    updatePagination(); // Обновление точек пагинации при изменении slidesToShow
    updateCarretVisibility();
    
  }

  sliderWrapper.style.width = (firstImgWidth * slidesToShow) + ((slidesToShow - 1) * 25) + 'px';
  rollSlider();
  //updateCarouselPosition();
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


window.addEventListener('resize', handleResize);

handleResize();

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
});

carretRight.addEventListener('click', () => {
  position ++;
  if (position >= caruselChildren.length) {
    position = caruselChildren.length;
    return false;
  }
  rollSlider();
  updateCarretVisibility();
});

function rollSlider() {
  carusel.style.transform = `translateX(-${position * (firstImgWidth * slidesToShow + 25)}px)`;
}

});
