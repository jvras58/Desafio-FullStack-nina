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
