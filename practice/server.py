import re
from flask import Flask, render_template, request
import subprocess
import sys

import mysql.connector
import subprocess

app = Flask(__name__)

def checkIfPresent(movie):
    config = {
    'user': 'root',
    'password': 'project',
    'host': '35.238.234.67',
    'database' : 'project'
    }
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    query = ("SELECT * FROM db1 where movie_name = %s")
    cursor.execute(query, (movie,))
    records = cursor.fetchall()
    if len(records) == 0:
        return False
    return True

def getDetails(movie):
    config = {
    'user': 'root',
    'password': 'project',
    'host': '35.238.234.67',
    'database' : 'project'
    }
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    query = ("SELECT * FROM db1 where movie_name = %s")
    cursor.execute(query, (movie,))
    records = cursor.fetchall()
    return records

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/my-link/',  methods=['POST'])
def my_link():
    print("hi")
    movie = request.form["movie"]
    print(movie)
    movie = "Avengers: Endgame"
    if checkIfPresent(movie): 
        details = getDetails(movie)
        for detail in details:
            movie_name = detail[0]
            providers = detail[1].split('---')
            for provider in providers:
                print(provider)
        # print(details)
    else:
        subprocess.call(['node', 'getID.js',movie])
        subprocess.call(['python', 'parser.py'])
        details = getDetails(movie)
        for detail in details:
            movie_name = detail[0]
            providers = detail[1].split('---')
            for provider in providers:
                print(provider)
    
    # return subprocess.check_output(['python', 'starter.py', 'Avengers: Infinity War'])
    

if __name__ == '__main__':
  app.run(debug=True)