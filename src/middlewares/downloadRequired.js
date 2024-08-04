import axios from 'axios';
const pdf = require('pdf-parse');
import DiarioModel from "../models/DiarioModel";

export default async (req, res, next) => {

  try {

    const diarioObj = {
      tribunal: 'tjce',
      data: '27/07/2024',
      texto: [],
    }

    const dados =  await DiarioModel.find({ data: diarioObj.data });

    if(dados.length) {
      
      diarioObj.texto = dados[0].texto;

      req.session = diarioObj;

      next();
      
    } else {

        const response = await axios({
          method: 'get',
          url: 'https://esaj.tjce.jus.br/cdje/downloadCaderno.do?dtDiario=26/07/2024&cdCaderno=2&tpDownload=D',
          responseType: 'arraybuffer'
        });
    
        if (!response.data) {
          throw new Error('PDF não encontrado ou inválido');
        }
    
        const pdfBuffer = Buffer.from(response.data);
    
        const data = await pdf(pdfBuffer);
    
        const dataArray = data.text.split("\n");

        if(dataArray.length == 0) {
          throw new Error('Nesta data não a diario disponivel.');
        }
    
        diarioObj.texto = dataArray;
    
        req.session = diarioObj;
    
        await DiarioModel.create(diarioObj);
    
        next();

    };

  } catch (error) {
    console.error('Erro ao processar o PDF:', error);
    res.status(500).send(`Erro ao processar o PDF: ${error.message}`); // Envia a mensagem de erro para o cliente
  }

}
