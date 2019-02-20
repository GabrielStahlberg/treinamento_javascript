export class ProxyFactory {

  /*
  - O segundo argumento do Proxy é um handler. Um objeto que contém as "traps" do proxy.
  - TARGET: Objeto real que é encapsulado pela proxy.
  - PROP: Propriedade que está sendo lida naquele momento.
  - RECEIVER: Referência ao próprio proxy.

  - ARGUMENTS: É uma variável implícita que nos dá acesso a todos os parâmetros
     passados para a função ou método.
*/
  static create(objeto, props, acao) {

    return new Proxy(objeto, {

      get(target, prop, receiver) {
        if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
          return function () {
            Reflect.apply(target[prop], target, arguments);
            return acao(target);
          }
        }
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        let retorno = Reflect.set(target, prop, value, receiver);

        if (props.includes(prop)) {
          acao(target);
        }

        return retorno;
      }
    });
  }

  static _ehFuncao(func) {
    return typeof(func) == typeof (Function);
  }

}