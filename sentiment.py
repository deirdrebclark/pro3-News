#import dependecies 

from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import plotly
from bson import json_util
import json
from ast import literal_eval


app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/pro3news"
mongo = PyMongo(app)

# Or set inline
# mongo = PyMongo(app, uri="mongodb://localhost:27017/pro3news")


@app.route("/sentiment")
def index():
    sentiment = mongo.db.sentiment.find()
    page_sanitized = json.loads(json_util.dumps(sentiment))
    test = json.dumps(page_sanitized, separators=(',', ':'))
    return render_template("sentiment.html", sentiment = test)


if __name__ == "__main__":
    app.run(debug=True)