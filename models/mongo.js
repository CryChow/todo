/**
 * Created by Cry on 2017/3/20.
 */
var mongoose = require('mongoose');
/*mongoose.connection.close();*/
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/mydb');

exports.mongoose = mongoose;