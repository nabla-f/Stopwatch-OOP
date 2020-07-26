
class Stopwatch {
    _timer = 0;
    isRunning = false;
    startTime = 0;
    elapsedTime = 0
    observers = []

    get timer() {
        return this._timer
    }
    
    set timer(val) {
        this._timer = val
        this.notifyController(val)
    }

    registerObserver(observer) {
        this.observers.push(observer);
    };

    notifyController(val) {
        this.observers.forEach(observer => {observer.update(val)})
    }

    updateTime() {
        const newTime = Date.now() - this.startTime + this.elapsedTime;
        this.timer = newTime;
    };

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now();
            this.setIntervalID = setInterval(this.updateTime.bind(this), 100);
        };
    };

    stop() {
        if (this.isRunning) {
            clearInterval(this.setIntervalID);
            this.isRunning = false;
            this.elapsedTime = this._timer;
        };
    };

    reset() {
        clearInterval(this.setIntervalID);
        this.isRunning = false
        this.elapsedTime = 0;
        this.startTime = 0;
        this.timer = 0;
    };
};

class UI {
    constructor(displayID, btnStartID, btnStopID, btnResetID) {
        // HTML Components
        this.buttons = {
            start: document.getElementById(btnStartID),
            stop: document.getElementById(btnStopID),
            reset: document.getElementById(btnResetID)
        },
        this.display = document.getElementById(displayID)
    };

    resetAllButtonsStyle() {
        Object.values(this.buttons).forEach(e => e.classList.remove('activeBtn'))
    };

    showButtonAsActive(btn) {
        this.resetAllButtonsStyle();
        btn.classList.add('activeBtn')
    };

    updateDisplay(value) {
        this.display.innerText = value;
    };
}

class Controller {
    constructor(sw, ui) {
        this.sw = sw;
        this.ui = ui;

        // Add event listeners
        this.ui.buttons.start.addEventListener('click', function() {
            sw.start();
            ui.showButtonAsActive(this);
        });
        this.ui.buttons.stop.addEventListener('click', function() {
            if (sw.isRunning) {
                sw.stop();
                ui.showButtonAsActive(this);
            };
        });
        this.ui.buttons.reset.addEventListener('click', function() {
            sw.reset();
            ui.resetAllButtonsStyle();
        });
    }

    update(val) {
        ui.updateDisplay((val/1000).toFixed(3))
    }
}


// Initialize classes

const ui = new UI('sw-display', 'btnStart', 'btnStop', 'btnReset');
const sw = new Stopwatch();
const controller = new Controller(sw, ui);

// Register controller in sw 
sw.registerObserver(controller);

////////////////////////

