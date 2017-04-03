/**
 * Created by Cry on 2017/3/20.
 */
var mongodb = require('./mongo.js');

var Schema = mongodb.mongoose.Schema;

var TodoSchema = new Schema({

    content: String,
    status: Boolean,
    isDel: Boolean
});
var TodoModel = mongodb.mongoose.model('Todo', TodoSchema);

function Todo(content, status, isDel) {

    this.content = content;
    this.status = status;
    this.isDel = isDel;
};

Todo.prototype.save = function(todo, callback) {

    var todo = {
        content: todo.content,
        status: todo.status,
        isDel: todo.isDel
    };

    var newTodo = new TodoModel(todo);

    newTodo.save(function (err, todo) {
        if (err) {
            return callback(err);
        }
        callback(null, todo);
    });
};

Todo.prototype.get = function(callback) {

    TodoModel.find({status:true, isDel: false}, function (err, todos) {
        if (err) {
            return callback(err);
        }
        callback(null, todos);
    });
};

Todo.prototype.getAll = function(callback) {

    TodoModel.find(function (err, todos) {
        if (err) {
            return callback(err);
        }
        callback(null, todos);
    });
};

Todo.prototype.trueStatus = function(id, callback) {

    TodoModel.update({_id: id}, {$set: { status: true } }, function(err) {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};
Todo.prototype.falseStatus = function(id, callback) {

    TodoModel.update({_id: id}, {$set: { status: false } }, function(err) {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};
Todo.prototype.delete = function(id, callback) {

    TodoModel.update({_id: Object(id)}, {$set: {isDel: true } }, function(err) {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

module.exports = Todo;