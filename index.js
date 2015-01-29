//var _ = require('lodash');
var jade = require('jade');
var fs = require('fs');
var open = require('open');

var options = {
    outputFile: 'dhtml.html'
}


var DHTMLReporter = function (logger, config) {
    var specs = [];
    //var suites = {};
    var browsers = {};

    this.onSpecComplete = function (browser, result) {
        var b = browsers;

        if(typeof(b[browser.name])=='undefined'){
            b[browser.name]={};
        }
        var s = b[browser.name];

        result.suite.forEach(function (item,idx) {
            if(typeof(s.suites)=='undefined'){
                s.suites = {};
                //s.success = true;
            }

            if (typeof(s.suites[item]) == 'undefined') {
                s.suites[item] = {  };
            }

            //s.success = s.success && result.success;

            s = s.suites[item];
        });

        if(typeof(s.tests)=='undefined'){
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
        for(var browser in browsers){
            console.log('\n\n\n');
            this.setSuccess(browsers[browser], browser);
        }
        fs.writeFile(options.outputFile, jade.renderFile(__dirname + '/themes/default/index2.jade', {
            summary: result,
            data : browsers
        }));
        //open(options.outputFile);
    };

    this.setSuccess=function(collection,collectionName,prefix){

        prefix=(prefix || '')+'.';

        //console.log(prefix+'Calculating success for '+collectionName);

        // Start with success
        collection.success=true;

        // If a test within this collection failed, it fails
        if(typeof(collection.tests)!='undefined'){
            //console.log(prefix+'  found '+collection.tests.length+' tests');
            for(var idx=0; idx<collection.tests.length; idx++){
                if(collection.tests[idx].success){
                    //console.log(prefix+'    '+collection.tests[idx].description+' succeeds');
                }else{
                    //console.log(prefix+'    '+collection.tests[idx].description+' FAILS');
                    collection.success=false;
                }
            }
        }

        // If a collection contains a number of collections, it fails if any of those collections fails
        if(typeof(collection.suites)!='undefined'){
            //console.log(prefix+'  found '+Object.keys(collection.suites).length+' suites');
            for(var suite in collection.suites){
                if(this.setSuccess(collection.suites[suite],suite,prefix)){
                    //console.log(prefix+'    '+suite+' succeeds');
                }else{
                    //console.log(prefix+'    '+suite+' succeeds');
                    collection.success=false;
                }
            }
        }

        //console.log(prefix+' '+collectionName+' : '+(collection.success?'Passed':'Failed'));
        return collection.success;

    };

    this.baksetSuccess=function(collection,prefix){
        var tSuccess=true;
        var cSuccess=true;
        prefix=(prefix||'')+'.';
        if(typeof(collection.tests)!='undefined'){

            collection.tests.forEach(function(test){
                console.log(prefix.replace(/\./g,'-')+' '+test.description +' '+(test.success?'Y':'N')+(tSuccess?'Y':'N')+((tSuccess && test.success)?'Y':'N'));
               tSuccess = tSuccess && test.success;
            });
        }

        console.log('success: '+ (cSuccess?'Y':'N')+(tSuccess?'Y':'N'));

        if(typeof(collection.suites)!='undefined'){
            for( var suiteName in collection.suites ){
                //cSuccess=true;
                console.log(prefix+suiteName+(cSuccess?'Y':'N')+(tSuccess?'Y':'N')+((cSuccess && tSuccess)?'Y':'N'));
                cSuccess = cSuccess && this.setSuccess(collection.suites[suiteName],prefix);
                console.log('->'+prefix+suiteName+(cSuccess?'Y':'N')+(tSuccess?'Y':'N')+((cSuccess && tSuccess)?'Y':'N'));
            }
        }

        collection.success = tSuccess && cSuccess;
        return collection.success;
    }

};

DHTMLReporter.$inject = ['logger', 'config.DHTMLReporter'];


module.exports = {
    'reporter:DHTML': ['type', DHTMLReporter]
}