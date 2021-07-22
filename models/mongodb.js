const mongoose= require('mongoose');

const listSchema= new mongoose.Schema({
    desc:"String",
    category: "String",
    date: "Date"
});

const list = mongoose.model('list', listSchema);

module.exports=list;