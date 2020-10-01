#!/bin bash

export PGPASSWORD = "postgres123"

echo "Configuring dragonstackdb"
dropdb -U postgres dragonstackdb
createdb -U postgres dragonstackdb

psql -U postgres dragonstackdb < ./bin/sql/generation.sql
psql -U postgres dragonstackdb < ./bin/sql/dragon.sql
psql -U postgres dragonstackdb < ./bin/sql/trait.sql
psql -U postgres dragonstackdb < ./bin/sql/personatrait.sql
psql -U postgres dragonstackdb < ./bin/sql/account.sql
psql -U postgres dragonstackdb < ./bin/sql/accountPersona.sql
echo " dragonstackdb configured"