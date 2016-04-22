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
    console.log(path);
    var writestream = gr_fs.createWriteStream({
        filename: name,
        mode: 'w',
        content_type : options.content_type
    });

    fs.createReadStream(path).pipe(writestream); //path를 읽고 path에 맞게 writestream에 쓴다

    writestream.on('close', function (file) { // 끝나면 db에 파일 저장

        fn(null, file);

    });
};