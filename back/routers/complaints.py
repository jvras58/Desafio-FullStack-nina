from datetime import datetime
from http import HTTPStatus
from typing import Optional

from database.database import client
from dateutil.parser import parse
from fastapi import APIRouter, HTTPException, Query
from schemas.complaints import (ComplaintList, ComplaintSchema,
                                ComplaintUserList)
from schemas.group_bys import (GroupByAgeGroup, GroupByGenders, GroupByMoment,
                               GroupByMonths, GroupByNeighborhoods,
                               GroupByTypes)

router = APIRouter(prefix='/complaints', tags=['complaints'])



@router.get("/", response_model=ComplaintUserList)
def get_complaints(
    from_date: Optional[datetime]= Query(..., description="Data de início em YYYY-MM-DD-TT format"), 
    to_date: Optional[datetime] = Query(..., description="Data de término em YYYY-MM-DD-TT format"),
    skip: int = 0, limit: int = 10
    ):
    """Retorna uma lista de reclamações filtradas por intervalo de datas."""

    complaints = client.get_complaints()
    filtered_complaints = list(filter(lambda complaint: from_date <= parse(complaint["date"]) <= to_date, complaints))    
    complaints = filtered_complaints[skip:skip+limit]
    hasNextPage = True if len(filtered_complaints) - skip > limit else False
    hasPreviousPage = True if skip > 0 else False

    if not hasNextPage and not hasPreviousPage:
        return {"complaints": complaints}

    return {
        "complaints": complaints,
        "hasNextPage": hasNextPage,
        "hasPreviousPage": hasPreviousPage,
        "quantity": len(filtered_complaints),
    }


@router.get('/{complaint_id}', response_model=ComplaintSchema)
def get_complaint(complaint_id: str):
    """Retorna uma reclamação específica e as informações do usuário associado a ela."""

    complaint = client.get_complaint(complaint_id)

    if complaint is None:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Complaint not found.")

    return complaint

# TODO: NÃO ira ser usada no front-end
@router.get('/user/{user_id}', response_model=ComplaintList)
def get_complaints_from_user(user_id: str):
    """Retorna uma lista de reclamações de um usuário específico."""

    user = client.get_user(user_id)
    if user is None:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="User not found.")

    complaints = client.get_complaints()
    user_complaints = [
        complaint for complaint in complaints
        if complaint["user_id"] == user_id
    ]
    return {"complaints": user_complaints}

@router.get('/group/types', response_model=GroupByTypes)
def get_complaints_group_by_types():
    """Retorna o número de reclamações agrupadas por tipo."""
    return client.group_by('type')

@router.get('/group/genders', response_model=GroupByGenders)
def get_complaints_group_by_genders():
    """Retorna o número de reclamações agrupadas por gênero"""

    return client.group_by('user_gender')

@router.get('/group/age_group', response_model=GroupByAgeGroup)
def get_complaints_group_by_age_group():
    """Retorna o número de reclamações agrupadas por faixa etária."""

    return client.group_by_age_group()

@router.get('/group/at_moment', response_model=GroupByMoment)
def get_complaints_group_by_moment():
    """Retorna o número de reclamações agrupadas por momento."""

    grouped_by_at_moment = client.group_by('at_moment')
    output = { str(key): value for key, value in grouped_by_at_moment.items() }
    return output

@router.get('/group/months', response_model=GroupByMonths)
def get_complaints_group_by_months():
    """Retorna o número de reclamações agrupadas por mês."""

    return client.group_by_month()

@router.get('/group/neighborhoods', response_model=list[GroupByNeighborhoods])
def get_complaints_group_by_neighborhoods():
    """Retorna o número de reclamações agrupadas por bairro."""

    grouped_by_neighborhoods = client.group_by('neighborhood')
    output = [
        {'name': neighborhood, 'count': count }
        for neighborhood, count
        in grouped_by_neighborhoods.items()
    ]

    if len(output) == 0:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="No neighborhoods found.")

    return output

    if len(output) == 0:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail="No neighborhoods found."
        )

    return output
