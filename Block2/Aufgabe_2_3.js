async function simuliereVerzögerung(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function addiereNachVerzögerung(a, b, ms) {
    await simuliereVerzögerung(ms).then(() => console.log(a + b))
}

addiereNachVerzögerung(2, 5, 2000)