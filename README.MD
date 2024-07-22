
# Projeto de Gestão de Reclamações

<div align="center">
  <img src="https://portal.ninamob.com/assets/images/nina-logo.svg" alt="Logo da Plataforma NiNa" width="120px" height="120px"/>
</div>
<h2 align="center">Gestão de Reclamações</h2>



## 📖 Sobre o Projeto

Este projeto visa desenvolver um sistema integrado para a gestão de reclamações, permitindo aos usuários registrar e acompanhar suas reclamações de maneira eficiente e transparente.

## 🚀 Tecnologias e Ferramentas

A aplicação é uma solução web que inclui duas interfaces de usuário front-end, seguindo o design disponível no [Figma](https://www.figma.com/design/oosvhfSMv6OsCDCW27NWQ0/Processo-seletivo---2024?node-id=0-1&t=qbuEQHZKt86TTp7j-1), e uma API REST desenvolvida em Python.

### Stack do Projeto

| Categoria   | Tecnologia | Versão   |
|-------------|------------|----------|
| **Runtime** | Angular    | v18      |
|             | Python     | v3.11.x  |
| **Devtime** | charts.js  | Última   |
|             | FastAPI    | v0.111.x |


## 🛠️ Configuração e Execução

Para rodar a aplicação localmente e garantir uma experiência completa, siga os passos abaixo. Certifique-se de ter instalado todas as dependências necessárias.

### Clonando o Repositório

1. Clone o repositório para sua máquina local usando o comando:

```sh
git clone https://github.com/jvras58/Desafio-FullStack-nina.git
```

### Iniciando a Aplicação

2. Com o repositório clonado, navegue até a raiz do projeto e execute o seguinte comando para iniciar a interface da aplicação:
   ```sh
   make up-frontend 
   ```
   > **Nota:** A API já está disponível online no [Render](https://desafio-fullstack-nina.onrender.com/), o que torna desnecessário iniciar o back-end localmente para testar a aplicação. No entanto, se preferir utilizar a API localmente, siga as instruções para [iniciar a API](#iniciando-a-api).

### Iniciando a API (Opcional)

3. Para iniciar a API localmente, utilize o comando:
   ```sh
   make up-backend
   ```
   > **Aviso:** Para utilizar a API localmente, altere a string de conexão no arquivo [environment.development.ts](front/src/environments/environment.development.ts) para: `http://0.0.0.0:8000`

## 🛠️ Testes da API

Para executar os testes da API, utilize o comando:
```sh
make test-backend
```

## 🚀 Outros Comandos com o Make

Para explorar mais comandos disponíveis via `make`, consulte o arquivo [Instruções do Make](make-file.md).

## 🛠️ Este projeto faz parte de um desafio gerenciado pela Nina

consulte o arquivo [Instruções do Nina](desafios.md).
