FROM python:alpine

WORKDIR /baby-sql/
COPY src /baby-sql/

RUN export FLASK_ENV=development

RUN pip3 install python-dotenv flask mysql-connector-python

EXPOSE 1339

CMD python3 index.py
