function addiere(zahl1, zahl2) {
    return zahl1 + zahl2;
}

const addiere1 = function(zahl1, zahl2) {
    return zahl1 + zahl2
}

const addiere2 = (zahl1, zahl2) => {
    return zahl1 + zahl2
}

console.log(addiere(3, 5))
console.log(addiere1(3, 5))
console.log(addiere2(3, 5))