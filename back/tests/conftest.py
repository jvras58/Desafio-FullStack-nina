import pytest
from fastapi.testclient import TestClient

from app import app

# pytest back/tests/test_complaints.py -s  

@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client
