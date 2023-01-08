const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta')

// database
connection.authenticate().then(() => {
    console.log("Aplicação conectada com banco de dados.")
}).catch(error => {
    console.error("Erro ao conectar aplicação com banco de dados", error);
})

app.set('view engine', 'ejs');
app.use(express.static("public"));

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// rotas
app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true }).then(perguntas => {
        res.render("index", {
            perguntas
        });
    }).catch(error => {
        res.send("Erro ao buscar perguntas.");
        console.error(error);
    });
})

app.get("/new/question", (req, res) => {
    res.render("new-question");
})

app.post("/new/question", (req, res) => {
    const title = req.body.title;
    const question = req.body.question;
    Pergunta.create({
        titulo: title,
        descricao: question
    }).then(() => {
        res.redirect("/")
    }).catch(error => {
        res.send("Erro ao cadastrar pergunta.");
        console.error(error);
    });
})

const port = 3000;
app.listen(port, () => {
    console.log("SERVIDOR EXECUTANDO NA PORTA " + port);
});