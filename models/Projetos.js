const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Projetos = new Schema({

        nome:{
            type: String,
         
        },
        orcamento:{
            type: Number,
      
        },
        categoria: {
            type: Object,
            
        },
        custo:{
            type: Number,
            default: 0
        },
        servicos: {
            type: Array
        }
        
})

mongoose.model("projetos", Projetos)