{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [],
   "source": [
    "import json\n",
    "from pymongo import MongoClient\n",
    "\n",
    "client = MongoClient('localhost', 27017)\n",
    "db = client['pro3news']\n",
    "collection= db['keywords']\n",
    "\n",
    "with open('keywords_json.json') as g:\n",
    "    file_data = json.load(g)\n",
    "\n",
    "# if pymongo >= 3.0 use insert_one() for inserting one document\n",
    "collection.insert_one(file_data)\n",
    "\n",
    "\n",
    "client.close()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [],
   "source": [
    "import json\n",
    "from pymongo import MongoClient\n",
    "\n",
    "client = MongoClient('localhost', 27017)\n",
    "db = client['pro3news']\n",
    "collection= db['sentiment']\n",
    "\n",
    "with open('sentiment_all.json') as g:\n",
    "    file_data = json.load(g)\n",
    "\n",
    "# if pymongo >= 3.0 use insert_one() for inserting one document\n",
    "collection.insert_one(file_data)\n",
    "\n",
    "\n",
    "client.close()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [],
   "source": [
    "import json\n",
    "from pymongo import MongoClient\n",
    "\n",
    "client = MongoClient('localhost', 27017)\n",
    "db = client['pro3news']\n",
    "collection= db['shares']\n",
    "\n",
    "with open('shares.json') as g:\n",
    "    file_data = json.load(g)\n",
    "\n",
    "# if pymongo >= 3.0 use insert_one() for inserting one document\n",
    "collection.insert_one(file_data)\n",
    "\n",
    "\n",
    "client.close()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [],
   "source": [
    "import json\n",
    "from pymongo import MongoClient\n",
    "\n",
    "client = MongoClient('localhost', 27017)\n",
    "db = client['pro3news']\n",
    "collection= db['intraDay_stock_data']\n",
    "\n",
    "with open('../COVID-stocks/Stock Data/IntraDayCovidStocks_60min_SP500.json') as g:\n",
    "    file_data = json.load(g)\n",
    "\n",
    "# if pymongo >= 3.0 use insert_one() for inserting one document\n",
    "collection.insert_one(file_data)\n",
    "\n",
    "\n",
    "client.close()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 6,
   "metadata": {},
   "outputs": [],
   "source": [
    "import json\n",
    "from pymongo import MongoClient\n",
    "\n",
    "client = MongoClient('localhost', 27017)\n",
    "db = client['pro3news']\n",
    "collection= db['intraDay_stock_data']\n",
    "\n",
    "with open('../COVID-stocks/Stock Data/IntraDayCovidStocks_60min_DOWindustrial.json') as g:\n",
    "    file_data = json.load(g)\n",
    "\n",
    "# if pymongo >= 3.0 use insert_one() for inserting one document\n",
    "collection.insert_one(file_data)\n",
    "\n",
    "\n",
    "client.close()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 7,
   "metadata": {},
   "outputs": [],
   "source": [
    "import json\n",
    "from pymongo import MongoClient\n",
    "\n",
    "client = MongoClient('localhost', 27017)\n",
    "db = client['pro3news']\n",
    "collection= db['daily_stock_data']\n",
    "\n",
    "with open('../COVID-stocks/Stock Data/DailyCovidStocks_SP500.json') as g:\n",
    "    file_data = json.load(g)\n",
    "\n",
    "# if pymongo >= 3.0 use insert_one() for inserting one document\n",
    "collection.insert_one(file_data)\n",
    "\n",
    "\n",
    "client.close()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "metadata": {},
   "outputs": [],
   "source": [
    "import json\n",
    "from pymongo import MongoClient\n",
    "\n",
    "client = MongoClient('localhost', 27017)\n",
    "db = client['pro3news']\n",
    "collection= db['daily_stock_data']\n",
    "\n",
    "with open('../COVID-stocks/Stock Data/DailyCovidStocks_DOWindustrial.json') as g:\n",
    "    file_data = json.load(g)\n",
    "\n",
    "# if pymongo >= 3.0 use insert_one() for inserting one document\n",
    "collection.insert_one(file_data)\n",
    "\n",
    "\n",
    "client.close()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 9,
   "metadata": {},
   "outputs": [],
   "source": [
    "import json\n",
    "from pymongo import MongoClient\n",
    "\n",
    "client = MongoClient('localhost', 27017)\n",
    "db = client['pro3news']\n",
    "collection= db['weekly_stock_data']\n",
    "\n",
    "with open('../COVID-stocks/Stock Data/WeeklyCovidStocks_DOWindustrial.json') as g:\n",
    "    file_data = json.load(g)\n",
    "\n",
    "# if pymongo >= 3.0 use insert_one() for inserting one document\n",
    "collection.insert_one(file_data)\n",
    "\n",
    "\n",
    "client.close()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 10,
   "metadata": {},
   "outputs": [],
   "source": [
    "import json\n",
    "from pymongo import MongoClient\n",
    "\n",
    "client = MongoClient('localhost', 27017)\n",
    "db = client['pro3news']\n",
    "collection= db['weekly_stock_data']\n",
    "\n",
    "with open('../COVID-stocks/Stock Data/WeeklyCovidStocks_SP500.json') as g:\n",
    "    file_data = json.load(g)\n",
    "\n",
    "# if pymongo >= 3.0 use insert_one() for inserting one document\n",
    "collection.insert_one(file_data)\n",
    "\n",
    "\n",
    "client.close()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 11,
   "metadata": {},
   "outputs": [],
   "source": [
    "import json\n",
    "from pymongo import MongoClient\n",
    "\n",
    "client = MongoClient('localhost', 27017)\n",
    "db = client['pro3news']\n",
    "collection= db['monthly_stock_data']\n",
    "\n",
    "with open('../COVID-stocks/Stock Data/MonthlyCovidStocks_SP500.json') as g:\n",
    "    file_data = json.load(g)\n",
    "\n",
    "# if pymongo >= 3.0 use insert_one() for inserting one document\n",
    "collection.insert_one(file_data)\n",
    "\n",
    "\n",
    "client.close()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 12,
   "metadata": {},
   "outputs": [],
   "source": [
    "import json\n",
    "from pymongo import MongoClient\n",
    "\n",
    "client = MongoClient('localhost', 27017)\n",
    "db = client['pro3news']\n",
    "collection= db['monthly_stock_data']\n",
    "\n",
    "with open('../COVID-stocks/Stock Data/MonthlyCovidStocks_DOWindustrial.json') as g:\n",
    "    file_data = json.load(g)\n",
    "\n",
    "# if pymongo >= 3.0 use insert_one() for inserting one document\n",
    "collection.insert_one(file_data)\n",
    "\n",
    "\n",
    "client.close()"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.7.4-final"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}