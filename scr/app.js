const request = require('request')
const express = require('express')
const path = require('path')
const hbs = require('hbs')

const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials/')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(publicDirectory))
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

const url = "https://newsapi.org/v2/everything?q=egypt&sortBy=currently&apiKey=af5befe59aad4c1fba33ec6b0130b615"

request({ url, json: true }, (error, response) => {

    app.get('*', (req, res) => {
   
     if (error) {
         res.render('error', {
           title: ' Error Not Found',
           desc: 'Error!'
         })
     } 
     
     else {
         res.render('index', {
           title1:response.body.articles[0].title,
           desc:response.body.articles[0].description,
           detail:response.body.articles[0].url
         })
     }
     })
   })
   
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

