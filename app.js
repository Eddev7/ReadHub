import express from 'express';
import axios from 'axios';
const pdf = require('pdf-parse');

const app = new express();

app.get('/', async (req, res) => {

  let antes = Date.now();

  try {

    const response = await axios({
      method: 'get',
      url: 'https://esaj.tjce.jus.br/cdje/downloadCaderno.do?dtDiario=27/06/2024&cdCaderno=2&tpDownload=D',
      responseType: 'arraybuffer'
    });

    if (!response.data) {
      throw new Error('PDF não encontrado ou inválido');
    }

    const pdfBuffer = Buffer.from(response.data);

    const data = await pdf(pdfBuffer);

    const dataArray = data.text.split("\n");

    dataArray.forEach((linha, index) => {
      
    })

    await res.send(dataArray);
    
    let duracao = Date.now() - antes;
    console.log((duracao / 1000));


  } catch (error) {
    console.error('Erro ao processar o PDF:', error);
    res.status(500).send(`Erro ao processar o PDF: ${error.message}`); // Envia a mensagem de erro para o cliente
  }
  
});

app.listen(4000, () => {
  console.log("LINK:")
  console.log('http://localhost:4000');
});


