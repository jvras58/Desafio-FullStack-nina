FROM python:3.11-slim as backend

ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY . .

# Instala todas as dependências
RUN pip install -r requirements.txt

# Define o PYTHONPATH
ENV PYTHONPATH=$PYTHONPATH:/app

# Executa os testes
RUN pytest

EXPOSE 6000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]


# docker build -t api-complaints .  
# docker run -p 8000:8000 api-complaints
# entrar no container interativo para debugar: docker exec -it <container_id> /bin/bash
