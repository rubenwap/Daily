FROM python:3

RUN mkdir -p /usr/src/daily
WORKDIR /usr/src/daily

COPY requirements.txt ./
CMD source daily/bin/activate
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "./run.py" ]
