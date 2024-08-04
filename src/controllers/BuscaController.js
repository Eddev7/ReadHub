
class BuscaController {

  buscaIndex(dataArray) {

    const searchArrayFind = [];

    dataArray.forEach((linha, index) => {
      if (linha.match("Brisa")) {
        searchArrayFind.push(index);
      }
    })

    const searchArrayInit = [];
    const searchArrayFinaly = [];

    const regex = "\\d\\d\\d\\d\\d\\d\\d-\\d\\d\\.\\d\\d\\d\\d\\.\\d\\.\\d\\d\\.\\d\\d\\d\\d";

    searchArrayFind.forEach((index) => {

      for (let i = index; i > 0; i--) {
        if (dataArray[i].match(regex)) {
          if (searchArrayInit.includes(i)) break;
          searchArrayInit.push(i);
          break;
        }
      }

      for (let i = index; i < dataArray.length; i++) {
        if (dataArray[i].match(regex)) {
          if (searchArrayFinaly.includes(i)) break;
          searchArrayFinaly.push(i);
          break;
        }
      }

    })

    return {
      searchArrayFind,
      searchArrayInit,
      searchArrayFinaly
    }

  }

  busca = (req, res) => {
    try {
      
      const response = this.buscaIndex(req.session.texto);

      res.send(response);

    } catch (e) {
      res.status(500).send(e);
    }
  }
  
}

export default new BuscaController();