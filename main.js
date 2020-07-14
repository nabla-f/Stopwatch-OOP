// Factory function
const createCircle = (radius) => {
    return {
        radius,
        draw: () => console.log('draw')
    };
}

// Constructor function
function Circle(radius) {
    let color = 'red';
    let defaulLocation = {x:0, y:0};

    this.getDefaultLocation = () => {
        return defaulLocation;
    };

    this.radius = radius;

    this.draw = () => {
        computeOptimumLocation();
        defaulLocation
        this.radius
        console.log('draw');
    };


    Object.defineProperty(this, 'defaultLocation', {
        get: () => {return defaulLocation},
        set: (value) => {
            if (!value.x || !value.y) {
                throw new Error('Invalid location.');
            }
        }
    });

};

const circle = new Circle(10);