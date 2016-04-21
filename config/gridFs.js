/**
 * Created by Aplus on 2016-04-19.
 */

var mongoose = require('mongoose'),
    gr = require("gridfs-stream"),
    gr_fs = gr(mongoose.connection.db , mongoose.mongo),
    fs = require('fs'),
    buffer = "";

var GridStore = mongoose.mongo.GridStore,
    Grid = mongoose.mongo.Grid,
    ObjectID = mongoose.Types.ObjectId;


exports.get = function(id, fn){

    var fs_write_stream = fs.createWriteStream('write.txt');

    var readStream = gr_fs.createReadStream({ _id: id });

    readStream.pipe(fs_write_stream);

    fs_write_stream.on('close', fn);
};

exports.put = function(buf, name, options, fn){
    var db = mongoose.connection.db,
        options = parse(options);

    options.metadata.filename = name;
    return new GridStore(db, name, "w", options).open(function(err, file){
        if(err) return fn(err);
        file.write(buf, true, fn);
    });

};
exports.putFile = function(path, name, options, fn){
    var writestream = gr_fs.createWriteStream({
        filename: name
    });

    fs.createReadStream(path).pipe(writestream);

    writestream.on('close', function (file) {
        fn(null, file);
    });
};