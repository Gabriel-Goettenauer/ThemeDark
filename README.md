# ThemeApp

Um aplicativo simples com sistema de gerenciamento de tema (claro/escuro) desenvolvido com React Native/Expo e TypeScript, com foco em demonstrar a implementação de testes automatizados.

---

## **Atividade Avaliativa 2: Programação para Dispositivos Móveis**

### **Diferença entre Testes Unitários e Testes E2E (End-to-End) em Aplicações Mobile**

Em aplicações mobile, assim como em outras plataformas, a automação de testes é crucial para garantir a qualidade e a estabilidade do software. Testes unitários e testes E2E (End-to-End) são duas abordagens distintas, mas complementares, que visam atingir esse objetivo.

#### **Testes Unitários**

 **Foco:** O principal objetivo dos **testes unitários** é isolar e verificar as menores unidades de código de uma aplicação, que são geralmente funções, classes ou componentes individuais. Em aplicações React Native, isso significa testar um componente de interface de usuário de forma isolada, um hook personalizado, ou uma função utilitária que realiza um cálculo específico, por exemplo.

 **Escopo:** Eles testam a lógica interna e o comportamento de uma única "unidade" sem depender de outras partes do sistema, como rede, banco de dados ou a interface de usuário completa. Para isolar a unidade, muitas vezes são utilizados *mocks* ou *stubs* para simular dependências externas.

 **Velocidade e Custo:** São tipicamente **rápidos de executar** e **baratos de escrever e manter**, pois focam em pedaços pequenos de código e não exigem um ambiente de execução completo (como um emulador ou dispositivo físico).

 **Detecção de Erros:** Excelentes para **identificar bugs e falhas em um nível granular**, fornecendo feedback imediato sobre a correção da lógica de uma funcionalidade específica. Se um teste unitário falha, é geralmente fácil identificar onde o problema está.

* **Exemplo:** Testar se um componente de botão renderiza o texto correto e chama uma função específica ao ser pressionado, ou se um *hook* de validação de formulário retorna `true` para entradas válidas e `false` para inválidas.

#### **Testes E2E (End-to-End)**

 **Foco:** Os **testes E2E** simulam o fluxo completo de interação de um usuário com a aplicação, do início ao fim. Eles testam o sistema como um todo, verificando se todos os componentes, serviços, APIs e bancos de dados funcionam em conjunto como esperado para completar um cenário de usuário.
 **Escopo:** Abrangem múltiplas camadas da aplicação (UI, lógica de negócio, persistência de dados, comunicação com o backend) e validam a experiência do usuário do ponto de vista funcional. Em mobile, isso significa interagir com o aplicativo como se fosse um usuário real, tocando em botões, digitando em campos, navegando entre telas e verificando os resultados na interface.

 **Velocidade e Custo:** São **mais lentos de executar** e **mais caros de escrever e manter** do que os testes unitários, pois exigem um ambiente de execução completo (emulador ou dispositivo real) e são mais suscetíveis a falhas por problemas de ambiente ou timing.

 **Detecção de Erros:** Essenciais para **validar a integração entre os diferentes módulos** e para garantir que os fluxos críticos da aplicação funcionam corretamente para o usuário final. Eles podem descobrir problemas que testes unitários não conseguiriam, como falhas de comunicação entre frontend e backend.
 
 * **Exemplo:** Testar o fluxo de login: o teste iniciaria a aplicação, inseriria o nome de usuário e senha, clicaria no botão de login e verificaria se o usuário é redirecionado para a tela inicial autenticada com sucesso. Outro exemplo seria adicionar uma nota de leitura, adicionar tags, salvar e depois verificar se a nota aparece na lista principal com as tags corretas.

---

### **Conclusão**

Ambos os tipos de testes são cruciais para uma estratégia de teste robusta em aplicações mobile. Os **testes unitários** formam a base, garantindo que as peças individuais funcionem corretamente de forma isolada, sendo rápidos e eficientes para pegar bugs cedo. Já os **testes E2E** atuam como a camada final de validação, assegurando que todas essas peças se encaixam e funcionam harmoniosamente, entregando a experiência esperada ao usuário final. Uma combinação eficaz de ambos resulta em um software mais confiável e de maior qualidade.




