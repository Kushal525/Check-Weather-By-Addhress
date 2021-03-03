const request = require('request')
const chalk = require('chalk')
const forecast = (lat,long,callback) =>{
    const url = "https://api.weatherbit.io/v2.0/current?lat="+lat+"&lon="+long+"&key=205a627ab7a04aa4a0fdbccf8382f51e";

    request({  url, json: true }, (error, { body }) => {
        if(error){
            callback(chalk.blue("Unable to connect weatherbit please check your internet",undefined))
        }else if(body.error){
            callback(chalk.blue("Unable to load location",undefined))
        }else{
        callback(undefined,{
            cityname: body.data[0].city_name,
            temp: body.data[0].temp,
            timezone: body.data[0].timezone
        })
        //console.log(body)
        }
    })
}
module.exports=forecast