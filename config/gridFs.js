/**
 * Created by Aplus on 2016-04-19.
 */

var mongoose = require('mongoose'),
    request = require('request');

var GridStore = mongoose.mongo.GridStore,
    Grid = mongoose.mongo.Grid,
    ObjectID = mongoose.Types.ObjectId;

exports.get = function(id, fn){
    var db = mongoose(),
        id = new ObjectID(id),
        store = new GridStore(db ,id, "r", {root: "fs"} );

        store.open(function(err, store){
            if(err) return fn(err);
            if((store.filename == store.fileId) && store.metadata && store.metadata.filename)
                store.filename = store.metadata.filename;
            return fn(null, store);
        });
};

exports.put = function(buf, name, options, fn){
    var db = mongoose.connection.db,
        options = parse(options);

    options.metadata.filename = name;
    new GridStore(db, name, "w", options).open(function(err, file){
        if(err) return fn(err);
        file.write(buf, true, fn);
    });

};

exports.putFile = function(path, name, options, fn){
    var db = mongoose.connection.db,
        options = parse(options);
    options.metadata.filename = name;

    new GridStore(db, name, "w", options).open(function(err, file){
        if(err) return fn(err);
        file.writeFile(path, fn);
    });
};

var parse = function(options){
    var opts = {};
    if(options.length > 0)
        opts = options[0];
    if(!opts.metadata)
        opts.metadata = {};
    return opts;
};