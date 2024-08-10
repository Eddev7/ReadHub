import model from "../config/geminiConfig";

class BuscaController {

  buscaIndex(text) {

    const find = [];

    text.forEach((linha, index) => {
      if (linha.match("Brisa")) {
        find.push(index);
      }
    })

    const init = [];
    const finaly = [];

    const regex = "\\d\\d\\d\\d\\d\\d\\d-\\d\\d\\.\\d\\d\\d\\d\\.\\d\\.\\d\\d\\.\\d\\d\\d\\d";

    find.forEach((index) => {

      for (let i = index; i > 0; i--) {
        if (text[i].match(regex)) {
          if (init.includes(i)) break;
          init.push(i);
          break;
        }
      }

      for (let i = index; i < text.length; i++) {
        if (text[i].match(regex)) {
          if (finaly.includes(i)) break;
          finaly.push(i);
          break;
        }
      }

    })

    return {
      find,
      init,
      finaly
    }

  }

  processos(text, indexs) {
    const processos = [];

    // Process mount
    indexs.init.forEach((value, i) => {

      let mountProcess = [];

      const initRange = indexs.init[i] - 50;
      const finalyRange = indexs.finaly[i] + 50;

      for (let l = initRange; l <= finalyRange; l++) {
        mountProcess.push(text[l]);
      }

      processos.push(mountProcess.join(' '));

    });

    return processos;
  }

  busca = async (req, res) => {
    let antes = Date.now();

    try {
      const texto = req.session.texto;

      const indexs = this.buscaIndex(texto);

      const processos = this.processos(texto, indexs);

      const promises = processos.map(async (processo) => {
        
        let prompt = `
        Faça a leitura de todo o texto a seguir, e retorne um Json nesse esquema:
        
        {
          "trecho": recorte todo o processo com o termo "Brisa" e ignore o que não for do processo relacionado ao termo
          "nomes": nomes que estão relacionados ao trecho ja recortado.
        }
        
        ${processo}
        `;
        
        let result = await model.generateContent(prompt);

        return result.response.text();

      });

      Promise.all(promises)
      .then(responses => {
        let duracao = Date.now() - antes
        console.log(duracao / 1000);    
        res.send(responses);
      })
      .catch(e => {
        console.error(e);
        res.status(500).send('An error occurred.'); 
      });

    } catch (e) {
      res.status(500).send(e);
    }


  }

}

export default new BuscaController();