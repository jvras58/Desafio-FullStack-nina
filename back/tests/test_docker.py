import os



def test_read_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Olá Mundo!"}

def test_dockerfile_build():
    # Build the Docker image
    stream = os.popen("docker build -t myapp-backend .")
    output = stream.read()
    assert "Successfully built" in output

def test_dockerfile_run(client):
    # Run the Docker container
    stream = os.popen("docker run -d -p 8000:8000 myapp-backend")
    container_id = stream.read().strip()

    # Test the running container
    response = client.get("http://localhost:8000/")
    assert response.status_code == 200
    assert response.json() == {"message": "Olá Mundo!"}

    # Stop and remove the container
    os.popen(f"docker stop {container_id}")
    os.popen(f"docker rm {container_id}")
