var _ = require('lodash');
var jade = require('jade');
var fs = require('fs');
var open = require('open');

var options = {
    outputFile: 'dhtml.html',
    exclusiveSections: true
}


var DHTMLReporter = function (logger, config, basePath) {
    var specs = [];
    //var suites = {};
    var browsers = {};


    options = _.defaults(config || {}, options);

    this.onSpecComplete = function (browser, result) {
        var b = browsers;

        if (typeof(b[browser.name]) == 'undefined') {
            b[browser.name] = {};
        }
        var s = b[browser.name];

        result.suite.forEach(function (item, idx) {
            if (typeof(s.suites) == 'undefined') {
                s.suites = {};
                //s.success = true;
            }

            if (typeof(s.suites[item]) == 'undefined') {
                s.suites[item] = {};
            }

            //s.success = s.success && result.success;

            s = s.suites[item];
        });

        if (typeof(s.tests) == 'undefined') {
            s.tests = [];
        }

        s.success = s.success && result.success;
        s.tests.push({
            description: result.description,
            success    : result.success,
            skipped    : result.skipped,
            time       : result.time,
            log        : result.log
        });

    };

    this.onRunComplete = function (browserList, result) {
        for (var browser in browsers) {
            this.setSuccess(browsers[browser], browser);
        }
        console.log('DHTML report wrote to ' + basePath+options.outputFile);
        fs.unlinkSync(basePath+options.outputFile);
        fs.writeFile(basePath+options.outputFile, jade.renderFile(__dirname+'/themes/default/index.jade', {
            summary: result,
            data   : browsers,
            config : options,
            accordionConfig: this.getAccordionConfig()
        }));
        browsers={};
        //open(options.outputFile);
    };

    this.getAccordionConfig=function(){
        var cfg={};
        cfg['close nested']=true;
        cfg['exclusive'] = !! options.exclusiveSections;

        return JSON.stringify(cfg);
    };

    this.setSuccess = function (collection, collectionName, prefix) {

        prefix = (prefix || '') + '.';

        //console.log(prefix+'Calculating success for '+collectionName);

        // Start with success
        collection.success = true;

        // If a test within this collection failed, it fails
        if (typeof(collection.tests) != 'undefined') {
            //console.log(prefix+'  found '+collection.tests.length+' tests');
            for (var idx = 0; idx < collection.tests.length; idx++) {
                if (collection.tests[idx].success) {
                    //console.log(prefix+'    '+collection.tests[idx].description+' succeeds');
                } else {
                    //console.log(prefix+'    '+collection.tests[idx].description+' FAILS');
                    collection.success = false;
                }
            }
        }

        // If a collection contains a number of collections, it fails if any of those collections fails
        if (typeof(collection.suites) != 'undefined') {
            //console.log(prefix+'  found '+Object.keys(collection.suites).length+' suites');
            for (var suite in collection.suites) {
                if (this.setSuccess(collection.suites[suite], suite, prefix)) {
                    //console.log(prefix+'    '+suite+' succeeds');
                } else {
                    //console.log(prefix+'    '+suite+' succeeds');
                    collection.success = false;
                }
            }
        }

        //console.log(prefix+' '+collectionName+' : '+(collection.success?'Passed':'Failed'));
        return collection.success;

    };
};

DHTMLReporter.$inject = ['logger', 'config.dhtmlReporter','config.basePath'];


module.exports = {
    'reporter:DHTML': ['type', DHTMLReporter]
};
