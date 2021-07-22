const express= require("express");
const app= express();
const port= 8000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({extended: true}));

const db= require("./config/mongoose")
const list= require("./models/mongodb")

app.use((express.static(__dirname + '/views')));

app.get('/', function(req,res){
    list.find({}, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            res.render('index', {
                title: 'To-Do List',
                todos: data
            })
        }
    })
    
});

app.post('/add', function(req,res){
    list.create({
        desc: req.body.desc,
        category: req.body.type,
        date: req.body.when
    },function(err, data){
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
            res.redirect('back');
        }
    })
});

app.get('/delete', function(req,res){
    let arr= req.query.id;
    if((!Array.isArray(arr))){
        list.findByIdAndDelete(arr, function(err){
            if(err){
                return console.log(err);
            }
        })
          res.redirect('back');
    }
    else{
        for( let i of arr){
            list.findByIdAndDelete(i, function(err){
                if(err){
                    return console.log(err);
                }
            }) 
        }
        res.redirect('back');
    }
    // console.log(arr.length);
    // for( let i of arr){
    //     console.log(i);
    // }
})


app.listen(port, function(err){
    if(err){
        console.log(`Error is: ${err}`);
    }
    else{
        console.log(`Yay up on port: ${port}`);
    }
});