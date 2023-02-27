import { checkTemp } from '../streaming-service/src/check_incident';

describe('checkTemp function', () => {
    test('no logging within range', () => {
        const temp = 60;
        const time = Date.now();
        checkTemp(temp, time);
    });
});