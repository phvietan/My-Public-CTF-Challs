import os
import mysql.connector
from dotenv import load_dotenv
load_dotenv(verbose=True)

def GetDB():
    return mysql.connector.connect(
        host='database',
        user='silversoul',
        passwd='Ec4Fw94C5',
        port=3306,
        database='baby-sql',
        auth_plugin='mysql_native_password'
    )

def xuat(x):
    print(x, flush=True)

def Initialize_Database():
    mydb = GetDB()
    mycursor = mydb.cursor()
    mycursor.execute("CREATE TABLE account (id int auto_increment PRIMARY KEY, username VARCHAR(20) NOT NULL UNIQUE, password VARCHAR(20))")
    mycursor.execute("INSERT INTO account VALUE (1, 'admin', 'iWfEj89nc39a4')")
    mydb.commit()
    mycursor.close()
    mydb.close()

def Check_Login(username, password):
    username = username.strip()
    password = password.strip()

    mydb = GetDB()
    mycursor = mydb.cursor()

    try:
        mycursor.execute("SELECT * FROM account WHERE username = \'" + username + "\' AND password = \'" + password + "\'")
        myresult = mycursor.fetchall()
        mycursor.close()
        mydb.close()
        if len(myresult) == 1 and myresult[0][1] == username:
            return True
        return False
    except Exception as err:
        mydb.close()
        raise Exception(str(err))
