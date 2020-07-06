#!/bin/sh -l
set -e

cd ./backend

docker network create fixxx-looplijsten-backend_looplijsten_backend

docker-compose up --build --detach

docker-compose run --rm openzaak.local python src/manage.py migrate
docker-compose run --rm openzaak.local python src/manage.py createsuperuser --username ci --email ci\@example.com --no-input

docker-compose exec -T db psql -U postgres -d postgres -c "INSERT INTO authorizations_applicatie (uuid, client_ids, label, heeft_alle_autorisaties)  VALUES ('3223d651-827c-47f2-aff1-da6f016e072b', '{client}', 'Dev client', 't')"
docker-compose exec -T db psql -U postgres -d postgres -c "INSERT INTO vng_api_common_jwtsecret (id, identifier, secret)  VALUES (1, 'client', 'secret_key')"
