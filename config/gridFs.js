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
    var db =mongoose.connection.db,
        id = new ObjectID(id),
        store = new GridStore(db ,id, "r", {root: "fs"} );

    store.open(function(err, store){
        if(err) return fn(err);
        if((store.filename == store.fileId) && store.metadata && store.metadata.filename)
            store.filename = store.metadata.filename;
        return fn(null, store);
    });/*
    var fs_write_stream = fs.createWriteStream('write.txt');

    var readStream = gr_fs.createReadStream({ _id: id });

    readStream.pipe(fs_write_stream);

    fs_write_stream.on('close', fn);*/
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
    /*console.log("e");
    var db = mongoose.connection.db,
        options = parse(options);

    options.metadata.filename = name;

    return new GridStore(db, name, "w", options).open(function(err, file){
        console.log("f");
        if(err)
            return fn(err);

        return file.writeFile(path, fn);
    });*/
    var writestream = gr_fs.createWriteStream({
        filename: name
    });

    fs.createReadStream(path).pipe(writestream);

    writestream.on('close', function (file) {
        fn(null, file);
    });
};

var parse = function(options){
    var opts = {};

    if(options.length > 0){
        opts = options[0];
    }
    if(!opts.metadata){
        opts.metadata = {};
    }

    return opts;
};