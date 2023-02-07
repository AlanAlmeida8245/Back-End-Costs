
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Servicos = new Schema({

    nome:{
        type: String,
    },
    custo:{
        type: Number,
    },
    descricao: {
        type: Object,
    },
    projeto: {
        type: Schema.Types.ObjectId,
        ref: "projetos",
        required: true
    }
})

mongoose.model("servicos", Servicos)