/**
 * Created by Jun on 2016-03-23.
 */

var mongoose = require('mongoose'),
    Memo = mongoose.model('Memo'),
    Board = mongoose.model('Board'),
    gridFs = require('../../config/gridFs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);


var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

module.exports.create = function(req, res){
    var memo = new Memo(req.body);

    memo.creator = req.user;
    req.board.memos.push(memo);

    req.board.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
    });
    memo.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(memo);
        }
    });
};

module.exports.read = function(req, res){
    res.json(req.memo);
};

module.exports.update = function(req, res){
    var memo = req.memo;

    memo.title = req.body.title;
    memo.contents = req.body.contents;

    memo.save(function(err){
           if(err){
               return res.status(400).send({
                   message: getErrorMessage(err)
               });
           } else{
               res.json(memo);
           }
    });
};

module.exports.delete = function(req, res){
    var memo = req.memo,
        memos = req.board.memos;

    memo.remove(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            for(var i= 0, len = memos.length; i< len; i++){//user의 보드 목록에서도 제거
                if(memos[i]._id == memo._id) {
                    memos.splice(i, 1);
                }
            }
            req.board.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        message: getErrorMessage(err)
                    });
                }
            });
            res.json(memo);
        }
    });
};

module.exports.deleteFile = function(req, res){
    var memo = req.memo,
        files = memo.files,
        fileId = req.params.fileId;

    for(var i in files){
        console.log(files[i]._id + "/" + fileId);
        console.log(files[i]._id == fileId);
        if(files[i]._id == fileId) {
            files.splice(i, 1);
        }
    }

    memo.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(memo);
        }
    });

};

module.exports.fileUpload = function(req, resp){
    var memo = req.memo,
        opts = {
            content_type : req.files.file.type
        };

    return memo.addFile(req.files.file, opts, function(err, result){
        if(err) console.log(err.message);
        return resp.json(memo);
    });

};

module.exports.fileDownload = function(req, res){
    var memo = req.memo,
        fileId = req.params.fileId,
        bufs = [],
        fbuf,
        base64,
        readstream;

    for(var i = 0, len = memo.files.length; i < len; i++){
        if(memo.files[i]._id == fileId){
            console.log("a"+memo.files[i]);
            console.log("b"+memo.files[i].length);
            console.log("c"+memo.files[i].filename);

                res.writeHead(200, {'Content-Type': memo.files[i].contentType});
                readstream = gfs.createReadStream({
                    filename: memo.files[i].filename
                });

                readstream.on('data', function(data) {
                    res.write(data);
                    console.log(data.byteLength);
                }).on('end', function() {
                    res.end();
                });
                readstream.on('error', function (err) {
                    console.log('An error occurred!', err);
                    throw err;
                });

            /*readstream = gfs.createReadStream({
             filename: memo.files[i].filename
             });

             readstream.on('data', function(data) {
             bufs.push(data);
             //res.write(data);
             }).on('end', function() {
             fbuf = Buffer.concat(bufs);
             base64 = (fbuf.toString('base64'));
             res.end('"data:image/jpeg;base64,' + base64 + '";');
             });

             readstream.on('error', function (err) {
             console.log('An error occurred!', err);
             throw err;
             });*/

            /* gfs.files.find({ filename: memo.files[i].filename }).toArray(function (err, files) {
             res.writeHead(200, {'Content-Type': files[0].contentType});
             console.log(files[0].length);
             console.log(files[1].length);
             readstream = gfs.createReadStream({
             filename: files[0].filename
             });

             readstream.on('data', function(data) {
             res.write(data);
             console.log(data.byteLength);
             }).on('end', function() {
             res.end();
             });
             readstream.on('error', function (err) {
             console.log('An error occurred!', err);
             throw err;
             });
             });*/


        }
    }
};



module.exports.memoById = function(req, res, next, id){
    Memo.findById(id).populate('creator comments.creator').exec(function(err, memo){
        if(err) return next(err);
        if(!memo) return next(new Error('Failed to load' | id));

        req.memo = memo;
        next();
    });
};

module.exports.memoList = function(req, res){
    res.json(req.board.memos);
};

exports.hasAuthorization = function(req, res, next){ //글 작성자가 수정이나 지우려고 할 때 너가 권한 갖고있니? 이거
    if(req.memo.creator.id !== req.user._id){ //글 작성자와 현재 유저가 같은지 확인
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};

