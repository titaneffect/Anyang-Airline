from flask import Flask
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
from routes import init_routes

app = Flask(__name__)

# Flask Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'your_password'
app.config['MYSQL_DB'] = 'AIRreservation'
app.config['SECRET_KEY'] = 'your_secret_key'

# Initialize Extensions
mysql = MySQL(app)
bcrypt = Bcrypt(app)

# Initialize Routes
init_routes(app, mysql, bcrypt)

if __name__ == "__main__":
    app.run(debug=True)
