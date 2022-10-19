"use strict";

import { playingField,
   statisticsFieldStart, statisticsFieldUl, closeModalWindow, infoModalWindow } from './left_menu.js';

export const industryPlayers = {
  players: []
};

export const startIndustryGame = (obj) => {
  playingField.innerHTML = `
  <form class="form">
    <div class="wellcome__game">Начинаем новую игру в Индустрию!</div>
    <div>
      <span>Введите имена игроков через запятую (2 - 4 игрока):</span>
      <br>
      <input type="text" class="input__players" placeholder="Имена через запятую">
  </form>
  <div class="btn">Старт!</div>
  `;

  const start = document.querySelector('.btn');
  start.addEventListener('click', (even) => {
    even.preventDefault();

    const playersList = document.querySelector('.input__players');

    if (playersList.value.split(',').length < 2 || playersList.value.split(',').length > 4) {
      closeModalWindow(`<div>Требуется от двух до четырёх игроков, чтобы начать!</div>
        <div class="loss__btn">
        <div id="btn">Понятно!</div>
        </div>`);
    } else {

      playersList.value.split(',').forEach((item) => {
        const player = { name: item.trim(), score: 0, scoreRound: 0 };
        obj.players.push(player);
      });

      playingField.innerHTML = `<div>Индустрия</div><br>
        <div>Не знаешь, как пользоваться таблицей?</div>
      `;

      infoModalWindow(`<div>Жми INFO</div>`, `<div>Тут будет описание, как пользоваться таблицей!</div>
      <div class="loss__btn">
      <div id="btn">Понятно!</div>
      </div>`, playingField);

      let table = document.createElement('table');
      for (let i = 0; i < 2; i++) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        for (let j = 0; j < obj.players.length + 2; j++) {
          let td = document.createElement('td');
          tr.appendChild(td);
          if (i === 0 && j === 0) {
            td.innerHTML = '';
          } if (i === 0 && j > 0 && j < obj.players.length + 1) {
            td.innerHTML = obj.players[j - 1].name;
          } if (i > 0 && j === 0) {
            td.innerHTML = `Игра №${i}`;
          } if (i > 0 && j > 0 && j < obj.players.length + 1) {
            td.classList.add('table-result');
            td.innerHTML = `
              <input type="number" min="0" max="200" step="1">
              `;
          } if (i > 0 && j > obj.players.length) {
            td.innerHTML = `
              <button class="ok">ok</button>
              `;
          }
        }
      }

      table.classList.add('game__table');
      playingField.appendChild(table);

      let k = 0;
      const endRound = () => {
        const tableResult = document.querySelectorAll('.table-result');
        let arrTableResult = [];
        let arr = [];
        tableResult.forEach((item, i) => {
          if ((i + 1) % obj.players.length === 0) {
            arr.push(item);
            arrTableResult.push(arr);
            arr = arr.slice(arr.length);
          } else if ((i + 1) % obj.players.length !== 0) {
            arr.push(item);
          }
        });

        const okBtn = document.querySelectorAll('.ok');
        okBtn.forEach((item) => {
          const testInputValue = (arr, num) => {
            let test = true;
            for (let i = 0; i < arr[0].length; i++) {
              if (arr[num][i].lastElementChild.value === '') {
                test = false;
              }
            }
            return test;
          };

          item.addEventListener('click', function clickOnBtn(even) {
            even.preventDefault();

            if (!testInputValue(arrTableResult, k)) {
              closeModalWindow(`<div>Внесите количество монет каждого игрока на конец этого раунда!</div>
              <div class="loss__btn">
              <div id="btn">Понятно!</div>
              </div>`);
            } else {
              for (let i = 0; i < obj.players.length; i++) {
                obj.players[i].score = Number(arrTableResult[arrTableResult.length - 1][i].lastElementChild.value);
              }
              const sortScore = [];
              const { players } = obj;
              let testScore = 0;
              let numTestScore = 0;
              for (let player of players) {
                sortScore.push(Object.values(player)[1]);
              }
              for (let i = 0; i < sortScore.length; i++) {
                if (Number(sortScore[i]) > testScore) {
                  testScore = sortScore[i];
                  numTestScore = i;
                }
              }

              for (let i = 0; i < arrTableResult[0].length; i++) {
                if (i === numTestScore) {
                  arrTableResult[arrTableResult.length - 1][i].innerHTML = `
                    1 <div style="font-size: 10px">(монет за игру: ${sortScore[i]})</div>`;
                  obj.players[i].scoreRound += 1;
                } else {
                  arrTableResult[arrTableResult.length - 1][i].innerHTML = `0 
                    <div style="font-size: 10px">(монет за игру: ${sortScore[i]} )</div>`;
                }
              }

              let tr = document.createElement('tr');
              table.appendChild(tr);
              for (let i = 0; i < obj.players.length + 2; i++) {
                let td = document.createElement('td');
                tr.appendChild(td);
                if (i === 0) {
                  td.innerHTML = `Игра №${arrTableResult.length + 1}`;
                } if (i > 0 && i < obj.players.length + 1) {
                  td.classList.add('table-result');
                  td.innerHTML = `
                      <input type="number" min="0" max="200" step="1">
                      `;
                } if (i > obj.players.length) {
                  td.innerHTML = `
                      <button class="ok">ok</button>
                      `;
                }
              }

              for (let i = 0; i < obj.players.length; i++) {
                obj.players[i].score = 0;
              }
              item.remove();
              k += 1;
              console.log(k);
              endRound();
            }
          });
        });
      };
      endRound();


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
        <div>Вы уверены, что хотите закончить игру?</div>
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
              table.lastElementChild.remove();



              const sortScore = [];
              const { players } = obj;
              for (let player of players) {
                sortScore.push(Object.values(player));

              }

              sortScore.sort((function (index) {
                return function (a, b) {
                  return (a[index] === b[index] ? 0 : (a[index] > b[index] ? 1 : -1));
                };
              })(1));

              let tableGameResult = document.createElement('table');
              tableGameResult.classList.add('game__table');

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
                    td.innerHTML = `${sortScore[i - 1][2]}`;
                  }
                }
              }

              playingField.appendChild(tableGameResult);
              endGame.remove();
              dataLoss.remove();

              statisticsFieldStart.remove();
              const liStatisticGame = document.createElement('li');
              liStatisticGame.classList.add('project__statistics-field-item');
              statisticsFieldUl.appendChild(liStatisticGame);

              const arrNamePlayers = [];
              for (let player of obj.players) {
                arrNamePlayers.push(Object.values(player)[0]);
              }

              const nameStatisticGame = document.createElement('div');
              nameStatisticGame.classList.add('project__statistics-field-name');
              nameStatisticGame.innerHTML = `
              Индустрия: ${arrNamePlayers.join(', ')}
              -(${(new Date()).toISOString().slice(0, 10)})
              `;
              liStatisticGame.appendChild(nameStatisticGame);

              const deleteBtn = document.createElement('div');
              deleteBtn.innerHTML = `<img class="delete" src="icons/trash.png" alt="delete">`;
              liStatisticGame.appendChild(deleteBtn);

              console.log(nameStatisticGame);
              document.querySelectorAll('.delete').forEach((item) => {
                item.addEventListener('click', (even) => {
                  even.preventDefault();

                  item.parentElement.parentElement.remove();

                });
              });

              nameStatisticGame.addEventListener('click', (even) => {
                even.preventDefault();

                const copyTableGameResult = tableGameResult.cloneNode(true);

                const dataLoss = document.createElement('div');
                const dataInLoss = document.createElement('div');
                const close = document.createElement('div');
                const nameGame = document.createElement('div');
                close.classList.add('btn');
                close.innerHTML = 'Закрыть';
                nameGame.innerHTML = 'Индустрия<br>';
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
            } else {
              dataLoss.remove();
            }
          });
        });
      });
    }
  });
};