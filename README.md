<h1 align="center">Focus_API</h1>
<p align="center">API RESTfull that manage authentication and data persistence on Focus application</p>

<p align="center">
 <a href="#pre-requisitos">Prerequisites</a> •
 <a href="#objetivo">Goals</a> •
 <a href="#tecnologias">technologies</a> • 
 <a href="#autor">Author</a>
</p>
<h4 align="center"> 
    Focus API 🚀 in progress!
</h4>

<h3 id="pre-requisitos">Prerequisites</h3>

Before starting, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com) and [Node](https://nodejs.org/en/).
Besides, it's good to have an editor to work with the code like [VSCode](https://code.visualstudio.com/)

<h3 id="objetivo">🎯 Goals</h3>

- To build this API I used the S.O.L.I.D principles and clean code.
- All the authentication is made with JWT and refresh-token strategy. First I made an authentication endpoint that receives the email and password in the request and respond with user's information, an access token and a refresh-token, but the refresh-token is sent in a httpOnly cookie for more security. In all the requests a middleware intercepts and verify the access token and after a successful verification the request go on. When the refresh-token expires there's an endpoint "/refresh-token" that send back a new access token.
- To manage and persist Tasks creation, modification in status, modification in content, deletion and listing I used PostgreSQL and TypeORM 

<h3 id="tecnologias">🛠 technologies</h3>

The following tools were used in building the project:

- [Typescript](https://www.javascript.com/)
- [Express](https://expressjs.com) 
- [Docker](https://www.docker.com/)
- [Typeorm](https://typeorm.io/)
- [Postgres](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Tsyringe](https://www.npmjs.com/package/tsyringe)

<h3 id="autor">Author</h3>


<a href="https://www.linkedin.com/in/tiago-muniz-de-araujo-2b5b8a89/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/102497603?s=400&u=36ca4d7e208862291ff6e3cdbdfb76d5a4d2b0fc&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Tiago Araujo</b></sub></a> <a href="https://app.rocketseat.com.br/me/tiago-muniz-de-araujo-01020" title="Rocketseat">🚀</a>


Made by Tiago Araujo 👋🏽 contact!

[![Linkedin Badge](https://img.shields.io/badge/-Tiago-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tiago-muniz-de-araujo-2b5b8a89/)](https://www.linkedin.com/in/tiago-muniz-de-araujo-2b5b8a89/) 
[![Gmail Badge](https://img.shields.io/badge/-tiagomuniz130@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tiagomuniz130@gmail.com)](mailto:tiagomuniz130@gmail.com)
