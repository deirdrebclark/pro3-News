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
newspapers = mongo.db.shares.find()
print(newspapers)

@app.route('/shares.html', methods=['GET','POST'])
def news_shares():
    myCursor = mongo.db.shares.find()
    for story in myCursor:
        print('{0} {1}'.format(story['newspaper'],story['title']))
    
    print('inside news shares')
    if request.method == "POST":
        print('inside post')
        if request.form['weekday'] > "":
            weekday = request.form['weekday']
            return weekday
            print("Input")
            print(weekday)

    if request.method == 'GET':
        print('inside get')
        newspapers = mongo.db.shares.find()
        return render_template('shares.html', popNews = newspapers)
        

@app.route('/action_page.php')
def form_post():
    return redirect('/shares.html') 



if __name__ == "__main__":
    app.run(debug=True)
