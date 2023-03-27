import os
import mysql.connector
from dotenv import load_dotenv
load_dotenv(verbose=True)

def GetDB():
    return mysql.connector.connect(
        host='database',
        user='silversoul',
        passwd='cE24CxqQG6g',
        port=3306,
        database='blind-sql',
        auth_plugin='mysql_native_password'
    )

def xuat(x):
    print(x, flush=True)

def Initialize_Database():
    mydb = GetDB()
    mycursor = mydb.cursor()
    mycursor.execute("CREATE TABLE account (id int auto_increment PRIMARY KEY, username VARCHAR(20) NOT NULL UNIQUE, password VARCHAR(50))")
    mycursor.execute("INSERT INTO account VALUE (1, 'admin', 'HCMUS-CTF{Sh0uld_I_Us3_NoSQL_N3xt_T1m3_0x3f3f3f}')")
    mydb.commit()
    mycursor.close()
    mydb.close()

def Check_Login(username):
    username = username.strip()
    mydb = GetDB()
    mycursor = mydb.cursor()

    try:
        mycursor.execute("SELECT * FROM account WHERE username = \'" + username + "\'")
        myresult = mycursor.fetchall()
        mycursor.close()
        mydb.close()
        if len(myresult) == 1:
            return True
        return False
    except Exception as err:
        mydb.close()
        raise Exception(str(err))
