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
        res.send(data)
    })
})

app.get("/image", (req, res) => {
    fs.readFile("image.png", function(err, image){
        res.writeHead(200, {"Content-Type": "image/png"});
        res.end(image);
    })
})

app.get("/teapot", (req, res) => {
    res.status(418).send("I am a Teapot")
})

app.get("/user-agent", (req, res) => {
    res.send(req.headers["sec-ch-ua"].split(";")[0])
})

app.get("/secret", (req, res) => {
    res.status(403)
})

app.get("/xml", (req, res) => {
    fs.readFile("file.xml", (err, data) => {
        res.set("Content-Type", "application/xml")
        res.send(data.toString().trim());
    })
})

app.get("/me", (req, res) => {
    res.set("Content-Type", "application/json")
    const json = ({"name": "Rafael", "wohnort": "Zürich"})
    res.send(json);
})

app.listen(port, () => {
    console.log("Port: " + port)
})