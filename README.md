# karma-dhtml-reporter
[![NPM](https://nodei.co/npm/karma-dhtml-reporter.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/karma-dhtml-reporter/)


A better html reporter for karma

## ChangeLog
### 0.2.5
 - Fixed Error caused in recent karma version.

### 0.2.4
 - Added `openReportInBrowser` option to open the report in the browser after the test concludes.

### 0.2.3
 - Fixed bug where when `singleRun` mode is off, it renders an aggregated list leading to incorrect

### 0.2.2
 - Added Badge

### 0.2.1
 - Added SemanticUi Icons to the stack
 - Icons for success/failure indicators on tests
 - `exclusiveSections` config setting
 - More Prominent error logging

## Install

    npm install karma-dhtml-reporter

## Use
    module.exports = function (config) {
        config.set({

              ...
            dhtmlReporter: {
                'outputFile' : 'output/file/location/report.html',
                'exclusiveSections': true,
                'openReportInBrowser': false
            },

            reporters: ['DHTML'],

            plugins: [

                   ...

                'karma-dhtml-reporter'
            ]
        })
    }

## Config
### outputFile [dhtml.html]
This indicates where you want the output file to be generated

### exclusiveSections [true]
If true, it only allows one section amidst its siblings to be open at a given time.
Disable to allow opening multiple sections.

### openReportInBrowser [false]
If true, it will open the generated report in your default browser. (uses `open` package from npm - check for supported platforms)



## Screenshot
![Screenshot](http://ibin.co/1pokkqMPY3Ua)

