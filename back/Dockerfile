FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["fastapi", "dev", "app.py", "--host", "0.0.0.0", "--port", "8000"]


# docker build -t api-complaints .  
# docker run -p 8000:8000 api-complaints
# entrar no container interativo para debugar: docker exec -it <container_id> /bin/bash
