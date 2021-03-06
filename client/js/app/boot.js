'use strict';

System.register(['./controller/NegociacaoController'], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController;
  return {
    setters: [function (_controllerNegociacaoController) {
      currentInstance = _controllerNegociacaoController.currentInstance;
    }],
    execute: function () {
      negociacaoController = currentInstance();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map