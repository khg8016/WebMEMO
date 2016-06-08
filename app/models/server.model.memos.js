/**
 * Created by Jun on 2016-03-23.
 */
var mongoose= require('mongoose'),
    gridFs = require('../../config/gridFs'),
    Schema = mongoose.Schema;

var memoSchema = new Schema({
    title : {
        type: String,
        trim : true
    },
    contents : {
        type: String,
        required : 'contents is required',
        trim : true
    },
    creator : {
        type: Schema.ObjectId,
        ref : 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    color : {
        type: String,
        default: '#ffffcc'
    },
    files : [{
        type : mongoose.Schema.Types.Mixed
    }],
    comments : [{
        _id : {
            type : Schema.ObjectId
        },
        content : {
            type : String,
            trim : true
        },
        created : {
            type: Date
        } ,
        creator : {
            type: Schema.ObjectId,
            ref : 'User'
        }
    }]

});

memoSchema.methods.addFile = function(file, options, fn){
    var memo = this;

    return gridFs.putFile(file.path, file.name, options, function(err, result){
        memo.files.push(result);
        return memo.save(fn);
    });
};

mongoose.model('Memo', memoSchema);