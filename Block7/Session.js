import express from 'express';
import session from 'express-session';

const app = express();
app.use(session({ secret: "alkndakjdaslkjn", resave: false, saveUninitialized: true }));
const port = 3000;

app.post('/name', (request, response) => {
    request.session.name = request.query.name
    response.send(request.session.name);
});

app.get('/name', (request, response) => {
    response.send(request.session.name);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});