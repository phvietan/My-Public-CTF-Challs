import os
import sys
import math
import socket
import random

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the port
server_address = ('localhost', 2336)
sock.bind(server_address)

def solve(n):
    n = 2*n
    k = int(math.sqrt(n))
    cnt = 0
    founded = []
    for i in range(1, k+2):
        if n % i != 0: continue
        down = i
        up = n // down
        r2 = (up + down) - 1
        if r2 % 2 != 0: continue
        r = r2 // 2
        l = r - down
        if n != r*(r+1) - l*(l-1): continue
        if r in founded: continue
        founded.append(r)
        cnt += 1
    return cnt

# Listen for incoming connections
sock.settimeout(3)
sock.listen(1)

print("WTF")

while True:
    # Wait for a connection
    connection, addr = sock.accept()

    connection.sendall(b'Let us play a game, if you win then I will give you a flag\nI will play with you for 9 rounds, each round I will give you a number N, you must count how many interval [L, R] such that: L + L+1 + L+2 + L+3 + ... + R = N and N > L, R > 0\n For example N = 6, you must give me 2 because 6 = 6 and 6 = 1+2+3\nN <= 10^9\n\n\n')

    curL = 1
    curR = 1000000000
    lose = False
    for i in range(10):
        n = random.randint(curL, curR)
        query = 'N = %s\n' % str(n)
        connection.sendall(bytes(query, 'ascii'))
        data = connection.recv(20)
        try:
            data = int(data)
        except:
            connection.sendall(b'You lose, you did not give me an int')
            lose = True
            break
        if data != solve(n):
            connection.sendall(b'Wrong')
            lose = True
            break
    if not lose:
        connection.sendall(b'Congratz\nHCMUS-CTF{Alg00r1thm_W1th_CTF_1zz_S000_Fun}')
    connection.close()
