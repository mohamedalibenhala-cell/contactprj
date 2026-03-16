from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS   # ✅ Ajout pour autoriser les requêtes du frontend
import os

app = Flask(__name__)
CORS(app)  # ✅ Autorise les requêtes depuis le frontend (React)

# Configuration MySQL
app.config['MYSQL_HOST'] = os.environ.get('MYSQL_HOST', 'db')
app.config['MYSQL_USER'] = os.environ.get('MYSQL_USER', 'root')
app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASSWORD', 'rootpass')
app.config['MYSQL_DB'] = os.environ.get('MYSQL_DB', 'contacts')

mysql = MySQL(app)

@app.route('/contacts', methods=['POST'])
def add_contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT INTO contact (name, email, message) VALUES (%s, %s, %s)",
        (name, email, message)
    )
    mysql.connection.commit()
    cur.close()
    return jsonify({"status": "success"}), 201

@app.route('/contacts', methods=['GET'])
def get_contacts():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM contact")
    results = cur.fetchall()
    cur.close()
    return jsonify(results)

if __name__ == '__main__':
    # ✅ Important : écouter sur toutes les interfaces réseau du conteneur
    app.run(host='0.0.0.0', port=5000, debug=True)
