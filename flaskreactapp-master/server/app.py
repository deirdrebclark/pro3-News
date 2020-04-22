import json
from flask import Flask

app = Flask(__name__)

with open('../data/keywords_json.json', 'r') as f:
    jsondata = json.load(f)


@app.route('/')
def index():
    return jsondata


if __name__ == '__main__':
    app.run(debug=True)
