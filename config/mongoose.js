const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/todolist', {useNewUrlParser: true, useUnifiedTopology: true});

const db= mongoose.connection;

db.on('error', console.error.bind(console, "Error"));

db.once('open', function(){
    console.log("yay db connected");
});