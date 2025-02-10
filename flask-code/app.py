from flask import Flask,request,jsonify
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def dbconnection():
    conn = psycopg2.connect(
        dbname = 'next-post',
        user = 'postgres',
        password = '99999999',
        host = 'localhost'
    )
    return conn

@app.route('/')
def home():
    return 'Home'

@app.route('/posts',methods=["GET"])
def getposts():
    connect = dbconnection()
    cur = connect.cursor()
    cur.execute('SELECT * FROM posts ORDER BY id DESC;')
    posts = cur.fetchall()
    cur.close()
    connect.close()
    return jsonify(posts)


@app.route('/posts',methods=['POST'])
def addposts():
    connect = dbconnection()
    data = request.get_json()
    title = data["title"]
    content = data["content"]
    cur = connect.cursor()
    cur.execute('INSERT INTO posts (title,content) VALUES (%s,%s)',(title,content))
    connect.commit()
    cur.close()
    connect.close()
    return jsonify({'messages':'Post added succesfully'}),201

@app.route('/posts/<int:id>',methods=["DELETE"])
def deletepost(id):
    connect = dbconnection()
    cur = connect.cursor()
    cur.execute('DELETE FROM posts WHERE id = %s',(id,))
    connect.commit()
    cur.close()
    connect.close()
    return jsonify({'messages':'Post Delete Succesfully'}),200

if __name__ == "__main__":
    app.run(debug=True)