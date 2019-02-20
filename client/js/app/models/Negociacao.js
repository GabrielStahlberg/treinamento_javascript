class Negociacao {

  constructor(data, quantidade, valor) {
    /*
        - Atributos de instância;
        - Atributos prefixados por "_" é um apelo para uma convenção do mundo javascript
            na qual esses atributos não devem ser acessados diretamente pelos desenvolvedores.
            Deve ser utilizada a própria classe para o acesso, através de métodos GET;
        - Podemos congelar um objeto com todas as suas propriedades, com isso, qualquer
            alteração externa será ignorada;
        - VAR: Possui escopo de função ou global;
        - LET: Possui escopo de bloco;
    */
    this._data = new Date(data.getTime());
    this._quantidade = quantidade;
    this._valor = valor;
    Object.freeze(this);
  }

  get data() {
    // Programação defensiva
    return new Date(this._data.getTime());
  }

  get volume() {
    return this._quantidade * this._valor;
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }

  isEquals(outraNegociacao) {
    return JSON.stringify(this) == JSON.stringify(outraNegociacao)
  }
}