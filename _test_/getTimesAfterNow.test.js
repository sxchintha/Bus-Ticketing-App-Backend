const getTimesAfterNow = require('../controllers/timetable/getTimesAfterNow');

const times = [
    {
        timeFromBegin: '23:26',
        arivalTimeOnStart: '23:26',
        arivalTimeOnDestination: '00:26',
        route: '400/1',
        bus: {
            busNumber: 'BUS - 0002',
            busType: 'ac',
            busCapacity: 60,
            __v: 0
        }
    },
    {
        timeFromBegin: '20:05',
        arivalTimeOnStart: '00:00',
        arivalTimeOnDestination: '21:05',
        route: '400/1',
        bus: {
            busNumber: 'BUS - 0001',
            busType: 'normal',
            busCapacity: 60,
            __v: 0
        }
    }
]

const out = [
    {
        timeFromBegin: '23:26',
        arivalTimeOnStart: '23:26',
        arivalTimeOnDestination: '00:26',
        route: '400/1',
        bus: {
            busNumber: 'BUS - 0002',
            busType: 'ac',
            busCapacity: 60,
            __v: 0
        }
    }
]

test('Get times after now', () => {
    expect(getTimesAfterNow(times)).toEqual(out);
});