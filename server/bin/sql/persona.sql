CREATE TABLE persona
(
  id SERIAL PRIMARY KEY,
  birthdate TIMESTAMP NOT NULL,
  nickname VARCHAR(64),
  "generationId" INTEGER,
  FOREIGN KEY ("generationId") REFERENCES generation(id)
);


select *
from persona INNER JOIN "personaTrait" ON persona.id = "personaTrait"."personaId";