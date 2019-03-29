
const createTestCafe = require('testcafe');
const pathBuilder = require('./pathBuilder');
//require('./pathBuilder');
let testcafe         = null;

createTestCafe('localhost', 1337, 1338)
    .then(tc => {
        testcafe     = tc;
        const runner = testcafe.createRunner();
        pathBuilder.setPath(Date.now());           
        //this.pathBuild = pathBuilder.getPath();
        console.log('Create folder: '+pathBuilder.getPath());
        pathBuilder.newFolder(pathBuilder.getPath());
        console.log('TestCafe | record.js : runner initialized !');
        try {
            runner.video(pathBuilder.getPath(), {
                singleFile: false,
                failedOnly: false,
                pathPattern: '/${FIXTURE}.mp4'
            });
        } catch (error) {
            console.log('TestCafe | record.js :'+error);
        }
       

        return runner
            .src(['./tutorials/2Dlayer.tuto.js','./tutorials/3Dlayer.tuto.js'])
            //.src(['./test/2Dlayer.test.js'])
            .browsers(['firefox'])
            .run();
            
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testcafe.close();
    });