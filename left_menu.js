"use strict";

const leftMenu = document.querySelectorAll('.project__left-menu-item'),
      playingField = document.querySelector('.project__playing-field'),
      statisticsField = document.querySelector('.project__statistics-field'),
      statisticsFieldItem = statisticsField.querySelectorAll('.project__statistics-field-item'),
      statisticsFieldStatus = statisticsField.querySelector('.project__statistics-field-status'),
      logoInfo = document.querySelector('.header__logo img');

const back = (item, data) => {
  item.addEventListener('click', (even) => {
    even.preventDefault();
    console.log('Done back');
  
    item.parentElement.innerHTML = data;
  });
};

logoInfo.addEventListener('click', (even) => {
  even.preventDefault();
  console.log('Click Logo');

  playingField.innerHTML = `
  <div>Тут будет информация о самом проекте и инструкция по его использованию!<br><br>А пока выбери игру!</div>
  <div class="btn">Назад</div>
  `;
  back(playingField.querySelector('.btn'), 'Привет!<br><br> Выбери игру или создай свою!');
});

leftMenu.forEach((item, i) => {
  item.addEventListener('click', (even) => {
    even.preventDefault();

    console.log('Done left menu');
    
    playingField.innerHTML = `
    <div>В разработке,но скоро будет готово!<br><br>А пока выбери другую игру!</div>
    <div class="btn">Назад</div>
    `;
    back(playingField.querySelector('.btn'), 'Привет!<br> Выбери игру или создай свою!');
  });
});

statisticsFieldItem.forEach((item, i) => {
  item.addEventListener('click', (even) => {
    even.preventDefault();

    console.log('Done statistics field');

    statisticsFieldStatus.innerHTML = `
    <div>Тут будет статистика по "${item.innerHTML}"</div>
    <div class="btn">Назад</div>
    `;

    back(statisticsField.querySelector('.btn'), 'Здесь будет отображена статистика');
  });
});
