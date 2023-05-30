FROM python:3.8.4

ENV PYTHONUNBUFFERED 1

EXPOSE 4422
WORKDIR /src

COPY pyproject.toml ./
RUN apt-get -y install --no-install-recommends make=* && \
    pip install poetry==1.3.0 && \
    poetry config virtualenvs.create false && \
    poetry install

COPY ./waterdip/ ./waterdip

CMD ["python", "-m", "waterdip"]