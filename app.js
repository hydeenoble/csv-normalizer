let converter = require("json-2-csv");
let Helper = require("./helper");
let readline = require("readline");

let helper = new Helper();
let stdinData = "";

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on("line", line => {
    stdinData += line + "\n";
}).on("close", () => {
    let convertedStdinData = converter.csv2jsonAsync(helper.normalizeUTF8(stdinData));
    convertedStdinData
        .then(rows => {
            rows.forEach((row, index) => {
                try {
                    row.Timestamp = helper.timeStampConverter(row.Timestamp);
                    row.ZIP = helper.zipCodeFormatter(row.ZIP);
                    row.FullName = helper.fullNameFormatter(row.FullName);
                    row.FooDuration = helper.timeConverter(row.FooDuration);
                    row.BarDuration = helper.timeConverter(row.BarDuration);
                    row.TotalDuration = parseFloat(row.FooDuration) + parseFloat(row.BarDuration);
                    row.Notes = row.Notes;
                    row.Address = row.Address;
                } catch (error) {
                    console.log("Warning:", error.message + "on row " + (index + 1));
                    rows.splice(index, 1);
                }
            });
            return rows;
        })
        .then(jsonData => {
            return converter.json2csvAsync(jsonData);
        })
        .then(csvData => {
            console.log(csvData);
        })
        .catch(err => console.log("ERROR: " + err.message));
});
