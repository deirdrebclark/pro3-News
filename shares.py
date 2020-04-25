from flask import Flask, render_template, jsonify
import json
import response


# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
from flask_pymongo import PyMongo

# Create an instance of our Flask app.
app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/pro3news"
mongo = PyMongo(app)

# Create connection variable
#conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
#client = PyMongo.MongoClient(conn)

# Connect to a database. 
#db = client.pro3news
#collection = db.shares


# Set route

data = {}
@app.route('/shares')
def news_shares():
    # Pull the newspaper facebook shares
    newspaper = mongo.db.shares.find()
    return render_template('shares.html',) 

    print(jsonify(newspaper))
    
    #result = newspaper.find_one({'newspaper':newspaper.newspaper,'date':newspaper.date,'url':newspaper.url,'title':newspaper.title,'shares':newspaper.shares})

    #return jsonify({'results': result['values']})
    #
    # this one works
    #for news in newspaper:
       # js = list({'newspaper':news.newspaper,'date':news.date,'url':news.url,'title':news.title,'shares':news.shares})

    # Return the template with the shares passed in
    #return render_template('index.html', shares = newspaper)

    #return jsonify({'results':result('newspaper','date','url','title','shares')})
    #return jsonify({'paper':'newspaper'})
    #return response(json.dumps(js), mimetype='application/json')
    #
    # 
    # this one works
    #return jsonify(js['values'])

    #
    # 
    # this one works, too
    #return jsonify({'values':js})

if __name__ == "__main__":
    app.run(debug=True)
