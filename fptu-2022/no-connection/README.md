# Hướng dẫn cách setup

CHALLENGE_DESCRIPTION.MD là description của bài

Để chạy challenge: bash run.sh

# Cách config challenge

Challenge đc chạy ở port 34257, nếu muốn sửa port hãy vào file docker-compose.yml sửa lại port
Flag của challenge nằm ở trong file msg_with_flag.txt, chỉ nên sửa đoạn Hackforces thôi chứ không nên

# Cách kiểm tra challenge = poc

python3 poc.py

PoC sẽ dump file msg_with_flag.txt = base64, trong PoC mình code bị bug 1 tí nên chịu khó khi thấy nó dump ra ...AAAAAAAA thì chép ra terminal:

echo "<response>" | base64 -d
