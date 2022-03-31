
<p align='center'>
 <img src='https://neon-frangollo-bf6d00.netlify.app/bb3f89e78cedf69e26af774cc1583f99.png' width='200' height='200' alt='logo' />
</p>

#  LuizaLabs | Marvel 
Catálogo de super Heróis. Você pode navegar por mais de 1.500 heróis da Marvel. 
#
## 👩‍💻 Link Público
* [ACESSAR APLICAÇÃO](https://neon-frangollo-bf6d00.netlify.app/)

#

## Funcionalidades
* Lista de Personagens
* Pesquisa pelo nome do Herói 
* Ordenação da lista
* Paginação
* Página de detalhe com informações sobre o Personagem
* Listagem de Heróis favoritos
* Limite de favoritos: 5 Heróis
* Adicionar ou remover dos favoritos
* Layout Responsivo
#

# Conventional Commits
Commits pontuais
biblioteca : git-commit-msg-linter garante que o commit respeitará o formato do Conventional Commits:
```bash
<type>([optional scope]): <description>

[optional body]

[optional footer(s)]
```
# Usar o conventional Commits trás muitas vantagens como:

* Possibilitar a adoção de processos automatizados na geração de um CHANGELOG ou de release, o que resulta em uma documentação estruturada e consistente;
* Determinar automaticamente um aumento de versionamento semântico (com base nos tipos de commits).
* Comunicar a natureza das mudanças para colegas de equipe, o público e outras partes interessadas.
* Disparar processos de build e deploy.
* Facilitar a contribuição de outras pessoas em seus projetos, permitindo que eles explorem um histórico de commits mais estruturado.
* O Conventional Commit encoraja a se realizar mais commits de tipos específicos, por exemplo correções.
* A flexibilidade do Conventional Commits permite que sua equipe crie seus próprios tipos e altere ao longo do tempo.
  
#

## Dependências:
* React
* React DOM
* Styled Components
* Jest
* Webpack
* Babel
#

## 🚀 Instalação do Projeto
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

## ⚙ Adicionando chaves
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
* Será aberto uma aba em seu navegador: http://localhost:8080
#

## Comando Complementar
 * Para realizar o build do Projeto:
```bash
npm run build
# ou
yarn run build
```
* Este comando compila o aplicativo para produção na pasta: `dist`
#

## 🧪 Testes
* Checa por problemas de sintaxe no código, definidas no ESlint:
```bash
npm run lint
# ou 
yarn run lint
```
* Executa testes criados no projeto:
```bash
npm run test
# ou
yarn run test
```
* Teste analisando a cobertura no código:
```bash
npm run test:coverage
# ou
yarn run test:coverage
```
#

