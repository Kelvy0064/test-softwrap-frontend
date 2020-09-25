test-softwrap-backend

O QUE É

É uma aplicação que permite gerenciar dados de uma pessoa.

CONVENÇÕES UTILIZADAS

Foi utilizado eslint para a garantia de padronização e boas praticas

Todas as classes e variáveis nomeadas em inglês

TECNOLOGIAS USADAS

Backend: MongoDB, Node.js

Frontend: React, React Bootstrap

O motivo das tecnologias de desenvolvimento escolhidas, foram por eu já ter um conhecimento sobre elas, por já ter realizado um pequeno projeto com as mesmas, porém usando Material-UI ao invés de React Bootstrap.

DESCRIÇÃO DAS FUNCIONALIDADES

Para as requisições foram ultilizado o método fecth()

Todos os endpoints da Api retornam mensagem de sucesso ou erro, que são mostradas pelo frontend através de um toast

Salvar (POST): O programa permite salvar um número ilimitado de registro, porém o mesmo não permite salvar dois registros com o mesmo cpf e nem enviar dados em branco, passando por um tratamento pelo frontend antes de fazer a requisição. O programa também realiza a validação do cpf, mas para fins de testes, é permitido salvar um documento o mesmo não impedi salvar um cpf inválido.

Mostrar (GET): O programa possui uma paginação que permite mostrar até 5 registros por vez, a paginação é feita pelo backend por uma função do banco de dados (mongo), onde o frontend manda no HEADER da request o número da pagina e a quantidade máxima de registros, o backend retorna os registros requisitados e o número total de registro no schema, para que o frontend possa mostrar o número de páginas dinamicamente.

Editar (PUT): O programa permite o usuário clicar na linha em que deseja alterar o registro, populando os campos do formulário com os dados do mesmo. Após os dados estarem no formulário o usuário pode alterar qualquer campo e salvar (não permitindo salvar em branco e nem com cpf de outro registro), limpar os campos e não alterar nada ou excluir o registro.

Excluir (DELETE): Após o usuário ter clicado na linha para editar/excluir, o botão para deletar é habilitado permitindo a exclusão do registro ou clicar em limpar para cancelar a ação.

DEPLOY

O banco de dados foi hospedado no serviço de cloud MongoDB Atlas (https://www.mongodb.com/cloud/atlas), o deploy da API e do frontend foram feitos no Heroku (https://www.heroku.com/), cada um em seu app, ambos estão com CI/CD emplementados.
