# karma-dhtml-reporter
A better html reporter for karma

## Disclaimer
This repo is brand new.. I will improve it over time.

## Install

    npm install karma-dhtml-reporter

## Use
    module.exports = function (config) {
        config.set({

              ...

            reporters: ['DHTML'],

            plugins: [

                   ...

                'karma-dhtml-reporter'
            ]
        })
    }

## Screenshot
![Screenshot](http://ibin.co/1pokkqMPY3Ua)