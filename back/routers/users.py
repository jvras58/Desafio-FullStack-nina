from schemas.users import UserSchema, UserList
from fastapi import APIRouter, HTTPException
from database.database import client
from http import HTTPStatus

router = APIRouter(prefix='/users', tags=['users'])

@router.get('/', response_model=UserList)
def get_users():
    """Retorna uma lista de usuários."""

    users = client.get_users()
    return {'users': users}

@router.get('/{user_id}', response_model=UserSchema)
def get_user(user_id: str):
    """Retorna um usuário específico."""

    user = client.get_user(user_id)
    if user is None:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="User not found.")
    return user
