FROM python:3.11.11-alpine3.20 AS image


FROM image AS builder


WORKDIR /code

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1


COPY ./requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt



FROM image AS runner

WORKDIR /app

COPY --from=builder /root/.local /root/.local
COPY ./app /app
COPY ./alembic.ini /app
COPY ./alembic /app/alembic
COPY ./.env .
EXPOSE 8000
ENV PATH=/root/.local/bin:$PATH



#CMD ["/bin/sh", "-c", "alembic upgrade head && uvicorn main:app --host 0.0.0.0 --port 80"]

