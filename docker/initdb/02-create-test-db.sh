#!/bin/bash
set -e

# Selalu connect ke DB 'postgres' (pasti ada), lalu bikin DB test.
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname postgres \
  -c "CREATE DATABASE \"$PGDATABASE_TEST\";"
