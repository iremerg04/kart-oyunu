
  const images = [
      "images/foto.jpeg",
      "images/foto2.jpeg",
      "images/foto3.jpeg",
      "images/foto4.jpeg",
      "images/foto5.jpeg",
      "images/foto6.jpeg",
      "images/foto7.jpeg",
      "images/foto8.jpeg"
    ];

  let firstCard, secondCard;
  let lockBoard = false;
  let matches = 0;
  let timeLeft = 60;
  let timer;
  let isPaused = false;

  function startGame() {
    const board = document.getElementById("game-board");
    board.innerHTML = "";
    document.getElementById("status").innerText = "";
    matches = 0;
    timeLeft = 60;
    clearInterval(timer);
    document.getElementById("timer").innerText = "Süre: " + timeLeft;

    // Timer başlat
    timer = setInterval(updateTimer, 1000);
    isPaused = false;

    let cards = [...images, ...images];
    cards.sort(() => 0.5 - Math.random());

    cards.forEach(src => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<img src="${src}" alt="card">`;
      card.addEventListener("click", flipCard);
      board.appendChild(card);
    });

    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }

  function updateTimer() {
    timeLeft--;
    document.getElementById("timer").innerText = "Süre: " + timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      document.getElementById("status").innerText = "Süre bitti! Kaybettiniz.";
      lockBoard = true;
    }
  }

  function pauseGame() {
    if (!timer && !isPaused) return; // Oyun başlamamışsa bir şey yapma

    if (isPaused) {
      // Devam ettir
      timer = setInterval(updateTimer, 1000);
      isPaused = false;
      document.querySelector("#pauseBtn").innerText = "Durdur";
    } else {
      // Durdur
      clearInterval(timer);
      timer = null;
      isPaused = true;
      document.querySelector("#pauseBtn").innerText = "Devam Et";
    }
  }

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    checkMatch();
  }

  function checkMatch() {
    let isMatch =
      firstCard.querySelector("img").src === secondCard.querySelector("img").src;
    if (isMatch) {
      disableCards();
      matches++;
      if (matches === images.length) {
        clearInterval(timer);
        document.getElementById("status").innerText = "Tebrikler! Kazandınız.";
      }
    } else {
      unflipCards();
    }
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }

  // Oyunu başlangıçta başlat
  startGame();

