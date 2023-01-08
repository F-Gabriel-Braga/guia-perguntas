const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');

// database
connection.authenticate().then(() => {
    console.log("Aplicação conectada com banco de dados.")
}).catch(error => {
    console.error(error);
})

app.set('view engine', 'ejs');
app.use(express.static("public"));

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// rotas
app.get("/", (req, res) => {
    res.render("index");
})

app.get("/new/question", (req, res) => {
    res.render("new-question");
})

app.post("/new/question", (req, res) => {
    const title = req.body.title;
    const question = req.body.question;
    res.send("Pergunta cadastrada!" + title + question);
})

const port = 3000;
app.listen(port, () => {
    console.log("SERVIDOR EXECUTANDO NA PORTA " + port);
});