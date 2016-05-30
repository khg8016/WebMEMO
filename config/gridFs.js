/**
 * Created by Aplus on 2016-04-19.
 */

var mongoose = require('mongoose'),
    gr = require("gridfs-stream"),
    gr_fs = gr(mongoose.connection.db , mongoose.mongo),
    fs = require('fs');


exports.get = function(id, fn){

    var fs_write_stream = fs.createWriteStream('write.txt');

    var readStream = gr_fs.createReadStream({ _id: id });

    readStream.pipe(fs_write_stream);

    fs_write_stream.on('close', fn);
};

exports.putFile = function(path, name, options, fn){
    var writestream = gr_fs.createWriteStream({
        filename: name,
        mode: 'w',
        content_type : options.content_type
    });
    //file을 올리면 자동으로 appdata에 저장됨. 거기에 있는 걸 읽고 writestream을 통해 data를 써서 file을 만들고 db에 저장함.
    fs.createReadStream(path).pipe(writestream); //path를 읽고 writestream에 data를 씀.

    writestream.on('close', function (file) { // data를 db에 파일 저장
        fn(null, file);//db에 저장하는 call-back
    });
};