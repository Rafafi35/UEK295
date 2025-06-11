import express from "express"
const app = express();
const port = 3000;

app.get("/temperature/:plz", async (req, res) => {

const plz = req.params.plz
const url = "https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=" + plz + "00"

try {
    const response = await fetch(url);
    if (!response.ok) {
        console.error(response.code)
        return;
    }
    else {
        const data = await response.json();
        const temperature = data.currentWeather.temperature;
        res.send("In " + plz + " ist es " + temperature + "°C");
    }
} catch(error) {
    console.error(error)
    }    
})

app.listen(port, () => {
    console.log("Example app listening on port " + port)
})