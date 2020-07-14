// SW class
function Stopwatch() {
    let counter = 0;
    let intervalID = 0;
    const screen = document.getElementById('sw-screen');

    const addMiliseconds = () => {
        counter += 0.01
        updateScreen();
    };
    const updateScreen = () => {
        screen.innerHTML = counter.toFixed(2);
    }

    // start()
    this.start = function() {
        if (intervalID != 0) {
            throw new Error('Stopwatch has already started.')
        }
        intervalID = setInterval(addMiliseconds, 10);
    };
    // stop()
    this.stop = function() {
        if (intervalID == 0) {
            throw new Error('Stopwatch has already stoped.')
        }
        clearInterval(intervalID);
        intervalID = 0;
    };
    // reset()
    this.reset = () => {
        if (intervalID != 0) {
            this.stop();
        };
        counter = 0;
        updateScreen();
    };
    // duration()
    Object.defineProperty(this, 'duration', {
        get: function() {
            console.log(intervalID);
            return counter
        }
    });
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
const sw = new Stopwatch();
const ui = new UI([btnStart, btnStop]);

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
