var app = new Vue({
	el: '#app',
	data: {
		// values
		userMinutes: null,
		timerInterval: null,
		timeLimit: 0,
		timePassed: 0,
		// booleans
		start: true
	},
	methods: {
		startTimer() {
			console.log(this.userMinutes)
			if (this.userMinutes == null) {
				alert('enter minutes')
			}
			else {
				this.start = false;
				console.log(this.start)
				this.timerInterval = this.timePassed += 1;
				this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
			}
		},
		pauseTimer() {
			this.start = true;
			// console.log(this.start)
			// this.timerInterval = this.timePassed += 1;
			// this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
		}
	},
	computed: {
		timeLeft() {
			return Math.floor(this.userMinutes * 60) - this.timePassed
		},
		
		/* Credits: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f */
		formattedTimeLeft() {
			const timeLeft = this.timeLeft
			// The largest round integer less than or equal to the result of time divided being by 60.
			const minutes = Math.floor(timeLeft / 60)
			// Seconds are the remainder of the time divided by 60 (modulus operator)
			let seconds = timeLeft % 60
			// If the value of seconds is less than 10, then display seconds with a leading zero
			if (seconds < 10) {
				seconds = `0${seconds}`
			}
			// The output in MM:SS format
			return `${minutes}:${seconds}`
		}
	}
})