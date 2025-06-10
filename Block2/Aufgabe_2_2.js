import { readFile } from "fs";

function leseDateiInhalt(filepath) {
    return new Promise((resolve, reject) => {
        readFile(filepath, "utf8", (err, data) => {
            if (err) {
            return reject(err)
            }
            resolve(data)
        })
    })
}

leseDateiInhalt(process.argv[2])
  .then(inhalt => { console.log('Die Länge des Dateiinhalts beträgt:', inhalt.length);
})
  .catch(err => { console.error('Fehler beim Lesen der Datei:', err);
});