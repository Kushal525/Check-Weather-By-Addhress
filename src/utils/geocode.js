const request = require('request')
const chalk = require('chalk')
const geocode = (address,callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoia3VzaGFsMjUiLCJhIjoiY2thM3VlajVsMDF4OTNwbzJqbGxnNTV0ayJ9.p-ojFUHrhSBxacsbjc-LSg&limit=1";

    request({ url,json: true},(error,{ body })=>{
        if(error){
            callback(chalk.blue("Unable to connect mapbox please check your internet",undefined))
        }else if(body.features.length===0){
            callback(chalk.blue("Location not found try for another location",undefined))
        }
        else{
        callback(undefined,{
           latitude: body.features[0].center[1],
           longitude: body.features[0].center[0],
           Place: body.features[0].place_name 
        })
        }
    })

}


module.exports = geocode