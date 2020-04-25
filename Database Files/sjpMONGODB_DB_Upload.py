{
 "nbformat": 4,
 "nbformat_minor": 2,
 "metadata": {
  "language_info": {
   "name": "python",
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "version": "3.7.4-final"
  },
  "orig_nbformat": 2,
  "file_extension": ".py",
  "mimetype": "text/x-python",
  "name": "python",
  "npconvert_exporter": "python",
  "pygments_lexer": "ipython3",
  "version": 3,
  "kernelspec": {
   "name": "python37464bitbasecondae1a540739375406c8124128569af8a2e",
   "display_name": "Python 3.7.4 64-bit ('base': conda)"
  }
 },
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 6,
   "metadata": {},
   "outputs": [],
   "source": [
    "import json\n",
    "from pymongo import MongoClient\n",
    "client = MongoClient('localhost', 27017)\n",
    "db = client['pro3news']\n",
    "collection= db['sentiment']\n",
    "with open('sentiment_all.json') as g:\n",
    "    file_data = json.load(g)\n",
    "# if pymongo >= 3.0 use insert_one() for inserting one document\n",
    "collection.insert_one(file_data)\n",
    "client.close()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ]
}