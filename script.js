// clock
    function addTrailingZero(number) {
      return number < 10 ? "0" + number : number;
    }

    function updateTime() {
      const time = new Date();
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let seconds = time.getSeconds();
      let ampm = hours >= 12 ? "PM" : "AM";
      let otherampm = hours >= 12 ? "AM" : "PM";

      hours = hours % 12 || 12;
      hours = addTrailingZero(hours);
      minutes = addTrailingZero(minutes);
      seconds = addTrailingZero(seconds);

      document.getElementById("hour").innerHTML = hours;
      document.getElementById("min").innerHTML = minutes;
      document.getElementById("sec").innerHTML = seconds;
      document.getElementById("ampm").innerHTML = ampm;
      document.getElementById("other-ampm").innerHTML = otherampm;
    }

    updateTime();
    setInterval(updateTime, 1000);

    document.getElementById("stopwatch-btn").addEventListener("click", function () {
      document.querySelectorAll(".main-container > div").forEach(div => div.style.display = "none");
      document.querySelector(".stopwatch").style.display = "block";
      document.querySelector(".type").innerHTML = "Stopwatch";
    });

    document.getElementById("timer-btn").addEventListener("click", function () {
      document.querySelectorAll(".main-container > div").forEach(div => div.style.display = "none");
      document.querySelector(".timer").style.display = "block";
      document.querySelector(".type").innerHTML = "Timer";
    });

    document.querySelector(".back-btn").addEventListener("click", function () {
      document.querySelectorAll(".main-container > div").forEach(div => div.style.display = "none");
      document.querySelector(".clock").style.display = "block";
      document.querySelector(".type").innerHTML = "Clock";
    });

    let stopwatchHours = 0,
      stopwatchMinutes = 0,
      stopwatchSeconds = 0,
      stopwatchMiliSeconds = 0,
      stopwatchRunning = false,
      laps = 0,
      stopwatchInterval;

    function stopwatch() {
      stopwatchMiliSeconds++;
      if (stopwatchMiliSeconds === 100) {
        stopwatchMiliSeconds = 0;
        stopwatchSeconds++;
      }
      if (stopwatchSeconds === 60) {
        stopwatchSeconds = 0;
        stopwatchMinutes++;
      }
      if (stopwatchMinutes === 60) {
        stopwatchMinutes = 0;
        stopwatchHours++;
      }

      document.getElementById("stopwatch-hour").innerHTML = addTrailingZero(stopwatchHours);
      document.getElementById("stopwatch-min").innerHTML = addTrailingZero(stopwatchMinutes);
      document.getElementById("stopwatch-sec").innerHTML = addTrailingZero(stopwatchSeconds);
      document.getElementById("stopwatch-ms").innerHTML = addTrailingZero(stopwatchMiliSeconds);
    }

    function startStopwatch() {
      if (!stopwatchRunning) {
        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
      }
    }

    function stopStopwatch() {
      clearInterval(stopwatchInterval);
      stopwatchRunning = false;
    }

    function resetStopwatch() {
      clearInterval(stopwatchInterval);
      stopwatchRunning = false;
      stopwatchHours = 0;
      stopwatchMinutes = 0;
      stopwatchSeconds = 0;
      stopwatchMiliSeconds = 0;
      laps = 0;
      document.getElementById("stopwatch-hour").innerHTML = "00";
      document.getElementById("stopwatch-min").innerHTML = "00";
      document.getElementById("stopwatch-sec").innerHTML = "00";
      document.getElementById("stopwatch-ms").innerHTML = "00";
    }

    document.querySelector(".start-stopwatch").addEventListener("click", function () {
      startStopwatch();
      document.querySelector(".start-stopwatch").style.display = "none";
      document.querySelector(".lap-stopwatch").style.display = "inline-block";
    });

    document.querySelector(".lap-stopwatch").addEventListener("click", function () {
      laps++;
      document.querySelectorAll(".lap").forEach(lap => lap.classList.remove("active"));
      const lapDiv = document.createElement("div");
      lapDiv.className = "lap active";
      lapDiv.innerHTML = `<p>Lap ${laps}</p><p>${addTrailingZero(stopwatchHours)} : ${addTrailingZero(stopwatchMinutes)} : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(stopwatchMiliSeconds)}</p>`;
      document.querySelector(".laps").prepend(lapDiv);
    });

    document.querySelector(".reset-stopwatch").addEventListener("click", function () {
      resetStopwatch();
      document.querySelector(".start-stopwatch").style.display = "inline-block";
      document.querySelector(".lap-stopwatch").style.display = "none";
      document.querySelector(".laps").innerHTML = "";
    });

    let time = 0,
      timerHours = 0,
      timerMinutes = 0,
      timerSeconds = 0,
      timerMiliseconds = 0,
      timerRunning = false,
      timerInterval;

    function getTime() {
      time = prompt("Enter time in minutes");
      time = time * 60;
      setTime();
    }
    function setTime() {
      timerHours = Math.floor(time / 3600);
      timerMinutes = Math.floor((time % 3600) / 60);
      timerSeconds = Math.floor(time % 60);
      timerMiliseconds = 0;

      document.getElementById("timer-hour").innerHTML = addTrailingZero(timerHours);
      document.getElementById("timer-min").innerHTML = addTrailingZero(timerMinutes);
      document.getElementById("timer-sec").innerHTML = addTrailingZero(timerSeconds);
      document.getElementById("timer-ms").innerHTML = addTrailingZero(timerMiliseconds);
    }

    function timer() {
      timerMiliseconds--;
      if (timerMiliseconds === -1) {
        timerMiliseconds = 99;
        timerSeconds--;
      }
      if (timerSeconds === -1) {
        timerSeconds = 59;
        timerMinutes--;
      }
      if (timerMinutes === -1) {
        timerMinutes = 59;
        timerHours--;
      }

      document.getElementById("timer-hour").innerHTML = addTrailingZero(timerHours);
      document.getElementById("timer-min").innerHTML = addTrailingZero(timerMinutes);
      document.getElementById("timer-sec").innerHTML = addTrailingZero(timerSeconds);
      document.getElementById("timer-ms").innerHTML = addTrailingZero(timerMiliseconds);

      timeUp();
    }

    function startTimer() {
      if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0) {
        getTime();
      } else {
        timerInterval = setInterval(timer, 10);
        timerRunning = true;
        document.querySelector(".start-timer").style.display = "none";
        document.querySelector(".stop-timer").style.display = "inline-block";
      }
    }

    function stopTimer() {
      clearInterval(timerInterval);
      timerRunning = false;
      document.querySelector(".stop-timer").style.display = "none";
      document.querySelector(".start-timer").style.display = "inline-block";
    }

    function resetTimer() {
      stopTimer();
      timerHours = 0;
      timerMinutes = 0;
      timerSeconds = 0;
      timerMiliseconds = 0;

      document.getElementById("timer-hour").innerHTML = "00";
      document.getElementById("timer-min").innerHTML = "00";
      document.getElementById("timer-sec").innerHTML = "00";
      document.getElementById("timer-ms").innerHTML = "00";
    }

    function timeUp() {
      if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0 && timerMiliseconds === 0) {
        stopTimer();
        alert("Time's up!");
      }
    }

    document.querySelector(".start-timer").addEventListener("click", startTimer);
    document.querySelector(".stop-timer").addEventListener("click", stopTimer);
    document.querySelector(".reset-timer").addEventListener("click", resetTimer);


