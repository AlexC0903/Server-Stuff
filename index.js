
// ensure the DB is created before running this code

const MongoClient = require("mongodb").MongoClient;
const bodyParser= require('body-parser')
const assert = require("assert");
const express = require("express")
const app = express()

// MongoDB Connection url

const mongoConnectionURL = "mongodb://localhost:27017";

// Database Name
const dbName = "projects";

// Connect using MongoClient
MongoClient.connect(
    mongoConnectionURL, 
    {useUnifiedTopology: true},
    function (error, client) {
        app.use(bodyParser.urlencoded({extended: true}))
        app.set('view engine', 'ejs')
        // TODO: check ftor the existance of the DB
        const projectsDB = client.db(dbName);
        
        app.use("/spider", express.static("public"))
        app.get("/", (req, res) => res.send("Hello World!"))
        app.get("/hello_bob", (req, res) => res.send("Hello Bob!"))
        app.get("/hello_2", (req, res) => res.send("Test"))
        app.get("/hello*", (req, res) => res.send("Hello anything!"))

        app.post("/submitQuotes", 
            (req, res) => {
                // learn bout forms
                // res.send("Form Submitted!")
                // console.log(req.body);
                // db stuff for reals
                projectsDB.collection('quotes').insertOne(req.body, (err, result) => {
                    if (err) return console.log(err)
                
                    console.log('saved to database')
                    res.redirect('/quotes')
                })
            }
        );

        // app.post("/pickRandom", (req, res) => {
        //     res.redirect("/spider/picker.html")
        // });

        app.get("/quotes", (req, res) => {
            projectsDB.collection('quotes').find().toArray(function(err, results) {
              console.log(results)
              // send HTML file populated with quotes here
              if (err) return console.log(err)
              // renders index.ejs
              res.render('index.ejs', {quotes: results})
            })
        })



        const port = 3000
        app.listen(port, () => console.log(`app listening on port ${port}!`))
    }
);





// const express = require('express')
// const app = express()
// const MongoClient = require('mongodb').MongoClient
// const bodyParser= require('body-parser')
// express.static('public')
// const port = 3000

// app.use(bodyParser.urlencoded({extended: true}))
// var db

// MongoClient.connect('link-to-mongodb', (err, database) => {
//   // ... start the server
// })



// MongoClient.connect('your-mongodb-url', (err, client) => {
//     if (err) return console.log(err)
//   db = client.db('star-wars-quotes') // whatever your database name is
//     app.listen(3000, () => {
//     console.log('listening on 3000')})
// })



// app.use('/spider', express.static('public'))
// app.get('/', (req, res) => res.send('Hello World!'))
// app.get('/hello_bob', (req, res) => res.send('Hello Bob!'))
// app.get('/hello_2', (req, res) => res.send('Test'))
// app.get('/hello*', (req, res) => res.send('Hello anything!'))
// app.post('/quotes', (req, res) => {
//     db.collection('quotes').save(req.body, (err, result) => {
//         if (err) return console.log(err)
//         console.log('saved to database')
//         res.redirect('/')
//     })
// })

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

