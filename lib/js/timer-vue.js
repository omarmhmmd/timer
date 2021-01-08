var timer = new easytimer.Timer();

new Vue({
  el: "#app",
  data: {
    // Header
    titleInit: "Timer : ",
    formattedHeader: "00:00",
    formattedTime: "  ",

    // Values
    formattedSec: null,
    formattedAni: null,
    userMinutes: null,
    resetDashArray: 0,
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
      
      setTimeout(() => {
        this.animState = "running";
      }, 1000)
      this.started = true;
      this.paused = false;
      timer.start();
    },
    starter() {
      if (this.userMinutes == null) {
        alert("Please enter a time interval in minutes.");
      } 
      else {
        this.started = true;
        this.showInput = false;
        // setTimeout(() => {
        //   this.animState = "running";
        // }, 1000)
        
        this.animState = "running";

        this.formattedSec = this.userMinutes * 60;
        
        timer.start({
          countdown: true,
          startValues: { seconds: this.formattedSec },
          precision: "seconds",
        });

        if (this.userMinutes < 60) {
          let formattedTime = timer.getTimeValues().toString();
          formattedTime = formattedTime.substring(3);
          this.formattedTime = formattedTime;

          timer.addEventListener("secondsUpdated", (e) => {
            let formattedTime = timer.getTimeValues().toString();
            formattedTime = formattedTime.substring(3);
            this.formattedTime = formattedTime;
          });
        }
        else if (this.userMinutes >= 60) {
          let formattedTime = timer.getTimeValues().toString();
          this.formattedTime = formattedTime;

          timer.addEventListener("secondsUpdated", (e) => {
            let formattedTime = timer.getTimeValues().toString();
            this.formattedTime = formattedTime;
          });
        }

        timer.addEventListener("targetAchieved", (e) => {
          location.reload();
        });
      }
    },
    pause() {
      this.started = false;
      this.paused = true;
      timer.pause();
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
        "--userMinutes": this.formattedSec + "s",
        "--resetDashArray": this.resetDashArray,
        "--animState": this.animState,
      };
    },
  },
});
