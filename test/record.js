
const createTestCafe = require('testcafe');
const pathBuilder = require('./pathBuilder');
//require('./pathBuilder');
let testcafe         = null;

createTestCafe('localhost', 1337, 1338)
    .then(tc => {
        testcafe     = tc;
        const runner = testcafe.createRunner();
        new pathBuilder().savePath(Date.now());           
        this.pathBuild = new pathBuilder().getPath();
        new pathBuilder().newFolder(this.pathBuild);
        console.log('TestCafe | record.js : runner initialized !');
        try {
            runner.video(this.pathBuild, {
                singleFile: false,
                failedOnly: false,
                pathPattern: '/${FIXTURE}.mp4'
            });
        } catch (error) {
            console.log('TestCafe | record.js :'+error);
        }
       

        return runner
            .src(['./test/basic.test.js','./test/2Dlayer.test.js','./test/3Dlayer.test.js'])
            //.src(['./test/2Dlayer.test.js'])
            .browsers(['firefox'])
            .run();
            
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testcafe.close();
    });