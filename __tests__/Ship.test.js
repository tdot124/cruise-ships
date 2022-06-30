const Ship = require('../src/Ship');
const Port = require('../src/Port');
const Itinerary = require('../src/Itinerary');

describe('Ship constructor', () => {
    it('returns an object', () => {
        const port = new Port('Dublin');
        const itinerary = new Itinerary(port);
        const ship = new Ship(itinerary);
        expect(ship).toBeInstanceOf(Object);
    });

    it('has a starting port + null previous port', () => {
        const port = new Port('Dublin');
        const itinerary = new Itinerary([port]);
        const ship = new Ship(itinerary);
        
        expect(ship.currentPort).toBe(port);
        expect(ship.previousPort).toBe(null);
    });
});

describe('setting sail method', () => {
    it('can set sail + sets previous port', () => {
        const dublin = new Port('Dublin');
        const rosslare = new Port('Rosslare')
        const itinerary = new Itinerary([dublin,rosslare]);
        const ship = new Ship(itinerary);

        ship.setSail();

        expect(ship.currentPort).toBeFalsy();
        expect(ship.previousPort).toBe(dublin);
    });

    it('can\'t sail further than it\'s itnerary', () => {
        const dublin = new Port('Dublin');
        const rosslare = new Port('Rosslare');
        const itinerary = new Itinerary([dublin,rosslare])
        const ship = new Ship(itinerary);

        ship.setSail();
        ship.dock();

        expect(() => ship.setSail()).toThrowError('End of itinerary reached');

    });
});

describe('dock method', () => {
    it('can dock', () => {
        const dublin = new Port('Dublin');
        const rosslare = new Port('Rosslare');
        const itinerary = new Itinerary([dublin,rosslare])
        const ship = new Ship(itinerary);

        ship.setSail();
        ship.dock();

        expect(ship.currentPort).toBe(rosslare);
    });
});

