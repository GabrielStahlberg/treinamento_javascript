class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  obterNegociacaoDaSemanaAnterior(cb) {
    return new Promise((resolve, reject) => {
      this._http
        .get('negociacoes/anterior')
        .then(negociacoes => {
          resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
        })
        .catch(erro => {
          console.log(erro);
          reject('Não foi possível obter as negociações da semana anterior.');
        })
    });
  }

  obterNegociacaoDaSemanaRetrasada(cb) {
    return new Promise((resolve, reject) => {
      this._http
        .get('negociacoes/retrasada')
        .then(negociacoes => {
          resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
        })
        .catch(erro => {
          console.log(erro);
          reject('Não foi possível obter as negociações da semana retrasada.');
        })
    });
  }

  obterNegociacaoDaSemana() {
    return new Promise((resolve, reject) => {
      this._http
        .get('negociacoes/semana')
        .then(negociacoes => {
          resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
        })
        .catch(erro => {
          console.log(erro);
          reject('Não foi possível obter as negociações da semana.');
        })
    });
  }

  obterNegociacoes() {        
    return Promise.all([
        this.obterNegociacaoDaSemana(),
        this.obterNegociacaoDaSemanaAnterior(),
        this.obterNegociacaoDaSemanaRetrasada()
    ]).then(periodos => {
        let negociacoes = periodos
            .reduce((dados, periodo) => dados.concat(periodo), [])
            .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

        return negociacoes;
    }).catch(erro => {
        throw new Error(erro);
    });
  }

  cadastra(negociacao) {
    return connectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.adiciona(negociacao))
      .then(() => 'Negociação adicionada com sucesso.')
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível adicionar a negociação.');
      });
  }

  lista() {
    return connectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.listaTodos())
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações.');
      })
  }

  apaga() {
    return connectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.apagaTodos())
      .then(() => 'Negociações apagadas com sucesso.')
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível apagar as negociações.');
      })
  }

  importa(listaAtual) {
    return this
      .obterNegociacoes()
      .then(negociacoes =>
        negociacoes.filter(negociacao =>
          !listaAtual.some(negociacaoExistente =>
            negociacao.isEquals(negociacaoExistente)))
      )
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível importas negociações.');
      });
  }
}