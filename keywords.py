import json
from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/pro3news"
mongo = PyMongo(app)


@app.route("/wordclouds")
def index():
    keywords = mongo.db.wordclouds.find()
    for item in keywords:
        print(item)
    return render_template("keywords.html", keywords=keywords)


if __name__ == "__main__":
    app.run(debug=True)
