let moment = require("moment-timezone");
class Helper {

    /**
     * 
     * @param {Number} zipCode
     * All ZIP codes should be formatted as 5 digits. If there are less than 5 digits, assume 0 as the prefix.
     */
    zipCodeFormatter(zipCode) {
        let zipCodeString = zipCode.toString();
        if (zipCodeString.length < 5) {
            return zipCodeString.padStart(5, "0");
        } 
        return zipCode;
    }

    /**
     * 
     * @param {String} fullName 
     * All name columns should be converted to uppercase. There will be non-English names.
     */
    fullNameFormatter(fullName) {
        return fullName.toUpperCase();
    }
    
    /**
     * 
     * @param {String} time 
     * The columns `FooDuration` and `BarDuration` are in HH:MM:SS.MS
     * format (where MS is milliseconds); please convert them to a floating point seconds format.
     */
    timeConverter(time) {
        try {
            let timeArray = time.split(":");
            let hour = timeArray[0] * 60 * 60;
            let minutes = timeArray[1] * 60;
            let secondsArray = timeArray[2].split(".");
            let milliseconds = secondsArray[1] / 1000;
            return hour + minutes + secondsArray[0] + milliseconds;
        } catch (error) {
            throw new Error("Invalid Duration");
        }
    }
    
    /**
     * 
     * @param {String} str 
     * Replace invalid UTF-8 character with the Unicode Replacement Character
     */
    normalizeUTF8(str) {
        const regx = /(?!([\u{0000}-\u{007F}]|[\u{0080}-\u{07FF}]|[\u{0800}-\u{FFFF}]|[\u{10000}-\u{10FFFF}]))/gu;
        return str.replace(regx, "\ufffd");
    }

    /**
     * 
     * @param {String} timestamp 
     * The Timestamp column should be formatted in ISO-8601 format.
     * The Timestamp column should be assumed to be in US/Pacific time; 
     * please convert it to US/Eastern.
     */
    timeStampConverter(timestamp) {
        let convertTimeStamp = moment.tz(
            timestamp,
            "MM/DD/YY hh:mm:ss a",
            "US/Pacific"
        );
        if (!convertTimeStamp.isValid()) throw new Error("Invalid timestamp");
        return convertTimeStamp.tz("US/Eastern").format();
    }
}

module.exports = Helper;
