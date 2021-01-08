const FULL_DASH_ARRAY = 669;

var timer = new easytimer.Timer();

new Vue({
  el: "#app",
  data: {
    // Header
    titleInit: "Timer : ",
    formattedHeader: "00:00",
    formattedTime: "",

    // Values
    formattedSec: null,
    formattedAni: null,
    userMinutes: null,
    // resetDashArray: 0,
    animState: "paused",

    // booleans
    started: false,
    paused: false,
    showInput: true,
  },
  metaInfo() {
    return {
      title: this.titleInit + this.formattedHeader,
    };
  },
  mounted() {},
  methods: {
    restart() {
      this.animState = "running";
      this.started = true;
      this.paused = false;
      timer.start();
    },
    starter() {
      if (this.userMinutes == null) {
        alert("Please enter a time interval in minutes.");
      }
      else if (this.userMinutes < 1 || this.userMinutes >60 ) {
        alert("Please enter a time interval between 1 and 60 minutes.");
      } 
      else {
        this.started = true;
        this.showInput = false;
        this.animState = "running";
        this.formattedSec = this.userMinutes * 60;

        if (this.userMinutes < 10) {
          this.formattedTime = "0" + this.userMinutes + ":00";
          this.formattedHeader = this.formattedTime;
        } else if (this.userMinutes >= 10 && this.userMinutes < 60) {
          this.formattedTime = this.userMinutes + ":00";
          this.formattedHeader = this.formattedTime;
        } else if (this.userMinutes == 60) {
          this.formattedTime = "01:00:00";
          this.formattedHeader = this.formattedTime;
        }

        setTimeout(() => {
          timer.start({
            countdown: true,
            startValues: { seconds: this.formattedSec },
            precision: "secondTenths",
          });
        }, 1000);

        if (this.userMinutes < 60) {
          let formattedTime = timer.getTimeValues().toString();
          formattedTime = formattedTime.substring(3);
          // this.formattedTime = formattedTime;

          timer.addEventListener("secondTenthsUpdated", (e) => {
            let formattedTime = timer.getTimeValues().toString();
            formattedTime = formattedTime.substring(3);
            this.formattedTime = formattedTime;
            this.formattedHeader = this.formattedTime;
          });
        } else if (this.userMinutes >= 60) {
          let formattedTime = timer.getTimeValues().toString();
          // this.formattedTime = formattedTime;

          timer.addEventListener("secondTenthsUpdated", (e) => {
            let formattedTime = timer.getTimeValues().toString();
            this.formattedTime = formattedTime;
            this.formattedHeader = this.formattedTime;
          });
        }

        timer.addEventListener("targetAchieved", (e) => {
          location.reload();
        });
      }
    },
    pause() {
      timer.pause();
      this.started = false;
      this.paused = true;
      this.animState = "paused";
    },
    reset() {
      timer.stop();
      this.formattedTime = "00:00";
      location.reload();
    },
  },
  computed: {
    timerBar() {
      return {
        "--min2Sec": this.formattedSec + "s",
        "--resetDashArray": this.resetDashArray,
        "--animState": this.animState,
      };
    },
  },
});
