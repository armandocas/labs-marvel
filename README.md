# LuizaLabs | Marvel 🦸‍♂️
Catálogo de super Heróis. Você pode navegar por mais de 1.500 heróis da Marvel, pesquisar por nome e ter até 5 personagens como seus FAVORITOS. Para cada personagem, você pode obter uma breve descrição, juntamente com algumas curiosidades. 
# Conventional Commits
Commits pontuais
biblioteca : git-commit-msg-linter garante que o commit respeitará o formato do Conventional Commitsnpm:
```bash
<type>([optional scope]): <description>

[optional body]

[optional footer(s)]
```
#

## Dependências:
* React
* React DOM
* Styled Components
* Jest
* Webpack
* Babel
#

## Instalação do Projeto
#
Clone o projeto:
```bash
git clone https://github.com/armandocas/labs-marvel.git
```
Acesse a pasta do projeto:
```bash
cd labs-marvel
```
Instale as dependências do projeto:
```bash
npm install 
# ou 
yarn
```
#

## Adicionando chaves
* Observe o arquivo: `.envExemplo` -> 
```bash
API_URL=SuaURL
PUBLIC_KEY=Sua chave pública
PRIVATE_KEY=Sua chave privada
```
* Após inserir suas credenciais, renomeie o arquivo: `.envExemplo` para: `.env`  
* É possível solicitar suas credenciais aqui: [API MARVEL](https://developer.marvel.com/)
* Obs: A `(MARVEL)` possui um limite diário de `3.000` chamadas.
#

## Executando local
Inicie o servidor localmente para acessar a aplicação: 
```bash
npm run dev
# ou
yarn dev
```
#

