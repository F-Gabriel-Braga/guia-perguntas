const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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