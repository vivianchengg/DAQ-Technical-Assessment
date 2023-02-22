import fs from 'fs';

const interval = 5000;

let tempRecord: number[] = [];
const timeRecord: number[] = [];

const logIncident = (timestamp: number) => {
    const logMsg = `Battery Temperature exceeded Safe Operating Range: ${new Date(timestamp).toISOString()}\n`;
    fs.appendFile('./logs/incidents.log', logMsg, (error) => {
        if (error) {
            console.error(`Error writing to incidents.log: ${error}`);
        }
    });
}

let firstTime = 0;
export const checkTemp = (temp: number, time: number) => {
    const now = Date.now();

    if (temp < 20 || temp > 80) {
        tempRecord.push(temp);
        timeRecord.push(time);
    }

    // first instance out of range
    if (tempRecord.length == 1) {
        firstTime = time;
    }

    // when out of range temp appears more than 3 times
    // check whether in 5 seconds
    if (tempRecord.length > 3) {
        // console.log(now);
        // console.log(firstTime);
        if (now - firstTime <= interval) {
            logIncident(now);
            // console.log("*****LOGGING TIME*****")
            tempRecord = [];
        } else {
            tempRecord.shift();
            timeRecord.shift();
            firstTime = timeRecord[0];
        }
    }
}