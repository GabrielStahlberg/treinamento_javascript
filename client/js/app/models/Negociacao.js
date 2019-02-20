"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Negociacao = function () {
  function Negociacao(data, quantidade, valor) {
    _classCallCheck(this, Negociacao);

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

  _createClass(Negociacao, [{
    key: "isEquals",
    value: function isEquals(outraNegociacao) {
      return JSON.stringify(this) == JSON.stringify(outraNegociacao);
    }
  }, {
    key: "data",
    get: function get() {
      // Programação defensiva
      return new Date(this._data.getTime());
    }
  }, {
    key: "volume",
    get: function get() {
      return this._quantidade * this._valor;
    }
  }, {
    key: "quantidade",
    get: function get() {
      return this._quantidade;
    }
  }, {
    key: "valor",
    get: function get() {
      return this._valor;
    }
  }]);

  return Negociacao;
}();