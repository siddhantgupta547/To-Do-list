const express= require("express");
const app= express();
const port= 8000;

//setting ejs as views engine and adding a route to the folder
app.set('view engine', 'ejs');
app.set('views', './views');

//middleware to get the things being passed by in URL
app.use(express.urlencoded({extended: true}));

const db= require("./config/mongoose")
const list= require("./models/mongodb")

//for all the static files ie css and js.
app.use((express.static(__dirname + '/views')));

//to get the homepage all the todos present in the database are shown here along with a form to add more.
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

//to add todos in the list using a post request
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

//to handle the delete todos request
app.get('/delete', function(req,res){
    let arr= req.query.id;
    //checking if multiple queries with same parameters are returned or just one
    if((!Array.isArray(arr))){
        list.findByIdAndDelete(arr, function(err){
            if(err){
                return console.log(err);
            }
        })
          res.redirect('back');
    }//if more than one are returned then all of them are deleted one by one using the loop
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

//Starting up server
app.listen(port, function(err){
    if(err){
        console.log(`Error is: ${err}`);
    }
    else{
        console.log(`Yay up on port: ${port}`);
    }
});