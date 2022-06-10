FROM python:alpine

WORKDIR /blind-sql/
COPY src /blind-sql/

RUN export FLASK_ENV=production

RUN pip3 install python-dotenv flask mysql-connector-python

EXPOSE ${PORT_BLIND_SQL}

CMD python3 index.py
