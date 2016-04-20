/**
 * Created by Jun on 2016-03-21.
 */
var mongoose= require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema,
    userSchema = new Schema({
        username : {
            type : String,
            unique : true,
            required : 'Username is required',
            trim : true
        },
        password: {
            type: String,
            // Validate the 'password' value length
            validate: [
                function(password) {
                    return password.length > 5;
                },
                'Password Should Be Longer'
            ]
        },
        salt: {
            type: String
        },
        boards: [{
            type: Schema.ObjectId,
            ref : 'Board'
        }]
    });

userSchema.methods.authenticate = function(password){
    return this.hashPassword(password) === this.password;
};

userSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};
userSchema.methods.newSalt = function(){
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
};

mongoose.model('User', userSchema);