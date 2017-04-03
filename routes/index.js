var express = require('express');
var Todo = require("../models/todo.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var todo = new Todo();
    todo.get(function(err, todoBack){
        res.render('index', { allContent: todoBack});
    });
});

router.get('/add', function(req, res) {
    var content = req.query.content;
    var todo = new Todo(content, true, false);
    todo.save(todo, function(err, todoBack){
        if (err) {
            res.writeHead(500);
        } else {
            res.writeHead(200);
        }
        res.write(todoBack.id);
        res.end();
    });
});

router.get('/statusT', function(req, res) {
    var id = req.query.id;
    var todo = new Todo();
    todo.trueStatus(id, function(err){
        if (err) {
            res.writeHead(500);
        } else {
            res.writeHead(200);
        }
        res.end();
    });
});
router.get('/statusF', function(req, res) {
    var id = req.query.id;
    var todo = new Todo();
    todo.falseStatus(id, function(err){
        if (err) {
            res.writeHead(500);
        } else {
            res.writeHead(200);
        }
        res.end();
    });
});
router.get('/delete', function(req, res) {
    var id = req.query.id;
    var todo = new Todo();
    todo.delete(id, function(err){
        if (err) {
            res.writeHead(500);
        } else {
            res.writeHead(200);
        }
        res.end();
    });
});

module.exports = router;