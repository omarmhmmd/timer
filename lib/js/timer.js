var app = new Vue({
  el: "#app",
  data: {
    // values
    userMinutes: null,
    timerInterval: null,
    timeLimit: 0,
    timePassed: 0,
		
		// css values
    userSeconds: null,
    resetDashArray: 0,
		animState: 'running',
		
    // booleans
    start: false,
    pause: true,
    timerPause: false,
  },
  methods: {
    startTimer() {
      if (this.userMinutes == null) {
        alert("Please enter a time interval in minutes.");
      } else {
				this.resetDashArray = 669;
				this.animState = 'running';
        this.userSeconds = (this.userMinutes * 60) - 1;
        // this.userSeconds = this.userMinutes * 60;

        console.log("user seconds: " + this.userSeconds)
        this.start = true;
        this.pause = false;
        this.timerPause = false;
        this.timerInterval = this.timePassed += 1;
        this.timerInterval = setInterval(() => {
          if (this.start) {
            this.timePassed += 1;
            console.log(this.timePassed);
            if (this.userMinutes * 60 < this.timePassed) {
              this.resetTimer();
            }
          }
        }, 1000);
      }
    },
    pauseTimer() {
			this.animState = 'paused';
      clearInterval(this.timerInterval);
      this.start = false;
      this.timerPause = true;
    },
    resetTimer() {
      clearInterval(this.timerInterval);
      /* Native mac notification */
      const myNotification = new Notification("Time is up", {
        body: "Your " + this.userMinutes + " min timer has finished.",
      });
      myNotification.onclick = () => {
        console.log("Notification clicked");
      };
      /* End native mac notification */
			this.userMinutes = null;
      this.timerPause = false;
      this.start = false;
      this.pause = true;
			this.resetDashArray = 0
      setInterval(() => {
       this.reset();
      }, 500);
			
    },
    reset() {
      location.reload();
    },
  },
  computed: {
    timeLeft() {
      return Math.floor(this.userMinutes * 60) - this.timePassed;
    },

    /* Credits: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f */
    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      // The largest round integer less than or equal to the result of time divided being by 60.
      const minutes = Math.floor(timeLeft / 60);
      // Seconds are the remainder of the time divided by 60 (modulus operator)
      let seconds = timeLeft % 60;
      // If the value of seconds is less than 10, then display seconds with a leading zero
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      // The output in MM:SS format
      return `${minutes}:${seconds}`;
    },
    timerBar() {
      return {
        "--userSeconds": this.userSeconds + "s",
        "--resetDashArray": this.resetDashArray,
				"--animState": this.animState
      };
    },
  },
});
