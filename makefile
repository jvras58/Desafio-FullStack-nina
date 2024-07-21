#bash/sh

up:
	gnome-terminal -- make up-backend
	gnome-terminal -- make up-frontend


up-backend:
	cd back && \
	pip install -r requirements.txt && \
	uvicorn app:app --reload --host 0.0.0.0

test-backend:
	cd back && \
	pytest

up-dockefile-backend:
	cd back && \
	docker build -t api-complaints . && \
	docker run -p 8000:8000 api-complaints

up-frontend:
	cd front && \
	npm i && \
	npm start
