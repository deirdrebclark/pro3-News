#import dependecies 

from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import plotly
from bson.json_util import dumps
import json


app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/pro3news"
mongo = PyMongo(app)

# Or set inline
# mongo = PyMongo(app, uri="mongodb://localhost:27017/pro3news")


@app.route("/sentiment")
def index():
    sentiment = mongo.db.sentiment.find()
    return render_template("sentiment.html", sentiment = sentiment)


if __name__ == "__main__":
    app.run(debug=True)