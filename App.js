const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")
require("./models/Projetos")
const Projetos = mongoose.model("projetos")
require("./models/Categorias")
const Categorias = mongoose.model("categorias")


    Categorias.create()
const app = express()

//configurando o Express
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(express.json())


app.post("/cadastrar", async (req, res) => {

    console.log(req.body)
    const {nome, orcamento, categoria, custo, servicos} = req.body
    const dadosCadastros = {
        nome: req.body.nome,
        orcamento: req.body.orcamento,
        categoria: req.body.categoria,
        custo: req.body.custo,
        servicos: req.body.servicos
    }
    await Projetos.create(dadosCadastros).then(() => {
        res.status(201).json({msg: "pessoa inserida no sistema com sucesso"})
    }).catch((erro) => {
        res.status(500).json({erro: erro})
        console.log(erro)
    })
})

app.get("/projetos/:id", async (req, res) => {      

    try{
        const projeto = await Projetos.findOne({_id: req.params.id})
        res.status(200).json(projeto)
    }catch(error){
        res.status(500).json({error: error})
    }
})

app.patch("/projetos/:id", async (req, res) => {
   
    const {nome, orcamento, categoria, custo, servicos} = req.body
     console.log("projeto: "+ req.body.servicos)
    const dadosAtualizar = {
        nome: req.body.nome,
        orcamento: req.body.orcamento,
        categoria: req.body.categoria,
        custo: req.body.custo
        
    }
    const ProjetoAtualizado = await Projetos.findOneAndUpdate({_id: req.params.id}, dadosAtualizar).then(() => {
        res.status(200).json(dadosAtualizar)
        console.log("dados atualizado com sucesso")
    }).catch((erro) => {
        res.status(500).json({error: erro})
        console.log(erro)
    })

})

app.put("/projetos/:id", async (req,res) => {

    console.log(req.body)
    const serviceDados = {
        id: req.body.id,
        nomeServico: req.body.nomeServico,
        custoServico: req.body.custoServico,
        descricao: req.body.descricao
    }
      await Projetos.findOneAndUpdate(
        { _id: req.params.id},
         {$push: {servicos: serviceDados}}
        ).then(() => {
            res.status(200).json(serviceDados)
        console.log("Servico Criado com Sucesso")
    }).catch((erro) => {
        console.log("ocorreu um erro: " + erro)
    })
   
})

app.patch("/projetos/:id/:service", async (req,res) => {

    console.log(req.body)
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });

    const dadosAtualizar = {
        nome: req.body.nome,
        orcamento: req.body.orcamento,
        categoria: req.body.categoria,
        custo: req.body.custo,
        servicos: req.body.servicos
    }
      await Projetos.findOneAndUpdate(
        {_id: req.params.id},  
        dadosAtualizar,
        {$pull:  { servicos:  { id: req.params.service }}},
        ).then(() => {
                 res.status(200).json(dadosAtualizar)
                console.log("serviço foi deletado com sucesso")
        }).catch((erro) => {
            console.log("Não foi possivel deletar o Serviço")
        })



})

app.delete("/projeto/:id", async (req, res) => {

    await Projetos.findOneAndDelete({_id: req.params.id}).then(() => {
        res.status(200).json({msg: "deletado com successo"})
    }).catch((erro) => {
        console.log(erro)
    })
})

app.get("/categorias", async (req, res) => {

    try{
        const categorias = await Categorias.find()
        res.status(200).json(categorias)
    }catch(error){
        res.status(500).json({error: error})
    }
})

app.get("/projetos", async (req, res) => {

    try{
        const projetos = await Projetos.find()
        res.status(200).json(projetos)
      
    }catch(error){
        res.status(500).json({error: error})
    }
})

    mongoose.set("strictQuery", true);
    //senha mongo :
    const NOME_DB = process.env.NOME_DB
    const SENHA_DB = encodeURIComponent(process.env.SENHA_DB)

    mongoose.connect(`mongodb+srv://AlanAlmeida:4trso7G4yOGqGibU@costs.2g2eox6.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(process.env.PORT || 8000)
        console.log("Sevidor Aberto")
        console.log("Conectado ao Costs com Sucesso")
    }).catch((erro) => {
        console.log(erro)
    })

