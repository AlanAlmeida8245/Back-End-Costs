const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Categorias = new Schema({

        nome:{
            type: String,
            required: true
        }
    
        
})

mongoose.model("categorias", Categorias)