FROM python:3.6-alpine
ENV INSTALL_PATH /daily
RUN mkdir -p $INSTALL_PATH
RUN apk add --no-cache postgresql-dev build-base
WORKDIR $INSTALL_PATH

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

RUN apk del build-base

EXPOSE 5000
COPY . .

CMD [ "python", "./run.py" ]

