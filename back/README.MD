<p align="center">
    <img src="https://pbs.twimg.com/profile_images/575314188848889856/F4KWmvVX_200x200.png" alt="Header - complaints">
</p>
<p align="center">
    complaints
</p>

## Sobre o projeto
O projeto visa desenvolver um sistema integrado para a gestão de reclamações(complaints)

## Stack do projeto

Este projeto é uma applicação web que implementa uma API REST usando o framework FastAPI sem banco de dados real.

Essas e outras libs e tecnologias usadas neste projeto são:
|  Lib      | Versão    |
|-----------|-----------|
| **Runtime**           |
| Python    | v3.11.x   |
| FastAPI   | v0.111.x  |
| Uvicorn   | v.0.29.x  |
| Pydantic  | v2.7.x    |
| **Devtime**           |
| Pytest                        | v8.2.x    |
| Pytest Coverage (pytest-cov)  | v5.0.x    |


### Organização do projeto
```
├─📁 Desafio-FullStack-nina
/
├─📁 back             ->  [Implementação da API]
│   ├─🐍 app.py     ->  [Entrypoint da aplicação]
│   ├─📁 routers            ->  [rotas da aplicação]
│   │ │ ├─🐍 complaints.py
│   │ │ ├─🐍 users.py
│   │   ...
│   └─📁 schema    ->  [schemas da aplicação]
│   │ │ ├─🐍 complaints.py
│   │ │ ├─🐍 users.py
│   │   ...
│   └─📁 database      ->  [configurações dos dados da aplicação]
│   │ │ ├─🐍 database.py
│   │ │ ├─🐍 db_exception.py
│   │ │ ├─🐍 generate_mocked_data.py
│   │ │ ├─{...} mocked_exemple.json
│        ...
├─📁 tests           ->  [Testes da aplicação]
│   ├─🐍 conftest.py ->  [configuração do ambiente de testes.]
│   ├─🐍 test_nome-modulo.py ->  [nomeclatura dos testes pytest.]
│                     
├─📄 .gitignore
├─📄 requirements.txt  ->  [Definições para o projeto]
├─📄 README.md

```

## Rodando a API

Este repositório está organizado para rodar com Docker ou localmente. Para iniciar, siga as seguintes configurações:

### Configurações Locais

Este projeto utiliza o pip para gerenciar as dependências definidas no arquivo `requirements.txt`.

crie o ambiente virtual executando (caso esteja dentro da pasta back):
```sh
python3 -m venv venv
```

ative o ambiente virtual executando (caso esteja dentro da pasta back):
```sh
source venv/bin/activate
```

Para instalar as dependências, utilize o comando (caso esteja dentro da pasta back):
```sh
pip install -r requirements.txt
```


Após isso, o projeto estará pronto para ser iniciado com o comando:
```sh
make up-back-end 
```

##### Executar Testes
```sh
make test-backend
```

# Lista de Atividades 

## Atividades Pendentes Backend
- [ ] Implementar um recurso ausente que retorne todas as reclamações de um determinado usuário.


## Atividades Concluídas Backend
- [v] Implementar uma funcionalidade de filtragem para a rota get_complaints (```/complaints```) permitindo que ela retorne apenas as reclamações onde o campo ```date``` está entre os campos ```from_date``` e `` `to_date```, passado através de parâmetros de consulta.
> **Nota:** será necessário para integração com a tabela de complaints(reclamações) no frontend

> **Comentario 1:** Como estamos trabalhando em memoria e a quantidade de dados é pequena algumas implementações são rapidas pela definição de responsabilidades e durabilidade dos dados guardar coisas em memória não é uma boa coisa pois depende que a aplicação fique 100% ligada para que um post dure por exemplo.

> **Comentario 2:** Foi detectado um warning ao rodar a aplicação fastapi (UserWarning: Valid config keys have changed) solicitando a troca da nomeclatura (allow_population_by_field_name) para populate_by_name

> **Comentario 3:** Foi detectado um uso Deprecated(relacionado ao uso de configurações baseadas em classes) no schema de pydantic na hora de rodar os testes e esse warning se encontra no group_bys schema

- [v] Refatore a rota get_complaint (```/complaint/{complaint_id}```) para que a reclamação retornada inclua informações sobre o usuário que a registrou. 
> **Nota:** será necessário para integração com a tabela de complaints(reclamações) no frontend

> **Comentario 1:** Foi adicionado um parametro UserSchema opcional no schema de  complaints(reclamações) para que o response_model se adeque ao que foi solicitado

> **Comentario 2:** talvez seja necessario refatorar para que a logica de junção complaint e usuário fiquem no proprio controller get_complaint

## Atividades Extras 

- [ ] Dockerfile

- [v] testes back-end (usando pytest)
> **Nota de Implementação:** Durante o desenvolvimento, infrentei um desafio relacionado à configuração do ambiente de desenvolvimento com FastAPI. A execução do servidor de desenvolvimento utilizando o comando `fastapi dev app.py` ou `fastapi dev back/app.py` resultava em impossibilidade na execução dos testes do pytest. Isso ocorreu porque o comando `fastapi dev` exige que os caminhos dos módulos sejam especificados de uma forma (por exemplo, `from back.router import users, complaints`), enquanto o `pytest` requer uma estrutura de importação diferente (ou seja, `from routers import users, complaints`). Para resolver essa incompatibilidade e garantir a integridade dos testes, optamos por utilizar o `uvicorn` para iniciar o servidor de desenvolvimento, com o comando `uvicorn app:app --reload --host 0.0.0.0`. Essa abordagem me permitiu manter os testes enquanto desenvolvíamos com FastAPI.

- [ ] adicionar o coverage (pytest-cov)
