from flask import Flask, render_template, jsonify, request, redirect
import flask
import json, response
from json import dumps
from bson import json_util

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/pro3news"
mongo = PyMongo(app)

# Set route

data = {}
@app.route('/shares', methods=['GET','POST'])
def news_shares():
    print('inside news shares')
    if request.method == "POST":
        if request.form['weekday'] > "":
            weekday = request.form['weekday']
            return weekday
            print("Input")
            print(weekday)

    if request.method == 'GET':
        
        newspapers = mongo.db.shares.find()

        return render_template('shares.html', popNews = newspapers) 

        
        



@app.route('/action_page.php')
def form_post():
    return redirect('/shares') 



if __name__ == "__main__":
    app.run(debug=True)
