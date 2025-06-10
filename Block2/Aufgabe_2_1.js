function verdoppeln(zahl, callback) {
    const ergebnis = zahl * 2
    callback(ergebnis)
}

verdoppeln(process.argv[2], function(ergebnis) {
    console.log("Ergebnis: ", ergebnis)
})