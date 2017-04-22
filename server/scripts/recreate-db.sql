CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS services;

CREATE TABLE services(
	id character varying,
	name character varying,
	description character varying,
	durationMinutes decimal,
	price money,
	/*picture blob?*/
	PRIMARY KEY (id)
);

INSERT INTO services (id, name, description, durationMinutes, price) 
	VALUES  ('mr1', 'massage', 'a very rough massage', 60, 200);

INSERT INTO services (id, name, description, durationMinutes, price) 
	VALUES  ('bnb1', 'breakfast in bed', 'choose food from menu', 0, 100);


DROP TABLE IF EXISTS serviceInstances;

CREATE TABLE serviceInstances(
	id uuid DEFAULT uuid_generate_v4 (),
	cartId character varying,
	serviceId character varying,
	scheduledDateTime timestamp without time zone,
	PRIMARY KEY (id)
);


/* TODO?:
	Probably don't need this.
	Can just assign cartId to each user.
	Finding a user's serviceInstances would then just be
		a join between user table and serviceInstances table.
*/
DROP TABLE IF EXISTS carts;

CREATE TABLE carts(
	id character varying,
	cart character varying[], /* Array of service instances */
	PRIMARY KEY (id)
);

INSERT INTO carts (id) VALUES ('1a');