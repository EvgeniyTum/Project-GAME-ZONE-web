"use strict";

import { playingField } from './left_menu.js';

export const chessPlayers = {
  players: [],
  typeGame: []
};

export const chessTableOfPlayers = (obj) => {
  playingField.innerHTML = `
  <form class="form">
    <div class="wellcome__game">Начинаем новую игру!</div>
    <div>
      <span>Введите имена игроков через запятую (не менее двух):</span>
      <br>
      <input type="text" class="input__players" placeholder="Имена через запятую">
    </div>
    <div class="checkbox__type">
      <input class="type__game" type="radio" name="game">
      <div>Турнир</div>
      <input class="type__game" type="radio" name="game">
      <div>Обычная игра</div>
    </div>
  </form>
  <div class="btn">Старт!</div>
  `;

  const startChess = document.querySelector('.btn');
  startChess.addEventListener('click', (even) => {
    even.preventDefault();

    const playersList = document.querySelector('.input__players');
    const typeGame = document.querySelector('.type__game');

    playersList.value.split(',').forEach((item) => {
      const player = { name: item.trim(), score: 0 };
      chessPlayers.players.push(player);
    });

    if (typeGame.checked) {
      chessPlayers.typeGame.push('Турнир');
    } else {
      chessPlayers.typeGame.push("Обычная игра");
    }

    playingField.innerHTML = '';

    let table = document.createElement('table');
    table.classList.add('chess__table');
    playingField.appendChild(table);

    for (let i = 0; i < chessPlayers.players.length + 1; i++) {
      let tr = document.createElement('tr');
      table.appendChild(tr);
      for (let j = 0; j < chessPlayers.players.length + 1; j++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        if (i === 0 & j > 0) {
          td.innerHTML = `${chessPlayers.players[j - 1].name}`;
        } if (i === 0 & j === 0) {
          td.innerHTML = 'Имя игрока';
        } if (i > 0 && j === 0) {
          td.innerHTML = `${chessPlayers.players[i - 1].name}`;
        } if (i === j && i > 0) {
          td.classList.add('chess__table-result');
          td.style.cssText = `background: grey`;
        } else if (i !== j && i > 0 && j > 0) {
          td.classList.add('chess__table-result');
          td.innerHTML = `
          <input type="number" min="0" max="1" step="0.5">
          <button class="ok">ok</button>
          `;
        }
      }
    }

    const chessTableResult = document.querySelectorAll('.chess__table-result');
    const okBtn = document.querySelectorAll('.ok');

    let arrChesTableResult = [];
    let arr = [];
    chessTableResult.forEach((item, i) => {
      if ((i + 1) % chessPlayers.players.length === 0) {
        arr.push(item);
        arrChesTableResult.push(arr);
        arr = arr.slice(arr.length);
      } else if ((i + 1) % chessPlayers.players.length !== 0) {
        arr.push(item);
      }
    });

    okBtn.forEach((item, i) => {
      item.addEventListener('click', (even) => {
        even.preventDefault();

        let inputScore = item.parentElement.firstElementChild.value;
        if (inputScore === '1' || inputScore === '0' || inputScore === '0.5') {
          item.parentElement.innerHTML = inputScore;

          for (let i = 0; i < chessPlayers.players.length; i++) {
            for (let j = 0; j < chessPlayers.players.length; j++) {
              if (arrChesTableResult[i][j].innerHTML === '1') {
                arrChesTableResult[j][i].innerHTML = '0';
              } if (arrChesTableResult[i][j].innerHTML === '0') {
                arrChesTableResult[j][i].innerHTML = '1';
              } if (arrChesTableResult[i][j].innerHTML === '0.5') {
                arrChesTableResult[j][i].innerHTML = '0.5';
              }
            }
          }
        }
      });
    });

    let chessTableInfo = document.createElement('div');
    playingField.appendChild(chessTableInfo);
    chessTableInfo.style.cssText = `
      text-align: left;
      margin-top: 10px;
      font-size: 10px;
    `;
    chessTableInfo.innerHTML = `
      <div>Строка - кто играет!</div>
      <div>Столбец - с кем играет!</div>
      <div>Победа - поставь 1</div>
      <div>Поражение - поставь 0</div>
      <div>Ничья - поставь 0,5</div>
    `;

    let endGameChess = document.createElement('div');
    endGameChess.classList.add('btn');
    endGameChess.innerHTML = 'Закончить игру!';
    playingField.appendChild(endGameChess);

    endGameChess.addEventListener('click', (even) => {
      even.preventDefault();

      chessTableResult.forEach((item) => {
        if (item.innerHTML.length > 3) {
          item.innerHTML = '0';
        }
      });

      for (let i = 0; i < chessPlayers.players.length; i++) {
        for (let j = 0; j < chessPlayers.players.length; j++) {
          if (arrChesTableResult[i][j].innerHTML === '1') {
            chessPlayers.players[i].score += 1;
          } if (arrChesTableResult[i][j].innerHTML === '0.5') {
            chessPlayers.players[i].score += 0.5;
          }
        }
      }

      const sortScore = [];
      const { players } = chessPlayers;
      for (let player of players) {
        sortScore.push(Object.values(player));

      }

      sortScore.sort((function (index) {
        return function (a, b) {
          return (a[index] === b[index] ? 0 : (a[index] < b[index] ? 1 : -1));
        };
      })(1));

      let tableGameResult = document.createElement('table');
      tableGameResult.classList.add('chess__table');

      for (let i = 0; i < chessPlayers.players.length + 1; i++) {
        let tr = document.createElement('tr');
        tableGameResult.appendChild(tr);
        for (let j = 0; j < 3; j++) {
          let td = document.createElement('td');
          tr.appendChild(td);
          if (i === 0 & j === 0) {
            td.innerHTML = `Место`;
          } if (i === 0 & j === 1) {
            td.innerHTML = `Имя`;
          } if (i === 0 & j === 2) {
            td.innerHTML = `Счет`;
          } if (i > 0 & j === 0) {
            td.innerHTML = `${i} место`;
          } if (i > 0 & j === 1) {
            td.innerHTML = `${sortScore[i - 1][0]}`;
          } if (i > 0 & j === 2) {
            td.innerHTML = `${sortScore[i - 1][1]}`;
          }
        }
      }
      playingField.appendChild(tableGameResult);
      console.log(tableGameResult.previousElementSibling);
      tableGameResult.previousElementSibling.remove();
      
      chessPlayers.players = [];
      chessPlayers.typeGame = [];
    });
  });
};


