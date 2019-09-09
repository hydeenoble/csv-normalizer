# csv-normalizer

## How to Build and Run
* Clone the Repo
```
git clone https://github.com/hydeenoble/csv-normalizer.git
```
* Install Dependecies
```
npm install
```
* Run application
```
node app.js /path/to/csv/file
```

## Assumptionps on the input file
* Input CSV is UTF-8
* First row contains column headers
* Columns are always in same order as follows: Timestamp, Address, ZIP, FullName, FooDuration, BarDuration, TotalDuration, Notes