from flask import Flask, render_template, redirect, jsonify, request
from flask_pymongo import PyMongo
import json
from json import dumps
from bson import json_util
from flask_cors import CORS

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/pro3news"
mongo = PyMongo(app)

# Or set inline
# mongo = PyMongo(app, uri="mongodb://localhost:27017/pro3news")

# "Querying By ObjectId"
# pprint.pprint(posts.find_one({"_id": post_id}))

# @app.route("/")

#post_id1 = ObjectId("5ea0ea2fab861eda980a0509")


@app.route("/home.html")
def index():
    intraDayCollections = mongo.db.intraDay_stock_data.find()
    for item in intraDayCollections:
        print(intraDayCollections)
    return render_template("home.html", IDC=intraDayCollections)


@app.route("/clouds.html")
def story():
    intraDayCollections = mongo.db.intraDay_stock_data.find()
    for item in intraDayCollections:
        print(intraDayCollections)
    return render_template("clouds.html", IDC=intraDayCollections)


@app.route("/sentiment.html")
def sentiment():
    sentiment = mongo.db.sentiment.find()
    page_sanitized = json.loads(json_util.dumps(sentiment))
    test = json.dumps(page_sanitized, separators=(',', ':'))
    return render_template("sentiment.html", sentiment=test)


@app.route('/shares.html', methods=['GET', 'POST'])
def news_shares():
    if request.method == "POST":
        weekday = request.form.get('weekday')
        print(weekday)
        return render_template('/shares.html', weekday = weekday)
        
    if request.method == 'GET':
        return render_template('/shares.html')

@app.route('/xyz')
def share_data():
    data = list(mongo.db.shares.find())
    import math
    for entry in data:
        if math.isnan(entry['shares']):
            entry['shares'] = 0
    js_data = jsonify(json.loads(json_util.dumps(data)))
    return js_data

@app.route('/action_page.php')
def form_post():
    return render_template('/shares.html')  

@app.route("/bubbles.html")
def words():
    data = 'templates/data.js'
    return render_template('bubbles.html', data=data)


if __name__ == "__main__":
    app.run(debug=True)
