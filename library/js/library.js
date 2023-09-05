document.addEventListener('DOMContentLoaded', () => {
  
 //Burger 
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.nav');
  const menuClose = document.querySelector('.nav__close');
  const menuItem = document.querySelectorAll('.nav-link');
  //const menuIcon = document.querySelector('.icon');
  const navIcon = document.querySelector('.nav-icon');
  const logReg = document.querySelector('.log-reg');
  const iconProfile = document.querySelector('.icon');
  const menuProfile = document.querySelector('.menu_register');
  const menuLogout = document.querySelector('.menu_logout');
  const register = document.querySelector('.regist');
  const login = document.querySelector('.login');
  const logout = document.querySelector('.logout');
  const titleLogoutElement = document.querySelector('.title_logout');
  const popupRegister = document.querySelector('.popup_register');
  const popupLogin = document.querySelector('.popup_login');
  const popupRegisterMenu = document.querySelector('.popup_register-content');
  const popupClose = document.querySelector('.popup-close');
  const popupLoginClose = document.querySelector('.popup_login-close');
  const signUpCard = document.querySelector('.signup-card');
  const logInCard = document.querySelector('.login-card');
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
    if (!menu.contains(event.target) && event.target !== burger && !menu.contains(event.target) && !menuClose.contains(event.target) && event.target !== iconProfile) {
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
/*//-----------------------------------------------

//Генерируем случайній 9-ый номер 
function generateCardNumber() {
  const min = 0x100000000;
  const max = 0xFFFFFFFFF;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; 
  return randomNumber.toString(16).toUpperCase();
}

// Функция для регистрации нового пользователя
function registerUser() {
  const firstName = document.querySelector('#first-name').value;
  const lastName = document.querySelector('#last-name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  
  // Функция для проверки валидности email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Валидация данных
if (!firstName || !lastName || !email || password.length < 8 || !isValidEmail(email)) {
  alert('Пожалуйста, заполните все поля правильно!');
  return;
}
  // Создаем объект с данными юзера
  const currentUserData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };
  const cardNumber = generateCardNumber();
  currentUserData.cardNumber = cardNumber;

  const currentUserDataJSON = JSON.stringify(currentUserData);
  localStorage.setItem('currentUserData', currentUserDataJSON);

  alert('Регистрация прошла успешно!');

  // Обновляем элементы на странице
  const firstNameLetter = firstName[0].toUpperCase();
  const lastNameLetter = lastName[0].toUpperCase();
  const iconUser = document.createElement('div');
  iconUser.classList.add('icon-user');
  iconUser.textContent = firstNameLetter + lastNameLetter;
  iconUser.title = `${firstName} ${lastName}`;
  logReg.appendChild(iconUser);
  iconProfile.classList.add('hidden');
  iconUser.style.opacity = '1';
  menuLogout.classList.remove('menu-visable');


registerBtn.addEventListener('click', registerUser);
registerBtn.addEventListener('click', ()=> {
  let valid = true;
  inputPopup.forEach((inputPopup)=> {
    if (!inputPopup.value) {
      valid = false;
    }
  });
});
// Проверяем, есть ли уже данные пользователя в Local Storage
//const currentUserDataJSON = localStorage.getItem('currentUserData');
if (currentUserDataJSON) {
  const currentUserData = JSON.parse(currentUserDataJSON);
  const firstName = currentUserData.firstName;
  const lastName = currentUserData.lastName;

  // Обновляем элементы на странице
  const firstNameLetter = firstName[0].toUpperCase();
  const lastNameLetter = lastName[0].toUpperCase();
  const iconUser = document.createElement('div');
  iconUser.classList.add('icon-user');
  iconUser.textContent = firstNameLetter + lastNameLetter;
  iconUser.title = `${firstName} ${lastName}`;
  logReg.appendChild(iconUser);
  iconProfile.classList.add('hidden');
  iconUser.style.opacity = '1';
  menuLogout.classList.remove('menu-visable');

}


//Меню регистрации
register.addEventListener('click', ()=> {
  console.log(22);
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

//Меню зарегестрированого пользователя
iconUser.addEventListener('click', ()=> {
  menuLogout.classList.toggle('menu-visable');
  if (!menu.classList.contains('nav_active')) {
    menu.classList.remove('nav_active');
  }
});

document.addEventListener('click', (event) => {
  if (!menuLogout.classList.contains('menu-visable') && !iconUser.contains(event.target) && !logout.contains(event.target)) {
    menuLogout.classList.add('menu-visable');
  }
});
}*/
//--------------------------------------------
//Меню регистрации
register.addEventListener('click', ()=> {
  console.log(22);
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
    if (valid) {
      alert('Регистрация прошла успешно!');

      //Создаем объект с данными юзера
      const carrentUserData = {
        firstName: document.querySelector('#first-name').value,
        lastName: document.querySelector('#last-name').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
      };
      console.log(carrentUserData);
      // Преобразуем объект в JSON
      let carrentUserDataJSON = JSON.stringify(carrentUserData);
    
      // Сохраняем данные в Local Storage
      localStorage.setItem('carrentUserData', carrentUserDataJSON);
      console.log(carrentUserData);

      popupRegister.classList.add('hidden');
    }
  });
  //Достаем данные из Local Storage
  let carrentUserDataJSON = localStorage.getItem('carrentUserData');
  let carrentUserData = JSON.parse(carrentUserDataJSON);
console.log(carrentUserData);
  // Получите значения first name и last name
  let firstname = carrentUserData.firstName;
  console.log(firstname);
  let lastname = carrentUserData.lastName;
  let firstNameLetter = carrentUserData.firstName[0].toUpperCase();
  let lastNameLetter = carrentUserData.lastName[0].toUpperCase();
  let iconUser = document.createElement('div');
  iconUser.classList.add('icon-user');
  iconUser.textContent = firstNameLetter + lastNameLetter;
  iconUser.title = `${firstname} ${lastname}`;
  console.log(iconUser);
  logReg.appendChild(iconUser);
  iconProfile.classList.add('hidden');
  iconUser.style.opacity = '1';

  //Меню зарегестрированого пользователя
iconUser.addEventListener('click', ()=> {
  menuLogout.classList.toggle('menu-visable');
  if (!menu.classList.contains('nav_active')) {
    menu.classList.remove('nav_active');
  }
});

document.addEventListener('click', (event) => {
  if (!menuLogout.classList.contains('menu-visable') && !iconUser.contains(event.target) && !logout.contains(event.target)) {
    menuLogout.classList.add('menu-visable');
  }
});

//Генерируем случайній номер карты и записываем его в Local Storage
function generateCardNumber() {
  const min = 0x100000000;
  const max = 0xFFFFFFFFF;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; 
  return randomNumber.toString(16).toUpperCase();
}
const carrentCardNumber = generateCardNumber();
console.log(carrentCardNumber);
carrentUserData.carrentCardnumber = carrentCardNumber;
const updatedCarrentUserDataJSON = JSON.stringify(carrentUserData);
localStorage.setItem('carrentUserData', updatedCarrentUserDataJSON);
titleLogoutElement.textContent = carrentCardNumber;

//Выход LogOut
logout.addEventListener('click', () => {
  console.log(555);
  valid = false;
  menuLogout.classList.add('menu-visable');
  iconUser.classList.toggle('hidden');
  iconProfile.classList.toggle('hidden');
});

//Залогиниться
login.addEventListener('click', ()=> {
  console.log(33);
  popupLogin.classList.remove('hidden');
  if (!menuProfile.classList.contains('menu-visable')) {
    menuProfile.classList.add('menu-visable');
  }
  
});
popupLoginClose.addEventListener('click', (e) => {
  popupLogin.classList.add('hidden');
});

popupLogin.addEventListener('click', (e) => {
  if (e.target === popupLogin) {
    popupLogin.classList.add('hidden');
  }
});

logInCard.addEventListener('click', ()=> {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'})
  popupLogin.classList.remove('hidden');
});


});