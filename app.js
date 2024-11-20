const express = require('express');

//express app
const app = express();


//register view engine 

app.set('view engine', 'ejs')
//listen for requests 

app.listen(3000);

app.get('/',(req,res)=>{

    const blogs = [
        {
            title: "Understanding JavaScript Closures",
            snippet: "Closures are a powerful feature in JavaScript that allow inner functions to access variables from their outer scope even after the outer function has returned."
        },
        {
            title: "An Introduction to Laravel",
            snippet: "Laravel is a popular PHP framework that makes web development simple and elegant, offering features like routing, authentication, and Eloquent ORM."
        },
        {
            title: "Top React Hooks You Should Know",
            snippet: "React hooks like useState, useEffect, and useReducer simplify functional component logic and enhance state management."
        },
        {
            title: "Why You Should Learn Node.js",
            snippet: "Node.js enables developers to build scalable, real-time, and efficient backend systems using JavaScript."
        },
        {
            title: "CSS Grid vs. Flexbox: When to Use Which",
            snippet: "CSS Grid and Flexbox are powerful layout systems, but they are best suited for different types of layout challenges."
        }
    ];
    
    
    // res.send('<p>Express </p>')
    res.render('index',{title : 'Home' , blogs: blogs})    
})

app.get('/about',(req,res)=>{
    // res.send('<p>Express </p>')
    // res.sendFile('./views/about.html',{root : __dirname});
    res.render('about',{title : 'About'});

})

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title : 'Create Blog'})
})

app.use((req,res)=>{
    // res.status(404).sendFile('./views/404.html',{root : __dirname});
    res.status(404).render('404',{title : '404'});

})