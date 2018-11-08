const express = require('express')
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname +  '/views/partials')
app.set('view engine', 'hbs')//app.set : set express config

//Maintainence middleware
// app.use((req, res, next) => {
//     res.render('maintainence');
// })

app.use(express.static(__dirname + '/public'));


//Custom middleware to tell us what our server is doing
app.use((req, res, next) => {
     var now = new Date().toString();
     var log = `${now}: ${req.method} ${req.url }`//time of request, method and the direction
     console.log(log)
     fs.appendFile('server.log', log + '\n', (err) =>{
         if(err){
             console.log('Unable to append to server.log')
         }
     });
     next();
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamit', (text) => {
    return text.toUpperCase();
})

// app.use adds on middleware which tweaks the way express works
app.get('/', (req, res) => {
    // res.send('<h1>hello express</h1>');
    res.render('home', {
        pageTitle: "Home",
        welcomeMessage: "Welcome to the homepage"
    });
});

// req stores a lot of information about the request coming in: any headers that were used, any body information, headers used, methods used
// res has a bunch of methods that can be used to respond to the request
app.get('/about', (req, res) =>{

    res.render('about', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res)=> {
    res.send({
        errorMessage: 'Error Message'
    });
});


app.listen(3000, () => {
    console.log('App is running on Port 3000')

});
