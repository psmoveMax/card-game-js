(function () {
  // Массив паттернов карт
  let patterns = [
    "pattern-checks-sm",
    "pattern-checks-md",
    "pattern-checks-lg",
    "pattern-checks-xl",
    "pattern-grid-sm",
    "pattern-grid-md",
    "pattern-grid-lg",
    "pattern-grid-xl",
    "pattern-dots-sm",
    "pattern-dots-md",
    "pattern-dots-lg",
    "pattern-dots-xl",
    "pattern-cross-dots-sm",
    "pattern-cross-dots-md",
    "pattern-cross-dots-lg",
    "pattern-cross-dots-xl",
    "pattern-diagonal-lines-sm",
    "pattern-diagonal-lines-md",
    "pattern-diagonal-lines-lg",
    "pattern-diagonal-lines-xl",
    "pattern-horizontal-lines-sm",
    "pattern-horizontal-lines-md",
    "pattern-horizontal-lines-lg",
    "pattern-horizontal-lines-xl",
    "pattern-vertical-lines-sm",
    "pattern-vertical-lines-md",
    "pattern-vertical-lines-lg",
    "pattern-vertical-lines-xl",
    "pattern-diagonal-stripes-sm",
    "pattern-diagonal-stripes-md",
    "pattern-diagonal-stripes-lg",
    "pattern-diagonal-stripes-xl",
    "pattern-horizontal-stripes-sm",
    "pattern-horizontal-stripes-md",
    "pattern-horizontal-stripes-lg",
    "pattern-horizontal-stripes-xl",
    "pattern-vertical-stripes-sm",
    "pattern-vertical-stripes-md",
    "pattern-vertical-stripes-lg",
    "pattern-vertical-stripes-xl",
    "pattern-triangles-sm",
    "pattern-triangles-md",
    "pattern-triangles-lg",
    "pattern-triangles-xl",
    "pattern-zigzag-sm",
    "pattern-zigzag-md",
    "pattern-zigzag-lg",
    "pattern-zigzag-xl"
  ];

  // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

  function createNumbersArray(count) {
    let numbersArray = [];
    for (let i = 1; i < count + 1; i++) {
      numbersArray.push(i, i);
    }
    return numbersArray;
  }

  // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

  function shuffle(arr) {
    let array = arr;
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }



  function createCard(arrayCards, indexCard, bcg_current, pattern) {
    let cardInfo = arrayCards[indexCard];
    let card = document.createElement("div");


    card.classList.add("card", "back", pattern);



    let game = document.querySelector(".game");
    card.addEventListener("click", function () {
      if (
        !card.classList.contains("guessed") &&
        !card.classList.contains("block_card") &&
        !game.classList.contains("block_game")
      ) {


        card.classList.toggle("inside");
        card.classList.toggle("back");

        if (card.classList.contains("inside")) {
          card.style.backgroundColor = 'white';
          card.classList.remove(pattern);
          card.textContent = cardInfo;
        } else {
          card.style.backgroundColor = bcg_current;
          card.classList.add(pattern);
          card.textContent = "";
        }

        function divLightFirst(match_card) {
          match_card.classList.add("div_win_first");
        }

        let inside_cards = document.querySelectorAll(".inside");
        // Проверка на совпадение
        if (inside_cards.length == 2) {
          setTimeout(checkMatch, 250);

          function checkMatch() {
            game.classList.add("block_game");
            if (inside_cards[0].textContent == inside_cards[1].textContent) {
              divLightFirst(inside_cards[0]);
              divLightFirst(inside_cards[1]);

              inside_cards[0].classList.add("guessed");
              inside_cards[1].classList.add("guessed");
              inside_cards[0].classList.remove("inside");
              inside_cards[1].classList.remove("inside");
            } else {
              let bcg_1 = inside_cards[0].getAttribute('bcg');
              let bcg_2 = inside_cards[1].getAttribute('bcg');
              let sharp_1 = inside_cards[0].getAttribute('sharp');
              let sharp_2 = inside_cards[1].getAttribute('sharp');

              inside_cards[0].style.backgroundColor = bcg_1;
              inside_cards[1].style.backgroundColor = bcg_2;
              inside_cards[0].classList.add(sharp_1);
              inside_cards[1].classList.add(sharp_2);


              inside_cards[0].classList.remove("inside");
              inside_cards[1].classList.remove("inside");
              inside_cards[0].textContent = "";
              inside_cards[1].textContent = "";
              inside_cards[0].classList.toggle("back");
              inside_cards[1].classList.toggle("back");
            }

            // Состояние победы
            if (
              document.querySelectorAll(".card").length ==
              document.querySelectorAll(".guessed").length
            ) {



              if (document.querySelector('#timer') != null) {

                document.querySelector('#timer').remove();
              }


              let deleteElement = document.querySelectorAll('.card');
              for (let i = 0; i < deleteElement.length; i++) {
                deleteElement[i].remove();
              }
              modal_winner.classList.add("modal_vis"); // добавляем видимость окна
              modal_winner.classList.remove("bounceOutDown"); // удаляем эффект закрытия
            }
            game.classList.remove("block_game");
          }
        }
      }
    });
    return card;
  }

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек.
  // У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.



  function startGame(count, timer, container) {

    function createTimer() {
      let timer_div = document.createElement("div");
      timer_div.setAttribute('id', 'timer');
      let seconds = 1000 * 60; //1000 = 1 second in JS
      let timer;

      timer_div.addEventListener("keypress", timer_work());

      function timer_work() {
        let game_status = 0;
        timer_div.removeEventListener("keypress", timer_work);

        if (seconds == 60000)
          timer = setInterval(timer_work, 1000)
        seconds -= 1000;
        timer_div.innerHTML = seconds / 1000 + " секунд";

        if (document.querySelectorAll('.card').length == 0) {
          game_status = 1;
        }

        if (seconds != 0 && game_status == 1) {
          clearInterval(timer);
        }


        if (seconds <= 0) {

          clearInterval(timer);

          let deleteElement = document.querySelectorAll('.card');
          for (let i = 0; i < deleteElement.length; i++) {
            deleteElement[i].remove();
          }
          if (document.querySelector('#timer') != null) {
            document.querySelector('#timer').remove();

            modal_loss.classList.add("modal_vis"); // добавляем видимость окна
            modal_loss.classList.remove("bounceOutDown"); // удаляем эффект закрытия
          }

        }
      }

      timer_div.innerHTML = seconds / 1000 + " секунд";
      return timer_div;
    }


    let bg_color = getRandomColor();
    let sharp = patterns[Math.floor(Math.random() * patterns.length)];
    if (count % 2 == 0 && count > 0 && count < 11) {
      let shuffleArray = shuffle(createNumbersArray(count));
      let card;
      let startGame = false;


      // Формирование карт
      for (let i = 0; i < shuffleArray.length; i++) {
        card = createCard(shuffleArray, i, bg_color, sharp);
        container.append(card);

        //Построение карт на доске
        if (count == 2) {
          document.querySelectorAll('.card')[i].classList.add('card_2');
        }
        if (count == 4) {
          document.querySelectorAll('.card')[i].classList.add('card_4');
        }
        if (count == 6) {
          document.querySelectorAll('.card')[i].classList.add('card_6');
        }
        if (count == 8) {
          document.querySelectorAll('.card')[i].classList.add('card_8');
        }
        if (count == 10) {
          document.querySelectorAll('.card')[i].classList.add('card_10');
        }
      }

      startGame = true;


      // Состояние начала игры
      if (startGame == true) {
        setTimeout(startGameStarted, 3000);
        for (let i = 0; i < shuffleArray.length; i++) {
          sharpes_current = document.querySelectorAll('.card')[i].classList[2];


          //Сохранение фона и узоров
          document.querySelectorAll(".card")[i].setAttribute('sharp', sharp);
          document.querySelectorAll(".card")[i].setAttribute('bcg', bg_color);

          document.querySelectorAll(".card")[i].textContent = shuffleArray[i];
          document.querySelectorAll('.card')[i].style.backgroundColor = 'white';
          document.querySelectorAll(".card")[i].classList.remove(sharp);
          document.querySelectorAll(".card")[i].classList.add("block_card");
        }

        function startGameStarted() {
          if (timer == true) {
            timer_active = createTimer();
            document.getElementById('game').prepend(timer_active);
          }
          for (let i = 0; i < shuffleArray.length; i++) {
            sharpes_current = document.querySelectorAll('.card')[i].getAttribute('sharp');

            document.querySelectorAll(".card")[i].textContent = "";
            document.querySelectorAll('.card')[i].style.backgroundColor = bg_color;
            document.querySelectorAll(".card")[i].classList.add(sharp);
            document.querySelectorAll(".card")[i].classList.remove("block_card");

          }

        }
      }

      startGame = false;



    }
  }

  window.startGame = startGame;
})();
