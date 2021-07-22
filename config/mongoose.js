const mongoose= require('mongoose');

//to connect to mongodb and create a new db
mongoose.connect('mongodb://localhost:27017/todolist', {useNewUrlParser: true, useUnifiedTopology: true});


//to check the connection
const db= mongoose.connection;


//handler for error
db.on('error', console.error.bind(console, "Error"));

//to show once connection is successful
db.once('open', function(){
    console.log("yay db connected");
});