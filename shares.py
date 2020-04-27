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
    # Pull the newspaper facebook shares
    if request.method == 'GET':
        
        newspapers = mongo.db.shares.find()
        #return redirect('/shares_data')
        return render_template('shares.html', popNews = newspapers) 
        #newspapers = list(mongo.db.shares.find())
        #newspaper = json.dumps(newspapers)
        #shares = [json.dumps(newspaper, default=json_util.default) for newspaper in Cursor]
        
        
#@app.route('/shares_data')
#def shares_data():

        
        #return json.dumps(newspapers, default=json_util.default)
        #news = json.dumps(newspapers, default=json_util.default)
        #return shares
  
        #return jsonify(shares=news)


@app.route('/action_page.php')
def form_post():
    return redirect('/shares') 



if __name__ == "__main__":
    app.run(debug=True)
