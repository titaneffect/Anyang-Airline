from flask import render_template, request, redirect, url_for, flash
from flask_bcrypt import Bcrypt

# routes.py 파일에 init_routes 함수 정의
def init_routes(app, mysql, bcrypt):
    @app.route('/')
    def home():
        return render_template('base.html')

    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if request.method == 'POST':
            email = request.form['email']
            password = request.form['password']

            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM users WHERE email = %s", [email])
            user = cur.fetchone()
            cur.close()

            if user and bcrypt.check_password_hash(user[2], password):  # Assuming password is in the 3rd column
                flash('Login successful!', 'success')
                return redirect(url_for('home'))
            else:
                flash('Invalid credentials.', 'danger')

        return render_template('login.html')

    @app.route('/register', methods=['GET', 'POST'])
    def register():
        if request.method == 'POST':
            name = request.form['name']
            email = request.form['email']
            password = bcrypt.generate_password_hash(request.form['password']).decode('utf-8')

            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
            mysql.connection.commit()
            cur.close()

            flash('Registration successful! Please log in.', 'success')
            return redirect(url_for('login'))

        return render_template('register.html')

    @app.route('/search', methods=['GET', 'POST'])
    def search():
        if request.method == 'POST':
            query = request.form['query']
            # Add logic to search the database
            results = []  # Replace with actual search results
            return render_template('results.html', results=results)

        return render_template('search.html')
