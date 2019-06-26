from requests import get

def sample_JSON():
    data = get('https://jsonplaceholder.typicode.com/posts', verify=False)
    data = data.json()
    return data

def sample_JSON_albums():
    data = get('https://jsonplaceholder.typicode.com/albums', verify=False)
    data = data.json()
    return data
