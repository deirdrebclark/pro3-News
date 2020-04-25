# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %%
#Import dependencies
import pandas as pd
import json
from pprint import pprint as pp
import pymongo
from pymongo import MongoClient
from pandas.io.json import json_normalize


# %%
#Set up mongodb connection
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.pro3news
collection = db.sentiment


# %%
#Loop through Newspaper json files
newspapers = ['Breitbart','Business_Insider','Fox News','Financial Times','MarketWatch','NYTimes','Reuters','The Guardian','WSJ']
times = ['1_1','1_2','1_3','1_4','2_1','2_2','2_3','2_4','3_1','3_2','3_3','3_4','4_1','4_2']
df = pd.DataFrame(columns = ['newspaper','date','title','sentiment'])
for paper in newspapers:
    for time in times:
        with open(paper+'/'+time+'.json') as json_file:
            news_data = json.load(json_file)
            for data in news_data['articles']['results']:
                df = df.append(pd.DataFrame.from_dict(json_normalize(data),orient = 'columns'),sort = False)


# %%
print (df)


# %%
#Normalize the json data
for data in news_data['articles']['results']:
    total_data_df = pd.DataFrame.from_dict(json_normalize(data), orient='columns')


# %%
#Pull the News Share columns and rename them
sentiment_df = df.loc[:,['source.title','date','title','sentiment']]
sentiment_df.rename(columns={'source.title':'newspaper'},
                     inplace=True)


# %%
print(sentiment_df)


# %%
#Change dataframe back to json
sentiment_dict = sentiment_df.to_dict('records')

#Add the data to mongodb
collection.insert_many(sentiment_dict)


# %%



# %%


