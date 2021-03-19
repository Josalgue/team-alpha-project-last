import streamlit as st
import pickle
import numpy as np
import pandas as pd
import plotly.graph_objects as go

### Code adopted from https://github.com/dataprofessor/code/blob/master/streamlit/part2/iris-ml-app.py

### Code adopted from https://github.com/dataprofessor/code/blob/master/streamlit/part2/iris-ml-app.py

st.write("""
# Song Popularity Prediction App
## This app can predict a song's popularity for the Mexican Market based on songs from 2010-2021!

The user input features information can be found below.
""")

spotify_api = '[API Spotify Audio Features](https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-audio-features)'    
st.markdown(spotify_api, unsafe_allow_html=True)


st.write("## You can go back to our analysis website here:")
link = '[Our Heroku webpage](https://github.com/Josalgue/team-alpha-project-2)'
st.markdown(link, unsafe_allow_html=True)

st.sidebar.header('User Input Parameters')


# Get user inputs
def user_input_features():
    explicit = st.sidebar.slider('explicit', 0, 1, 1)
    danceability = st.sidebar.slider('danceability', 0.0, 1.0, 0.7)
    energy = st.sidebar.slider('energy', 0.0, 1.0, 0.5)
    key = st.sidebar.slider('key', 0, 11, 3)
    loudness = st.sidebar.slider('loudness', -25.0, 3.2, -4.0)
    mode = st.sidebar.slider('mode', 0, 1, 0)
    speechiness = st.sidebar.slider('speechiness', 0.0, 1.0, 0.03)
    acousticness = st.sidebar.slider('acousticness', 0.0, 1.0, 0.23)
    instrumentalness = st.sidebar.slider('instrumentalness', 0.0, 1.0, 0.0)
    liveness = st.sidebar.slider('liveness', 0.0, 1.0, 0.5)
    valence = st.sidebar.slider('valence', 0.0, 1.0, 0.7)
    tempo = st.sidebar.slider('tempo', 0.0, 215.0, 92.0)
    duration_ms = st.sidebar.slider('duration_ms', 5000, 564000, 141000)
    # time_signature = st.sidebar.slider('time_signature', 0, 5, 4)
    data = {'explicit': explicit,
            'danceability': danceability,
            'energy': energy,
            'key': key,
            'loudness': loudness,
            'mode': mode,
            'speechiness': speechiness,
            'acousticness': acousticness,
            'instrumentalness': instrumentalness,
            'liveness': liveness,
            'valence': valence,
            'tempo': tempo,
            'duration_ms': duration_ms,
            # 'time_signature': time_signature
            }
    features = pd.DataFrame(data, index=[0])
    return features


df = user_input_features()

# Show user inputs
st.subheader('User Input parameters')
st.write(df)

# Create Plotly plot
columns = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'speechiness']
df_song_char = df.filter(items=columns)
y = df_song_char.values.tolist()[0]

fig = go.Figure(data=go.Bar(x=columns, y=y), layout_title_text='Audio Features from User Input')
st.plotly_chart(fig, use_container_width=True)

# load from pickle file
model_final_pipe = pickle.load(open('model_final.pkl', 'rb'))

prediction = model_final_pipe.predict(df)

st.subheader('Predicted Song Popularity')
prediction = int(np.round(prediction, 0))
st.write(prediction)
