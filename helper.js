let moment = require("moment-timezone");
class Helper {
    zipCodeFormatter(zipCode) {
        let zipCodeString = zipCode.toString();
        if (zipCodeString.length < 5) {
            return parseInt(zipCodeString.padStart(5, "0"));
        } else {
            return zipCode;
        }
    }

    fullNameFormatter(fullName) {
        return fullName.toUpperCase();
    }

    /**Convertime Given time in HH:MS:SS.MS to second floating format */
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
    
    
    /*replace invalid UTF-8 character with the Unicode Replacement Character*/
    normalizeUTF8(str) {
        const regx = /(?!([\u{0000}-\u{007F}]|[\u{0080}-\u{07FF}]|[\u{0800}-\u{FFFF}]|[\u{10000}-\u{10FFFF}]))/gu;
        return str.replace(regx, "\ufffd");
    }

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
