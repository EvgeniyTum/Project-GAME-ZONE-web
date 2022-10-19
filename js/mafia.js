"use strict";

import { playingField, closeModalWindow, statisticsFieldStart, statisticsFieldUl, 
  infoModalWindow } from './left_menu.js';

export const mafiaPlayers = {
  players: []
};

export const startMafiaGame = (obj) => {
  playingField.innerHTML = `
  <form class="form">
    <div class="wellcome__game">Начинаем новую игру в Мафию!</div>
    <div>
      <span>Введите имена игроков через запятую (не менее трёх):</span>
      <br>
      <input type="text" class="input__players" placeholder="Имена через запятую">
  </form>
  <div class="btn">Старт!</div>
  `;

  const start = document.querySelector('.btn');
  start.addEventListener('click', (even) => {
    even.preventDefault();

    const playersList = document.querySelector('.input__players');

    if (playersList.value.split(',').length < 3) {
      closeModalWindow(`<div>Требуется не менее трёх игроков, чтобы начать!</div>
        <div class="loss__btn">
        <div id="btn">Понятно!</div>
        </div>`);
    } else {

      playersList.value.split(',').forEach((item) => {
        const player = { name: item.trim() };
        obj.players.push(player);
      });

      playingField.innerHTML = `<div>Мафия</div><br>
        <div>Не знаешь, как пользоваться таблицей?</div>
      `;

      infoModalWindow(`<div>Жми INFO</div>`, `<div>После окончания раунда игры поставьте 1 в случае победы
      или 0 в случае поражения в активную ячейку таблицы под названием этой команды и нажмите кнопку "ок"
      справа от вписанного результата. По окончанию игры используйте кнопку "Закончить игру".</div>
      <div class="loss__btn">
      <div id="btn">Понятно!</div>
      </div>`, playingField);

      let table = document.createElement('table');
      for (let i = 0; i < 2; i++) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        for (let j = 0; j < 3; j++) {
          let td = document.createElement('td');
          tr.appendChild(td);
          if (i === 0 && j === 0) {
            td.innerHTML = '';
          } if (i === 0 && j === 1) {
            td.innerHTML = 'Мафия';
          } if (i === 0 && j === 2) {
            td.innerHTML = 'Город';
          } if (i === 1 && j === 0) {
            td.innerHTML = `Раунд №${i}`;
          } if (i > 0 && j > 0) {
            td.classList.add('mafia__table-result');
            td.innerHTML = `
              <input type="number" min="0" max="1" step="1">
              <button class="ok">ok</button>
              `;
          }
        }
      }
      table.classList.add('game__table');
      playingField.appendChild(table);

      const endRound = () => {
        const mafiaTableResult = document.querySelectorAll('.mafia__table-result');
        let arrMafiaTableResult = [];
        let arr = [];
        mafiaTableResult.forEach((item, i) => {
          if ((i + 1) % 2 === 0) {
            arr.push(item);
            arrMafiaTableResult.push(arr);
            arr = arr.slice(arr.length);
          } else if ((i + 1) % 2 !== 0) {
            arr.push(item);
          }
        });

        const okBtn = document.querySelectorAll('.ok');
        okBtn.forEach((item) => {

          item.addEventListener('click', (even) => {
            even.preventDefault();

            let inputScore = item.parentElement.firstElementChild.value;
            if (inputScore === '1' || inputScore === '0') {
              item.parentElement.innerHTML = inputScore;

              if (arrMafiaTableResult[arrMafiaTableResult.length - 1][0].innerHTML === '1') {
                arrMafiaTableResult[arrMafiaTableResult.length - 1][1].innerHTML = '0';
              } if (arrMafiaTableResult[arrMafiaTableResult.length - 1][0].innerHTML === '0') {
                arrMafiaTableResult[arrMafiaTableResult.length - 1][1].innerHTML = '1';
              } if (arrMafiaTableResult[arrMafiaTableResult.length - 1][1].innerHTML === '1') {
                arrMafiaTableResult[arrMafiaTableResult.length - 1][0].innerHTML = '0';
              } if (arrMafiaTableResult[arrMafiaTableResult.length - 1][1].innerHTML === '0') {
                arrMafiaTableResult[arrMafiaTableResult.length - 1][0].innerHTML = '1';
              }

              let tr = document.createElement('tr');
              table.appendChild(tr);
              for (let i = 0; i < 3; i++) {
                let td = document.createElement('td');
                tr.appendChild(td);
                if (i === 0) {
                  td.innerHTML = `Раунд №${arrMafiaTableResult.length + 1}`;
                } if (i > 0) {
                  td.classList.add('mafia__table-result');
                  td.innerHTML = `
                <input type="number" min="0" max="1" step="1">
                <button class="ok">ok</button>
                `;
                }
              }
              endRound();
            } else {
              closeModalWindow(`<div>Вы ввели неправильное значение! Победа - 1, поражение - 0!</div>
              <div class="loss__btn">
              <div id="btn">Понятно!</div>
              </div>`);
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

              const gameResult = document.createElement('div');
              
              const mafiaTableResult = document.querySelectorAll('.mafia__table-result');
              let arrMafiaTableResult = [];
              let arr = [];
              mafiaTableResult.forEach((item, i) => {
                if (i < mafiaTableResult.length) {
                  if ((i + 1) % 2 === 0) {
                    arr.push(item.innerHTML);
                    arrMafiaTableResult.push(arr);
                    arr = arr.slice(arr.length);
                  } else if ((i + 1) % 2 !== 0) {
                    arr.push(item.innerHTML);
                  }
                }
              });

              let sumMafiaWin = 0;
              let sumCityWin = 0;
              for (let round of arrMafiaTableResult) {
                if (round[0] == 1) {
                  sumMafiaWin += 1;
                } else {
                  sumCityWin += 1;
                }
              }
              if (sumMafiaWin > sumCityWin) {
                gameResult.innerHTML = `Победила МАФИЯ со счетом:<br><br>${sumMafiaWin} : ${sumCityWin}`;
              } else if (sumMafiaWin < sumCityWin) {
                gameResult.innerHTML = `Победил ГОРОД со счетом:<br><br>${sumCityWin} : ${sumMafiaWin}`;
              } else if (arrMafiaTableResult.length === 0) {
                gameResult.innerHTML = 'Игра не состоялась';
              } else {
                gameResult.innerHTML = `Ничья со счетом:<br><br>${sumCityWin} : ${sumMafiaWin}`;
              }

              playingField.appendChild(gameResult);
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
              Мафия: ${arrNamePlayers.join(', ')}
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
                
                const copyTableGameResult = gameResult.cloneNode(true);

                const dataLoss = document.createElement('div');
                const dataInLoss = document.createElement('div');
                const close = document.createElement('div');
                const nameGame = document.createElement('div');
                close.classList.add('btn');
                close.innerHTML = 'Закрыть';
                nameGame.innerHTML = 'Мафия<br>';
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