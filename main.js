(function () {
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






    function createCard(arrayCards, indexCard) {
        let cardInfo = arrayCards[indexCard];
        let card = document.createElement("div");
        card.classList.add("card", "back");
        card.textContent = cardInfo;
        return card;
    }

    // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. 
    // У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

    function startGame(count, container) {

        console.log(container);
        if ((count % 2 == 0) && (count > 0) && (count < 11)) {
            let shuffleArray = shuffle(createNumbersArray(count));
            console.log(shuffleArray);

            console.log(container);
            let card;
            for (let i = 0; i < shuffleArray.length; i++) {
                card = createCard(shuffleArray, i);
                container.append(card);
            }


        } else {
            let shuffleArray = shuffle(createNumbersArray(4));

        }
    }

    window.startGame = startGame;

})();


