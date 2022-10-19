"use strict";

import { chessPlayers, chessTableOfPlayers } from './chess.js';
import { mafiaPlayers, startMafiaGame } from './mafia.js';
import { splendourPlayers, startSplendourGame } from './splendour.js';
import { citadelsPlayers, startCitadelsGame } from './citadels.js';
import { industryPlayers, startIndustryGame } from './industry.js';



export const leftMenu = document.querySelectorAll('.project__left-menu-item'),
  body = document.querySelector('body'),
  playingField = document.querySelector('.project__playing-field'),
  startPlayingField = document.querySelector('.project__playing-field-welcome'),
  statisticsField = document.querySelector('.project__statistics-field'),
  statisticsFieldItem = statisticsField.querySelectorAll('.project__statistics-field-item'),
  statisticsFieldUl = statisticsField.querySelector('ul'),
  statisticsFieldStart = statisticsField.querySelector('.project__statistics-field-start'),
  logoInfo = document.querySelector('.header__logo img'),
  deleteBtn = document.querySelectorAll('.delete');


export const closeModalWindow = (str) => {
  const dataLoss = document.createElement('div');
  const dataInLoss = document.createElement('div');
  dataLoss.classList.add('data__loss');
  dataInLoss.classList.add('data__in__loss');
  dataLoss.appendChild(dataInLoss);
  playingField.appendChild(dataLoss);
  dataInLoss.innerHTML = str;
  document.querySelector('#btn').addEventListener('click', (even) => {
    even.preventDefault();

    dataLoss.remove();
  });
};

export const infoModalWindow = (str, inStr, parent) => {
  const info = document.createElement('div');
  parent.appendChild(info);
  info.classList.add('btn__info');
  info.innerHTML = str;
  info.addEventListener('click', (even) => {
    closeModalWindow(inStr);
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

const back = (item, data) => {
  item.addEventListener('click', (even) => {
    even.preventDefault();
    console.log('Done back');

    item.parentElement.innerHTML = data;
  });
};

const gameSelection = (j) => {
  if (j === 0) {
    playingField.innerHTML = '';
    playingField.appendChild(startPlayingField);
  } else if (j === 1) {
    chessTableOfPlayers(chessPlayers);
  } else if (j === 2) {
    startSplendourGame(splendourPlayers);
  } else if (j === 3) {
    startMafiaGame(mafiaPlayers);
  } else if (j === 4) {
    startCitadelsGame(citadelsPlayers);
  } else if (j === 5) {
    startIndustryGame(industryPlayers);
  }
  else {
    playingField.innerHTML = `
      <div>В разработке, но скоро будет готово!<br><br>А пока выбери другую игру!</div>
      <div class="btn">Назад</div>
      `;
    back(playingField.querySelector('.btn'), 'Привет!<br><br> Выбери игру или создай свою!');
  }
};

const modalWindowDataLoss = (j) => {
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
        gameSelection(j);
        chessPlayers.players = [];
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
        modalWindowDataLoss(j);
      }
    });
  });
};



clickLeftMenu();
