import express from "express"
const app = express()
const port = 3000

app.get("/public", (req, res) => {
    res.send("Public")
})

app.get("/private", (req, res) => {
    const auth = req.headers["authorization"]
    if (!auth) {
        res.setHeader("WWW-Authenticate", "Basic realm='staging server'")
        return res.status(401).send("Not Authorized")
    }
    const [username, password] = Buffer.from(auth.split(" ")[1], "base64").toString("ascii").split(":")
    
    if (username === "zli" && password === "1234") {
        return res.status(200).send("Privater Endpunkt")
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="staging server"')
        return res.status(401).send("Not Authorized")
    }
})

app.listen(port, () => {
    console.log("Port: " + port )
})