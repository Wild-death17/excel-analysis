const {response} = require("express");

async function Data_Implement(req,res,next){
    let data = res.response;
    console.log(data[0])
    for (let idx in data) {
    }

    next();
}

module.exports = {
    data_implement:Data_Implement
}