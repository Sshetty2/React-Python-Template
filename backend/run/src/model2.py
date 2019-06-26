from requests import get

def sample_JSON():
    data = get('https://jsonplaceholder.typicode.com/todos/1')
    data = data.json()
    return data

def sample_JSON_albums():
    data = get('https://jsonplaceholder.typicode.com/albums')
    data = data.json()
    return data
