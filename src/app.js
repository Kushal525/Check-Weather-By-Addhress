const path = require("path")
const express = require("express")
const hbs = require("hbs")
const chalk=require('chalk')
const geocode=require("./utils/geocode")
const forecast=require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const htmlPagePath = path.join(__dirname, "../public")
const viewsPath =path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlerbars engine and views location 
app.set("view engine", "hbs")
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(htmlPagePath))
app.use(express.urlencoded({ extended : false}))

app.get('',  (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Kushal"
    })
  })

  app.get("/about", (req,res) => {
      res.render("about",{
          title: "About",
          name: "Kushal"
      })
  })
  
  app.get("/help", (req, res) =>{
      res.render("help", {
          title: "Help!",
          helpText: "This is some helpful text.  ",
          name: "Kushal"
      })
  })

  app.get('/weather',(req, res) =>{
    const address=req.query.address
    if(!address){
        return res.send({
            error:"Please enter the address"
        })
    }
    else{
    geocode(address,(error, {latitude, longitude, Place } = {} )=>{
        if(error){
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, {cityname, temp, timezone }) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                cityname: cityname,
                temp: temp,
                Place : Place,
                timezone: timezone
            })
          })
    
    })}
})

  app.get('/products', (req, res) => {

    if(!req.query.name){
        return res.send({
            error: "You must provide name"
        })
    }

      console.log(req.query.name)
      res.send({
          products: []
      })
  })

  app.get("/help/*", (req, res) => {
      res.render("404", {
          title:"404",
          errorMessage: "Help article not Found",
          name: "Kushal"
      })
  })

  app.get("*", (req, res) =>{
    res.render("404", {
        title: "404",
        name: "Kushal",
        errorMessage: "Page Not Found." 
    })
})

app.listen(port, () => {
    console.log("server is up on port "+ port)
})