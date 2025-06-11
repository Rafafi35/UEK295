import express from "express";
import fs from "node:fs";
const app = express();
const port = 3000;

app.get("/now", (req, res) => {

    const jetzt = new Date().toISOString();
    res.send(jetzt);
})

app.get("/zli", (req, res) => {
    res.redirect("https://www.zli.ch/")
})

app.get("/name", (req, res) => {
    const names = [ "Alexander", "Sophia", "Daniel", "Olivia", "Matthew", "Isabella", "Ethan", "Mia", "Aiden", "Ava",
    "Noah", "Emily", "Liam", "Charlotte", "Jacob", "Amelia", "Michael", "Harper", "Elijah", "Evelyn" ];
    const randomName = names[Math.floor(Math.random() * names.length - 1)]
    res.send(randomName);
})

app.get("/html", (req, res) => {
    fs.readFile("website.html", "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Datei konnte nicht gelesen werden.")
        }
        res.send(data)
    })
})

app.listen(port, () => {
    console.log("Port: " + port)
})