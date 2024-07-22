# Lista de Tarefas e Dificuldades do Projeto

## Tarefas Pendentes

### Dockerização da Aplicação
- [ ] Criar um Dockerfile para a aplicação.
- [ ] Configurar o NGINX como servidor proxy reverso no Docker.

### Ajustes nos Testes
- [ ] Revisar e ajustar os testes unitários com Jasmine para garantir a cobertura de código.

## Dificuldades Encontradas

### Distorção no Gráfico de Faixa Etária

#### Problema:
No gráfico de faixa etária, o back-end retorna um JSON que não corresponde ao layout solicitado no Figma. O formato atual é:

```json
{
  "< 14": 0,
  "14 - 18": 0,
  "19 - 29": 0,
  "30 - 39": 0,
  "40 - 49": 0,
  "50 - 59": 0,
  "> 60": 0
}
```

#### Expectativa:
Uma coluna com a idade estimada e outra com a idade confirmada.

## Próximos Passos e Soluções

### Dockerização da Aplicação
- Pesquisar melhores práticas para dockerizar aplicações Angular com NGINX.
- Consultar a documentação oficial do Docker e NGINX para configurações recomendadas.

### Ajustes nos Testes
- Revisar a documentação do Jasmine para identificar possíveis falhas nos testes atuais.
- Implementar testes adicionais conforme necessário para melhorar a cobertura.

### Correção do Gráfico de Faixa Etária
- Analisar a lógica de geração dos dados no back-end para ajustar o formato do JSON retornado.
- Modificar o componente do gráfico no front-end para se adaptar ao novo formato de dados.

### Ajustes no Charts components
- como o Angular 18 é relativamente novo integra-lo com o charts.js foi um pouco desafiador
---

Este documento será atualizado conforme o progresso das tarefas e a resolução das dificuldades.