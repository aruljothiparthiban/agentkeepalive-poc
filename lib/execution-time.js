const { performance } = require('perf_hooks');

class ExecutionTime {

    name = null;
    startTime = 0;
    endTime = 0;

    constructor(name){
        this.name = name;
        this.start();
    }

    start() {
        this.startTime = performance.now();
    }

    end() {
        this.endTime = performance.now();
        let timeTaken = (this.endTime - this.startTime) / 1000;
        console.log(`${this.name} Execution time: ${this.secondsToHms(timeTaken)}`);
    }

    secondsToHms = (d) => {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
    
        h = String(h).padStart(2, '0');
        m = String(m).padStart(2, '0');
        s = String(s).padStart(2, '0');
        
        return `${h}:${m}:${s}`;
    }
}

export default ExecutionTime;