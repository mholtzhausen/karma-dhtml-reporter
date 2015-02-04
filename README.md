# karma-dhtml-reporter
[![NPM](https://nodei.co/npm/karma-dhtml-reporter.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/karma-dhtml-reporter/)


A better html reporter for karma

## ChangeLog
### 0.2.1
- Added SemanticUi Icons to the stack
- Icons for success/failure indicators on tests
- `exclusiveSections` config setting
- More Prominent error logging
### 0.2.2
- Added Badge

## Install

    npm install karma-dhtml-reporter

## Use
    module.exports = function (config) {
        config.set({

              ...
            dhtmlReporter: {
                'outputFile' : 'output/file/location/report.html',
                'exclusiveSections': true
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
If true, it only allows one section amidst its sibblings to be open at a given time.
Disable to allow opening multiple sections.



## Screenshot
![Screenshot](http://ibin.co/1pokkqMPY3Ua)

