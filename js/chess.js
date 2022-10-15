"use strict";

import { playingField, statisticsFieldStart, statisticsFieldUl, closeModalWindow} from './left_menu.js';

export const chessPlayers = {
  players: []
};

export const chessTableOfPlayers = (obj) => {
  playingField.innerHTML = `
  <form class="form">
    <div class="wellcome__game">Начинаем новую игру!</div>
    <div>
      <span>Введите имена игроков через запятую (не менее двух):</span>
      <br>
      <input type="text" class="input__players" placeholder="Имена через запятую">
  </form>
  <div class="btn">Старт!</div>
  `;

  const startChess = document.querySelector('.btn');
  startChess.addEventListener('click', (even) => {
    even.preventDefault();

    const playersList = document.querySelector('.input__players');

    if (playersList.value.split(',').length < 2) {
      closeModalWindow(`
      <div>Вы ввели мало игроков! Требуется не менее двух, чтобы начать!</div>
      <div class="loss__btn">
      <div id="btn">Понятно!</div>
      </div>`);
    } else {
      playersList.value.split(',').forEach((item) => {
        const player = { name: item.trim(), score: 0 };
        obj.players.push(player);
      });

      playingField.innerHTML = '<div>Шахматы</div>';

      let table = document.createElement('table');
      table.classList.add('chess__table');
      playingField.appendChild(table);

      for (let i = 0; i < obj.players.length + 1; i++) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        for (let j = 0; j < obj.players.length + 1; j++) {
          let td = document.createElement('td');
          tr.appendChild(td);
          if (i === 0 & j > 0) {
            td.innerHTML = `${obj.players[j - 1].name}`;
          } if (i === 0 & j === 0) {
            td.innerHTML = 'Имя игрока';
          } if (i > 0 && j === 0) {
            td.innerHTML = `${obj.players[i - 1].name}`;
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
        if ((i + 1) % obj.players.length === 0) {
          arr.push(item);
          arrChesTableResult.push(arr);
          arr = arr.slice(arr.length);
        } else if ((i + 1) % obj.players.length !== 0) {
          arr.push(item);
        }
      });

      okBtn.forEach((item, i) => {
        item.addEventListener('click', (even) => {
          even.preventDefault();

          let inputScore = item.parentElement.firstElementChild.value;
          if (inputScore === '1' || inputScore === '0' || inputScore === '0.5') {
            item.parentElement.innerHTML = inputScore;

            for (let i = 0; i < obj.players.length; i++) {
              for (let j = 0; j < obj.players.length; j++) {
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

      let endGame = document.createElement('div');
      endGame.classList.add('btn');
      endGame.innerHTML = 'Закончить игру!';
      playingField.appendChild(endGame);

      endGame.addEventListener('click', (even) => {
        even.preventDefault();

        const dataLoss = document.createElement('div');
        const dataInLoss = document.createElement('div');
        dataLoss.classList.add('data__loss');
        dataInLoss.classList.add('data__in__loss');
        dataLoss.appendChild(dataInLoss);
        playingField.appendChild(dataLoss);
        dataInLoss.innerHTML = `
        <div>Вы уверены, что хотите закончить игру? Все незаполненные поля станут нулями!</div>
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
              chessTableResult.forEach((item) => {
                if (item.innerHTML.length > 3) {
                  item.innerHTML = '0';
                }
              });

              for (let i = 0; i < obj.players.length; i++) {
                for (let j = 0; j < obj.players.length; j++) {
                  if (arrChesTableResult[i][j].innerHTML === '1') {
                    obj.players[i].score += 1;
                  } if (arrChesTableResult[i][j].innerHTML === '0.5') {
                    obj.players[i].score += 0.5;
                  }
                }
              }

              const sortScore = [];
              const { players } = obj;
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

              for (let i = 0; i < obj.players.length + 1; i++) {
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
              endGame.remove();
              dataLoss.remove();

              statisticsFieldStart.remove();
              const liStatisticChessGame = document.createElement('li');
              liStatisticChessGame.classList.add('project__statistics-field-item');
              statisticsFieldUl.appendChild(liStatisticChessGame);

              const arrNamePlayers = [];
              for (let player of players) {
                arrNamePlayers.push(Object.values(player)[0]);
              }

              liStatisticChessGame.innerHTML = `
              Шахматы: ${arrNamePlayers.join(', ')}<br> -(${(new Date()).toISOString().slice(0,10)})
              `;

              liStatisticChessGame.addEventListener('click', (even) => {
                even.preventDefault();
                
                const copyTableGameResult = tableGameResult.cloneNode(true);

                const dataLoss = document.createElement('div');
                const dataInLoss = document.createElement('div');
                const close = document.createElement('div');
                const nameGame = document.createElement('div');
                close.classList.add('btn');
                close.innerHTML = 'Закрыть';
                nameGame.innerHTML = 'Шахматы<br>';
                dataLoss.classList.add('data__loss');
                dataInLoss.classList.add('result__game');
                dataInLoss.appendChild(nameGame);
                dataInLoss.appendChild(copyTableGameResult);
                dataLoss.appendChild(dataInLoss);
                playingField.appendChild(dataLoss);
                dataInLoss.appendChild(close);
                dataInLoss.querySelector('.btn').addEventListener('click', (even) => {
                  even.preventDefault();

                  dataLoss.remove();
                });
              });

              obj.players = [];
              obj.typeGame = [];
            } else {
              dataLoss.remove();
            }
          });
        });
      });
    }
  });
};


