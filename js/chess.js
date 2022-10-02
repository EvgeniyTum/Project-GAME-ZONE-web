"use strict";

import { playingField } from './left_menu.js';

export const chessPlayers = {
  players: [],
  typeGame: []
};

export const chessTableOfPlayers = (obj) => {
  console.log('Done');
  playingField.innerHTML = `
  <form class="form">
    <div class="wellcome__game">Начинаем новую игру!</div>
    <div>
      <span>Введите имена игроков через запятую (не менее двух):</span>
      <br>
      <input type="text" class="input__players" placeholder="Имена через запятую">
    </div>
    <div>
      <input type="radio" name="game"> Турнир
      <input type="radio" name="game"> Обычная игра
    </div>
  </form>
  <div class="btn">Старт!</div>
  `;

  const startChess = document.querySelector('.btn');
  startChess.addEventListener('click', (even) => {
    even.preventDefault();

    const playersList = document.querySelector('.input__players');
    playersList.value.split(',').forEach((item, i) => {
      item.trim();
      const player = {player: item, score: 0};
      chessPlayers.players.push(player);
    });
    
    console.log(chessPlayers);

    playingField.innerHTML = `<div>Мы работаем над этим =)</div>`;
  });
};



