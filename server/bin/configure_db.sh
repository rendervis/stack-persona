#!/bin/bash

export PGPASSWORD = "postgres123"

echo "Configuring dragonstackdb"
dropdb -U postgres dragonstackdb
createdb -U postgres dragonstackdb

psql -U postgres dragonstackdb < ./bin/sql/generation.sql
psql -U postgres dragonstackdb < ./bin/sql/dragon.sql
echo " dragonstackdb configured"