 class pathBuilder{
    constructor(){
        console.log('PathBuilder Initialized !')
        this.folderPath = './test/videos/';
        this.filepath = './test/pathBuilder.txt';
        this.path;
        this.fs = require('fs');
    }
    
    getPath(){
        console.log('GET PATH '+this.folderPath+this.readPath())
        return this.folderPath+this.readPath();
    }

    newFolder(path){
        if (!this.fs.existsSync(path.toString())){
            this.fs.mkdirSync(path.toString());
        }
    }
    savePath(path){
        this.fs.writeFileSync(this.filepath, path, function (err) {
            if (err) throw err;
            console.log('path : '+path+' saved !');
        });
    }

    readPath(){
        if (this.fs.existsSync(this.filepath)){
            console.log('ReadPath : File exist');
            return this.fs.readFileSync(this.filepath, 'utf8');
        }
        else{
            console.log('ERROR no file '+filepath);
            return 'undefined';
        }
        
    }

    
    
}

function readPath(fs, filepath){
    if (fs.existsSync(filepath)){
        console.log('ReadPath : File exist');
        fs.readFile(filepath, (err, data) => {
            if (err) throw err;
            console.log('ReadPath : '+data);    
            return data.toString();  
        });
    }
    else{
        console.log('ERROR no file '+filepath);
        return 'undefined_';
    }
    
}
module.exports = pathBuilder;
