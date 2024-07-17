# Guia de Comandos Make

Este guia fornece instruções para usar comandos Make para testar, inicializar e gerenciar o projeto.

## Comandos de Formatação e Teste

Para os testes temos:

```sh
# Iniciar os testes com pytest nos endpoints do backend
$ make test-backend
```


## Comandos Make e Atalhos na Aplicação

### Informações Gerais

- Todos os comandos devem ser executados na raiz da aplicação.
- Sempre ative o ambiente virtual antes de usar os comandos.


### Inicializar a Aplicação

- **Comando:** `make up`
  - Executa: `gnome-terminal -- make up-backend && gnome-terminal -- make up-frontend` para inicializar a aplicação.

### Inicializar a back-end localmente:

- **Comando:** `make up-backend`
  - Executa: `uvicorn app:app --reload --host 0.0.0.0` para inicializar a api.

### Inicializar os testes do back-end:

- **Comando:** `make test-backend`
  - Executa: `pytest` para inicializar a os testes do pytest.

### Inicializar o back-end num container:

- **Comando:** `make up-dockefile-backend`
  - Executa: `docker build && docker run` para inicializar a api no docker
