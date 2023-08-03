//Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

//Create connection to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true});

//Create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

//Create model
const Comment = mongoose.model('Comment', commentSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

//Home page
app.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {comments: comments});
        }
    } );
});

//Post comment
app.post('/', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save((err, comment) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

//Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});