from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import json

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

@app.route("/intraDay_stock_data")
def index():
    intraDayCollections = mongo.db.intraDay_stock_data.find()
    for item in intraDayCollections:    
        print (intraDayCollections)
    return render_template("stocks.html", IDC=intraDayCollections)

# @app.route("/intraDay_stocks_SP")
# def index2():
#     intraDayCollections = mongo.db.intraDay_stock_data.find_one({"_id": ObjectId("5ea0ea2fab861eda980a050b")})
#     return render_template("index.html", IDC_SP=intraDayCollections)

# @app.route("/intraDay_stocks_DOW")
# def index2():
#     intraDayCollections = mongo.db.intraDay_stock_data.find_one({"_id": ObjectId("5ea0ea2fab861eda980a050b")})
#     return render_template("index.html", IDC_DOW=intraDayCollectionsDOW)



# @app.route("/daily_stocks")
# def index():
#     dailyCollections = mongo.db.daily_stock_data.find()
#     return render_template("stocks.html", DC=dailyCollections)



# @app.route("/weekly_stocks")
# def index():
#     weeklyCollections = mongo.db.weekly_stock_data.find()
#     return render_template("stocks.html", WC=weeklyCollections)


# @app.route("/monthly_stocks")
# def index():
#     monthlyCollections = mongo.db.daily_stock_data.find()
#     return render_template("stocks.html", MC=monthlyCollections)




if __name__ == "__main__":
    app.run(debug=True)