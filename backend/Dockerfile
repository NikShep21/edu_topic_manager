FROM python:3.12-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

EXPOSE 8000
WORKDIR /app/backend

RUN apt-get update -o Acquire::Retries=3 && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "EduTopicManager.wsgi:application", "--bind", "0.0.0.0:8000"]
