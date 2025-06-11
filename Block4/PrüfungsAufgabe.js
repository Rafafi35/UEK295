import express from "express";
const app = express();

function isMagic(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

app.get('/api/check/:number', (req, res) => {
  const number = parseInt(req.params.number, 10);
  if (isNaN(number)) {
    res.status(400).send('Bad Request: Ungültige Eingabe');
  } else {
    res.status(200).send(isMagic(number) ? 'true' : 'false');
  }
});

app.listen(3000, () => console.log('Server läuft auf Port 3000'));