// SW factory
// function Stopwatch_original() {
//     let counter = 0;
//     let intervalID = 0;
//     const screen = document.getElementById('sw-screen');

//     const addMiliseconds = () => {
//         counter += 0.01
//         updateScreen();
//     };
//     const updateScreen = () => {
//         screen.innerHTML = counter.toFixed(2);
//     }

//     // start()
//     this.start = function() {
//         if (intervalID != 0) {
//             throw new Error('Stopwatch has already started.')
//         }
//         intervalID = setInterval(addMiliseconds, 10);
//     };
//     // stop()
//     this.stop = function() {
//         if (intervalID == 0) {
//             throw new Error('Stopwatch has already stoped.')
//         }
//         clearInterval(intervalID);
//         intervalID = 0;
//     };
//     // reset()
//     this.reset = () => {
//         if (intervalID != 0) {
//             this.stop();
//         };
//         counter = 0;
//         updateScreen();
//     };
//     // duration()
//     Object.defineProperty(this, 'duration', {
//         get: function() {
//             console.log(intervalID);
//             return counter
//         }
//     });
// };

// SW ES6 class
class Stopwatch2 {
    timer = 0;
    isRunning = false;
    startTime = 0;
    elapsedTime = 0

    updateTime() {
        this.timer = Date.now() - this.startTime + this.elapsedTime;
        console.log(this.timer/1000)
    };

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now();
            this.stopTime = 0;
            this.setIntervalID = setInterval(this.updateTime.bind(this), 1000);
        };
    };

    stop() {
        if (this.isRunning) {
            clearInterval(this.setIntervalID);
            this.isRunning = false;
            this.elapsedTime = this.timer;
        };
    };

    reset() {
        // if (this.isRunning) {
        //     this.stop();
        // };
        this.startTime = 0;
        this.timer = 0;
    };
};


// UI class
function UI(arrayOfbuttons) {
    this.toggleClass = function(elem) {
        arrayOfbuttons.forEach(e => e.classList.remove('activeBtn'))
        elem.classList.add('activeBtn');
    };
    this.removeClass = function() {
        arrayOfbuttons.forEach(e => e.classList.remove('activeBtn'))
    };
};

// HTML components
const screen = document.getElementById('sw-screen');
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const btnReset = document.getElementById('btnReset');

// Initialize classes
// const sw = new Stopwatch();
const ui = new UI([btnStart, btnStop]);
let sw2 = new Stopwatch2('sw-screen');

// Add event listeners
btnStart.addEventListener('click', function() {
    sw.start();
    ui.toggleClass(this);
});
btnStop.addEventListener('click', function() {
    sw.stop();
    ui.toggleClass(this);
});
btnReset.addEventListener('click', function() {
    sw.reset();
    ui.removeClass();
});

////////////////////////

