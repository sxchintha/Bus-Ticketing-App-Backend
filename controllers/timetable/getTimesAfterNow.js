// get only the times after now
const getTimesAfterNow = (times) => {
    const now = new Date();
    const timesAfterNow = times.filter(time => {
        const timeArr = time.arivalTimeOnStart.split(':');
        const timeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), timeArr[0], timeArr[1]);
        return timeDate > now;
    });
    return timesAfterNow;
}

module.exports = getTimesAfterNow;