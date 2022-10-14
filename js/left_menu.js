"use strict";

import { chessPlayers, chessTableOfPlayers } from './chess.js';

export const leftMenu = document.querySelectorAll('.project__left-menu-item'),
  body = document.querySelector('body'),
  playingField = document.querySelector('.project__playing-field'),
  startPlayingField = document.querySelector('.project__playing-field-welcome'),
  statisticsField = document.querySelector('.project__statistics-field'),
  statisticsFieldItem = statisticsField.querySelectorAll('.project__statistics-field-item'),
  statisticsFieldUl = statisticsField.querySelector('ul'),
  statisticsFieldStart = statisticsField.querySelector('.project__statistics-field-start'),
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

const gameSelection = (j) => {
  if (j === 0) {
    console.log('test');
    playingField.innerHTML = '';
    playingField.appendChild(startPlayingField);
  } else if (j === 1) {
    chessTableOfPlayers(chessPlayers);
  }
  else {
    playingField.innerHTML = `
      <div>В разработке, но скоро будет готово!<br><br>А пока выбери другую игру!</div>
      <div class="btn">Назад</div>
      `;
    back(playingField.querySelector('.btn'), 'Привет!<br><br> Выбери игру или создай свою!');
  }
};

const modalWindowDataLoss = () => {
  const dataLoss = document.createElement('div');
  const dataInLoss = document.createElement('div');
    dataLoss.classList.add('data__loss');
    dataInLoss.classList.add('data__in__loss');
    dataLoss.appendChild(dataInLoss);
    playingField.appendChild(dataLoss);
    dataInLoss.innerHTML = `
    <div>Вы уверены, что хотите уйти? Весь Ваш прогресс пропадёт!</div>
    <div class="loss__btn">
    <div id="btn">Да</div>
    <div id="btn">Нет</div>
    </div>
    `;
    const lossBtn = dataInLoss.querySelectorAll('#btn');
    lossBtn.forEach((item, i) => {
      item.addEventListener('click', (even) => {
        even.preventDefault();
  
        if (i === 0) {
          gameSelection(i);
          chessPlayers.players = [];
          chessPlayers.typeGame = [];
        } else {
          dataLoss.remove();
        }
      });
    }); 
};


export const clickLeftMenu = () => {
  leftMenu.forEach((item, j) => {
    item.addEventListener('click', (even) => {
      even.preventDefault();
      if (playingField.firstElementChild === startPlayingField) {
        gameSelection(j);
      } else {
        modalWindowDataLoss();
      }
    });
  });
};

statisticsFieldItem.forEach((item, i) => {
  item.addEventListener('click', (even) => {
    even.preventDefault();

    console.log(item);
  });
});

clickLeftMenu();
