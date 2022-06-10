import os
from dotenv import load_dotenv
from database import *
from flask import Flask, send_from_directory, request, render_template
load_dotenv(verbose=True)

def xuat(x):
    print(x, flush=True)

Initialize_Database()

pwd = os.environ['PWD']
static_directory = os.path.join(pwd, 'static')
app = Flask(__name__, static_url_path=static_directory)

@app.route('/', methods = ['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html', error='')
    else:
        data = request.form
        try:
            if Check_Login(data['username'], data['password']):
                return render_template('admin.html')
            else:
                return render_template('index.html', error='Cannot authenticate. Wrong username or password')
        except Exception as err:
            return render_template('index.html', error=str(err))

@app.route('/css/<path:path>')
def css(path):
    return send_from_directory(os.path.join(static_directory, 'css'), path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1339)
