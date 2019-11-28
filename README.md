# prova do Nodejs
O propósito deste projeto é executar os requisitos mínimos da prova que foi solicitada.

Para rodar esse projeto é necessário que esteja instalado o Mysql na máquina.


Neste micro-serviço foi feito um crud completo e feito autenticação com o JWT.


o Gerenciador de pacotes foi o yarn por ser mais rápido que o npm.


* Necessário criar um arquivo .env preecher os dados conforme está no arquivo .env.example




* Necessário criar um banco de dados e adiciona-lo na váriavel de ambiente.


* Necessário executar o " yarn sequelize db:migrate " para criar as tabelas.

#Rotas

 * PARA CADASTRO DE USUARIOS (POST)
	http://localhost:3333/users
	
	Exemplo => {
		"name": "Ciclano Silva",
		"email": "ciclano@gmail.com",
		"password": "123456",
		"dateNasc": "2019-01-05",
		"phone": "9999-9999"
	}
	
 * PARA LOGAR O USUARIO (POST)
	http://localhost:3333/sessions
	
  Exemplo => {
	"email": "fulano@gmail.com",
	"password": "123456"
  }
	
 * PARA ATUALIZAR O USUARIO (PUT)
	http://localhost:3333/users
	
	Exemplo => {
		"email": "fulano123@gmail.com",
		"name": "Fulano Martins",
		"phone": "(51)9999-9999"
	}
	
	Caso queira trocar a senha é necessário que seja enviada a senha antiga.
	
	Exemplo => {
		"email": "ciclano@gmail.com",
		"name": "Ciclano Silva",
		"oldPassword": "123456",
		"password": "1234567",
		"confirmPassword": "1234567",
	}
	
 * PARA BUSCAR TODOS OS USUARIOS (GET)
	http://localhost:3333/users
	
	
 * PARA BUSCAR SOMENTE UM USUARIO (GET)
	http://localhost:3333/user/:id
	
 * DELETA SOMENTE UM USUARIO (DELETE)
	http://localhost:3333/user/:id
	
* Após se autenticar é passado o token, para cadastrar e listar o usuario não precisa do token, os demais é necessário.

* PARA CADASTRO DE livro (POST)
	http://localhost:3333/books
	
	Exemplo => {
		"isbn": "cod-123-2019",
		"title": "Algoritmo",
		"category": "ficção",
		"year": "2019"
	}
	
 * PARA ATUALIZAR O LIVRO (PUT)
	http://localhost:3333/books
	
	Exemplo => {
		"title": "Algoritmo 321",
		"category": "ficção 123",
		"year": "2019"
	}
	
 * PARA BUSCAR TODOS OS LIVROS (GET)
	http://localhost:3333/books
	
 * PARA BUSCAR SOMENTE UM LIVRO (GET)
	http://localhost:3333/book/:id
	
 * DELETA SOMENTE UM LIVRO (DELETE)
	http://localhost:3333/book/:id

 * CADASTRO DE LIVROS FAVORITOS UM LIVRO (POST)
	http://localhost:3333/bookFavorite

  Exemplo => {
		"isbn_id": "cod-123-2019",
		"user_id": "1",
		"date": "2019"
	}

	# Observações:
	
	Todas as funções do livro só será realida ao passar o token gerado, ao fazer login (passar pela rota session)
	
	Deve ser colocado o token no Authorization: Bearer Token.
