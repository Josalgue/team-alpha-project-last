from flask import Flask, render_template, jsonify
import pandas as pd
from sqlalchemy import create_engine
import os

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/musicAnalysis")
def byCountry():
    return render_template("musicAnalysis.html")

@app.route("/byCountry")
def byCountry():
    return render_template("byCountry.html")

@app.route("/byGenre")
def byGenre():
    return render_template("byGenre.html")

@app.route("/byDecade")
def datasets():
    return render_template("byDecade.html")


@app.route("/api_countries")
def api_countries():
    #connection_string = "postgres://postgres:ABC@123@localhost/spotify"
    connection_string = os.environ.get("DATABASE_URL","")
    conn = create_engine(connection_string)
    data = pd.read_sql("select * from by_decade",conn)
    return data.to_json(orient="records")

@app.route("/json_gauges")
def api():
    decades_df = pd.read_csv("data_processing/data/decades.csv")
    return(decades_df
        .groupby(['decade']).mean()
        .rename(columns={'nrgy': 'energy', 'dnce': 'danceability','val':'valence','pop':'popularity'})
        .round(0)
        .reset_index()
        .loc[:,["decade","danceability","energy","valence","popularity"]]
        .to_json(orient='records')
    )


if __name__=="__main__":
    app.run(debug=True)