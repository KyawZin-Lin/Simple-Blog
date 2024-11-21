const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog =require('./models/blog');
//express app
const app = express();


// connect to MongoDB
const dbURI ='mongodb+srv://kyawzinlinforgit:1022004Kzl@testingcluster.p8glw.mongodb.net/blog_db?retryWrites=true&w=majority&appName=TestingCluster';
mongoose.connect(dbURI)
.then((result)=>{
    app.listen(3000);
}).catch((err)=>{
    console.log(err)
});
//register view engine 
app.set('view engine', 'ejs')
//listen for requests 



// middleware and static files
app.use(express.static('public'))
app.use(morgan('dev'));
app.use(express.urlencoded({extended :true}))



app.get('/',(req,res)=>{

   res.redirect('/blogs');
   
})

app.get('/about',(req,res)=>{
    // res.send('<p>Express </p>')
    // res.sendFile('./views/about.html',{root : __dirname});
    res.render('about',{title : 'About'});

})
//blogs routes

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt : -1})
    .then((result)=>{
         res.render('index',{title : 'Home' , blogs: result})    
    }).catch((err)=>{
        console.log(err);
    })
})
app.get('/blogs/create',(req,res)=>{
    res.render('create',{title : 'Create Blog'})
})

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);
    blog.save().then(()=>{
        res.redirect('/blogs');
    }).catch((err)=>{
        console.log(err);
    })
})


// app.get('/add-blog',(req,res)=>{
//     const blog = new Blog({
//         title : 'Testing Blog 2',
//         snippet : 'This is a testing blog 2',
//         body : 'This is the body of the blog 2'
//     });

//     blog.save().then((result)=>{
//         res.send(result);
//     }).catch((err)=>{
//        console.log(err);
//     })
// });

// app.get('/get-blogs', (req,res)=>{
//     Blog.find().then((result)=>{
//         res.send(result);
//     }).catch((err)=>{
//        console.log(err);
//     })
// })

// app.get('/get-single-blog',(req,res)=>{
//     Blog.findById(req.query.id).then((result)=>{
//         res.send(result);
//     }).catch((err)=>{
//        console.log(err);
//     })
// })

app.use((req,res)=>{
    // res.status(404).sendFile('./views/404.html',{root : __dirname});
    res.status(404).render('404',{title : '404'});

})