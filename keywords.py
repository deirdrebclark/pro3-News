import json
from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/pro3news"
mongo = PyMongo(app)


@app.route("/keywords")
def index():
    keywords = mongo.db.keywords.find_one()
    return render_template("keywords.html", keywords=keywords)


if __name__ == "__main__":
    app.run(debug=True)
