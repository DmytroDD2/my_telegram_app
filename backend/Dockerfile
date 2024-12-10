# FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11
#
# ENV PYTHONUNBUFFERED=1
#
# WORKDIR /app
#
# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt
#
# COPY requirements.txt . /code/
#
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
#
# COPY . .

FROM python:3.11
WORKDIR /app
COPY ./app ./app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
CMD ["uvicorn", "upgrade", "head", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
COPY . .