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

    fs.createReadStream(path).pipe(writestream);

    writestream.on('close', function (file) {
        fn(null, file);
    });
};