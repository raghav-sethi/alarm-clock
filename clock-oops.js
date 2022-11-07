class AlarmClock {
  sound = new Audio(
    "https://www.freespecialeffects.co.uk/soundfx/clocks/clock_chime.wav"
  );
  hr = document.getElementById("alarmhrs");
  min = document.getElementById("alarmmins");
  sec = document.getElementById("alarmsecs");
  ap = document.getElementById("ampm");
  clock = document.getElementById("clock");
  index = null;
  alarms = [];
  alarmsContainer = document.querySelector(".alarms");
  createAlarm = document.querySelector(".createAlarm");
  snoozeCount = [];

  constructor() {
    this.initialiseClock();
    this.registerEvents();
  }

  registerEvents() {
    document.getElementById("setButton").addEventListener("click", () => {
      this.alarmSet();
    });
  }

  addZero(time) {
    return time < 10 ? "0" + time : time;
  }

  updateUI(alarms) {
    const me = this;
    this.alarmsContainer.innerHTML = "";
    this.alarmsContainer.appendChild(this.createAlarm);
    alarms.forEach((alarm, i) => {
      const div = document.createElement("div");
      this.alarmsContainer.appendChild(div).classList.add("alarm");
      div.innerText = alarm;
      const btnDiv = document.createElement("div");
      div.appendChild(btnDiv);
      const clearBtn = document.createElement("button");
      btnDiv.appendChild(clearBtn);
      clearBtn.innerText = "Clear Alarm";
      clearBtn.style.marginRight = "20px";
      const snoozeBtn = document.createElement("button");
      btnDiv.appendChild(snoozeBtn);
      snoozeBtn.classList.add("hidden");
      snoozeBtn.innerText = "Snooze Alarm";
      clearBtn.addEventListener("click", (e) => {
        console.log(e.target.value);
        alarms.splice(e.target.value, 1);
        console.log(this.alarms);
        this.sound.pause();
        this.alarmClear();
      });
      clearBtn.value = i;
      snoozeBtn.classList.add(`snoozeBtn${i}`);
      console.log(clearBtn.value);
    });
  }

  alarmClear() {
    this.updateUI(this.alarms);
    // console.log(index);
    // this.hr.disabled = false;
    // this.min.disabled = false;
    // this.sec.disabled = false;
    // this.ap.disabled = false;
  }

  alarmSet() {
    const alarmObj = this;
    let selectedHour = this.hr.value;
    let selectedMin = this.min.value;
    let selectedSec = this.sec.value;
    let selectedAP = this.ap.value;

    let alarmTime =
      alarmObj.addZero(selectedHour) +
      ":" +
      alarmObj.addZero(selectedMin) +
      ":" +
      alarmObj.addZero(selectedSec) +
      selectedAP;
    console.log("alarmTime:" + alarmTime);

    if (!this.alarms.includes(alarmTime)) {
      this.alarms.push(alarmTime);
      this.snoozeCount.push(0);
    }
    console.log(this.alarms);

    alarmObj.updateUI(alarmObj.alarms);

    //when alarmtime is equal to currenttime then play a sound

    /*function to calcutate the current time 
    then compare it to the alarmtime and play a sound when they are equal
    */

    setInterval(function () {
      let date = new Date();
      let hours = 12 - date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let ampm = date.getHours() < 12 ? "AM" : "PM";

      //convert military time to standard time

      if (hours < parseInt("0", 8)) {
        hours = hours * -1;
      } else if (hours == parseInt("00", 8)) {
        hours = 12;
      } else {
        hours = hours;
      }

      let currentTime =
        alarmObj.addZero(hours) +
        ":" +
        alarmObj.addZero(minutes) +
        ":" +
        alarmObj.addZero(seconds) +
        "" +
        ampm;

      if (alarmObj.alarms.includes(currentTime)) {
        const snoozeIndex = alarmObj.alarms.indexOf(currentTime);
        const snoozeButton = document.querySelector(`.snoozeBtn${snoozeIndex}`);
        snoozeButton.disabled = false;
        alarmObj.sound.play();
        snoozeButton.classList.remove("hidden");
        snoozeButton.addEventListener("click", () => {
          alarmObj.snoozeCount[snoozeIndex] + 1;
          console.log(alarmObj.snoozeCount);
          alarmObj.sound.pause();
          snoozeButton.disabled = true;
          function AddMinutesToDate(date, minutes) {
            return new Date(date.getTime() + minutes * 60000);
          }
          function DateFormat(date) {
            var hours =
              date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            let ampm = date.getHours() < 12 ? "AM" : "PM";
            minutes = minutes < 10 ? "0" + minutes : minutes;
            var strTime =
              alarmObj.addZero(hours) +
              ":" +
              alarmObj.addZero(minutes) +
              ":" +
              alarmObj.addZero(seconds) +
              ampm;
            return strTime;
          }
          var now = new Date();
          var next = AddMinutesToDate(now, 1);
          alarmObj.alarms[snoozeIndex] = DateFormat(next);
          console.log(alarmObj.alarms);
        });
      }
    }, 1000);

    // console.log('currentTime:' + currentTime);
  }

  initialiseClock() {
    let alarmClass = this;

    alarmClass.sound.loop = true;

    // display current time by the second
    let currentTime = setInterval(function () {
      let date = new Date();
      let hours = 12 - date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let ampm = date.getHours() < 12 ? "AM" : "PM";

      //convert military time to standard time

      if (hours < parseInt("0", 8)) {
        hours = hours * -1;
      } else if (hours == parseInt("00", 8)) {
        hours = 12;
      } else {
        hours = hours;
      }

      clock.textContent =
        alarmClass.addZero(hours) +
        ":" +
        alarmClass.addZero(minutes) +
        ":" +
        alarmClass.addZero(seconds) +
        "" +
        ampm;
    }, 1000);

    function getOptions(select, timeUnit) {
      for (let i = 0; i <= timeUnit; i++) {
        select.options[select.options.length] = new Option(
          i < 10 ? "0" + i : i,
          i
        );
      }
    }

    function hoursMenu() {
      let select = alarmClass.hr;
      let hrs = 12;
      getOptions(select, hrs);
    }

    function minMenu() {
      let select = alarmClass.min;
      let min = 59;
      getOptions(select, min);
    }

    function secMenu() {
      let select = alarmClass.sec;
      let sec = 59;
      getOptions(select, sec);
    }
    minMenu();
    hoursMenu();
    secMenu();
  }
}
$alarm = new AlarmClock();
