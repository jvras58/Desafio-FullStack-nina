from http import HTTPStatus



def test_get_complaints_ok(client):
    """Testa a obtenção de reclamações dentro de um intervalo de datas."""

    from_date = "2024-05-27T15:49:15"
    to_date = "2024-05-27T15:49:15"
    response = client.get(f"/complaints?from_date={from_date}&to_date={to_date}")
    assert response.status_code == HTTPStatus.OK
    complaints = response.json().get('complaints', [])
    assert complaints
    for complaint in complaints:
        assert 'user_id' in complaint
        assert 'neighborhood' in complaint
        assert 'description' in complaint

def test_get_complaints_not_found(client):
    """Testa a obtenção de reclamações dentro de um intervalo de datas sem reclamações."""

    from_date = "2024-05-27T15:48:13"
    to_date = "2024-05-27T15:45:13"
    response = client.get(f"/complaints?from_date={from_date}&to_date={to_date}")
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {"complaints": []}

def test_get_complaints_unprocess(client):
    """Testa a obtenção de reclamações dentro de um intervalo de datas invalido."""

    from_date = "01-01-2022"  
    to_date = "31-01-2022"
    response = client.get(f"/complaints?from_date={from_date}&to_date={to_date}")
    assert response.status_code == HTTPStatus.UNPROCESSABLE_ENTITY 
    assert "detail" in response.json()

def test_get_complaint_ok(client):
    """Testa a obtenção de uma reclamação específica e as informações do usuário associado a ela."""

    complaint_id = "668c36d8e3872b4344d4b38c"
    response = client.get(f"/complaints/{complaint_id}")
    assert response.status_code == HTTPStatus.OK
    complaint = response.json()
    assert complaint['id'] == complaint_id
    # Complaint fields
    assert 'user_id' in complaint
    assert 'neighborhood' in complaint
    assert 'description' in complaint
    # User fields
    user = complaint.get('User', {})
    assert 'id' in user
    assert 'name' in user
    assert 'email' in user


def test_get_complaint_not_found(client):
    """Testa a obtenção de uma reclamação específica que não existe."""
    
    complaint_id = "456"
    response = client.get(f"/complaints/{complaint_id}")
    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {"detail": "Complaint not found."}

def test_get_complaints_from_user_ok(client):
    """Testa a obtenção de reclamações de um usuário específico."""

    user_id = "668c36d5e3872b4344d4b38b"
    response = client.get(f"/complaints/user/{user_id}")
    assert response.status_code == HTTPStatus.OK
    complaints = response.json().get('complaints', [])
    assert complaints
    for complaint in complaints:
        assert 'user_id' in complaint
        assert 'neighborhood' in complaint
        assert 'description' in complaint

def test_get_complaints_from_user_not_found(client):
    """Testa a obtenção de reclamações de um usuário específico que não existe."""

    user_id = "XXX"
    response = client.get(f"/complaints/user/{user_id}")
    assert response.status_code == HTTPStatus.NOT_FOUND
    assert response.json() == {"detail": "User not found."}
