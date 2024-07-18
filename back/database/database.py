import json
import os
from datetime import datetime

from .db_exceptions import MonthNumberException

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

USERS_FILE_PATH = os.path.join(__location__, "mocked_users_data.json")
COMPLAINTS_FILE_PATH = os.path.join(__location__, "mocked_complaints_data.json")
DATE_FORMAT = "%Y-%m-%dT%H:%M:%S"

class Database:
    """ Classe que simula um banco de dados. """
    def __init__(self) -> None:
        """ Inicializa o banco de dados com os dados dos arquivos JSON."""
        self.users = []
        with open(USERS_FILE_PATH, 'r') as file:
            self.users = json.load(file)
        
        self.complaints = []
        with open(COMPLAINTS_FILE_PATH, 'r') as file:
            self.complaints = json.load(file)

    def _increment_count(self, d: dict, key: str):
        """ Incrementa o valor de uma chave em um dicionário. """
        if key not in d:
            d[key] = 0
        d[key] += 1

    def _get_age(self, birthdate: datetime):
        """ Retorna uma idade em anos com base na data de nascimento e na data atual. """
        today = datetime.today()
        age = today.year - birthdate.year
        if (today.month, today.day) < (birthdate.month, birthdate.day):
            age -= 1
        return age

    def _get_age_group(self, birthdate: datetime):
        """ Retorna uma string representando um age_group com base na data de nascimento. """
        age = self._get_age(birthdate)
        
        if age < 14:
            return "< 14"
        if age <= 18:
            return "14 - 18"
        if age <= 29:
            return "19 - 29"
        if age <= 39:
            return "30 - 39"
        if age <= 49:
            return "40 - 49"
        if age <= 59:
            return "50 - 59"
        return "> 60"
    
    def _get_date_elements(self, d: datetime):
        """ Retorna dia, mês e ano de um objeto datetime como valores int. """
        return d.day, d.month, d.year
    
    def _translate_month_int_to_name(self, month_num: int)-> str:
        """Retorna o nome de um mês com base em seu número. """
        months = {
            1: "Jan",
            2: "Fev",
            3: "Mar",
            4: "Abr",
            5: "Mai",
            6: "Jun",
            7: "Jul",
            8: "Ago",
            9: "Set",
            10: "Out",
            11: "Nov",
            12: "Dez",
        }

        try:
            month_name = months[month_num]
        # TODO: add keyerror exception no lugar de except
        except KeyError:
            raise MonthNumberException("Month Number outside of range (1 .. 12).")

        return month_name

    def insert_complaint(self):
        pass

    def get_complaints(self):
        """ Retorna uma lista de reclamações."""
        complaints_with_user_data = []
        users = { user['id']: user for user in self.users }
        
        for complaint in self.complaints:
            user_id = complaint['user_id']
            user = users[user_id]

            for key, value in user.items():
                complaint[f'user_{key}'] = value

            complaints_with_user_data.append(complaint)

        return complaints_with_user_data

    def get_complaint(self, _id: str = None):
        """ Retorna uma reclamação específica e as informações do usuário associado a ela."""
        result = list(filter(lambda x: x['id'] == _id, self.complaints))
        if len(result) > 0:
            complaint = result[0]
            user = self.get_user(complaint["user_id"])
            if user:
                complaint['User'] = user
            return complaint
        return None
    
    def group_by(self, complaint_key: str):
        """ Agrupa o número de reclamações por cada valor de determinada chave. """
        grouped_data = {}
        complaints = self.get_complaints()
        for complaint in complaints:
            value = complaint[complaint_key]
            self._increment_count(grouped_data, value)

        return grouped_data
    
    def group_by_month(self):
        """ Agrupa o número de reclamações por mês. """
        grouped_data = {}
        complaints = self.get_complaints()
        for complaint in complaints:
            date = datetime.strptime(complaint['date'], DATE_FORMAT)
            _, month, _ = self._get_date_elements(date)
            month_name = self._translate_month_int_to_name(month)
            self._increment_count(grouped_data, month_name)

        return grouped_data
    
    def group_by_age_group(self):
        """ Agrupa o número de reclamações por faixas etárias. """
        grouped_data = {}
        complaints = self.get_complaints()
        for complaint in complaints:
            user_birthdate = datetime.strptime(complaint['user_birthdate'], DATE_FORMAT)  
            age_group = self._get_age_group(user_birthdate) 
            self._increment_count(grouped_data, age_group)

        return grouped_data
    
    def update_complaint(self):
        pass

    def delete_complaint(self):
        pass

    def get_users(self):
        return self.users

    def get_user(self, _id: str = None):
        result = list(filter(lambda x: x['id'] == _id, self.users))
        if len(result) > 0:
            return result[0]
        return None
    
client = Database()
