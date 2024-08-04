import app from "./app";

const port = 5000;

app.on('pronto', () => {
    app.listen(port, () => {
        console.log()
        console.log(`Porta da aplicação: ${port}`)
        console.log(`http://localhost:${port}`)
        console.log()
    });
})
