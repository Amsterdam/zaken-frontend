#!/bin/sh -l
set -e

cd ./backend

docker network create fixxx-looplijsten-backend_looplijsten_backend

echo "----"
echo "docker-compose build"
echo "----"
docker-compose build

echo "----"
echo "docker-compose run --rm openzaak.test python src/manage.py migrate"
echo "----"
docker-compose run --rm openzaak.test python src/manage.py migrate

echo "----"
echo "docker-compose run --rm openzaak.test python src/manage.py createsuperuser --username ci --email ci\@example.com --no-input"
echo "----"
docker-compose run --rm openzaak.test python src/manage.py createsuperuser --username ci --email ci\@example.com --no-input

echo "----"
echo "docker-compose exec -T db psql -U postgres -d postgres -c \"INSERT INTO authorizations_applicatie (uuid, client_ids, label, heeft_alle_autorisaties)  VALUES ('3223d651-827c-47f2-aff1-da6f016e072b', '{client}', 'Dev client', 't')\""
echo "----"
docker-compose exec -T db psql -U postgres -d postgres -c "INSERT INTO authorizations_applicatie (uuid, client_ids, label, heeft_alle_autorisaties)  VALUES ('3223d651-827c-47f2-aff1-da6f016e072b', '{client}', 'Dev client', 't')"

echo "----"
echo "docker-compose exec -T db psql -U postgres -d postgres -c \"INSERT INTO vng_api_common_jwtsecret (id, identifier, secret)  VALUES (1, 'client', 'secret_key')\""
echo "----"
docker-compose exec -T db psql -U postgres -d postgres -c "INSERT INTO vng_api_common_jwtsecret (id, identifier, secret)  VALUES (1, 'client', 'secret_key')"

echo "----"
echo "docker-compose exec -T db psql -U postgres -d postgres -c \"INSERT INTO notifications_notificationsconfig (id, api_root) VALUES (1, 'https://notificaties-api.vng.cloud/api/v1/')\""
echo "----"
docker-compose exec -T db psql -U postgres -d postgres -c "INSERT INTO notifications_notificationsconfig (id, api_root) VALUES (1, 'https://notificaties-api.vng.cloud/api/v1/')"


echo "----"
echo "docker-compose up --detach"
echo "----"
docker-compose up --detach
