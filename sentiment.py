#import dependecies 

from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import plotly


app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/pro3news"
mongo = PyMongo(app)

# Or set inline
# mongo = PyMongo(app, uri="mongodb://localhost:27017/pro3news")

# def get_chart(data):

#     layout = plotly.graph_objs.Layout(title='Coronavirus Sentiment in Newspapers')
#     scatter_data = [
#         plotly.graph_objs.Scatter(
#             # x=[d['date'] for d in data],
#             x=[d['sentiment'] for d in data],
#             y=[d['sentiment'] for d in data]
#         )
#     ]
#     fig = plotly.graph_objs.Figure(data=scatter_data, layout=layout)
#     return plotly.offline.plot(fig, include_plotlyjs=True, output_type='div')

# @app.route('/sentiment')
# def chart():
#     sentiment = mongo.db.sentiment.find()
#     print(sentiment)
#     return render_template('sentiment.html',sentiment = sentiment)

@app.route("/sentiment")
def index():
    sentiment = mongo.db.sentiment.find()
    return render_template("sentiment.html", sentiment = sentiment)


if __name__ == "__main__":
    app.run(debug=True)