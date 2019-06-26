#!/usr/bin/env python3

from flask import Flask, jsonify, json
# import connexion
import model2
# from flask_cors import CORS

# app = connexion.FlaskApp(__name__, specification_dir='./')
# CORS(app.app)
# app.add_api('swagger.yml')

app = Flask(__name__)

#from connexion docs to set CORS headers
@app.route('/', methods=['GET'])
def sample_JSON():
    data = model2.sample_JSON()
    response = app.response_class(
    response=json.dumps(data),
    status=200,
    mimetype='application/json'
    )
    return response

@app.route('/albums', methods=['GET'])
def sample_JSON_albums():
    data = model2.sample_JSON_albums()
    response = app.response_class(
    response=json.dumps(data),
    status=200,
    mimetype='application/json'
    )
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port = 5000) 