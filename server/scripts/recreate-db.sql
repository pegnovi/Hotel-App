CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


/*
	Service Type Info
	1. Requires worker
	2. Requires equipment
	3. Requires worker to stay with client until service ends
	serviceTypes:
	- 
*/

DROP TABLE IF EXISTS services;

CREATE TABLE services(
	id character varying,
	name character varying,
	description character varying,
	durationMinutes decimal,
	price money,
	/*picture blob?*/
	pictureKey character varying,
	serviceType character varying,
	serviceData json,
	PRIMARY KEY (id)
);

INSERT INTO services (id, name, description, durationMinutes, price, pictureKey) 
VALUES ('mr1', 'massage', 'a very rough massage', 60, 200, 'massage');

INSERT INTO services (id, name, description, durationMinutes, price, pictureKey) 
VALUES ('bnb1', 'breakfast in bed', 'choose food from menu', 0, 100, 'breakfastInBed');


DROP TABLE IF EXISTS serviceInstances;

CREATE TABLE serviceInstances(
	id uuid DEFAULT uuid_generate_v4 (),
	cartId character varying,
	serviceId character varying,
	scheduledDateTime timestamp without time zone,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS orders;

CREATE TABLE orders(
	id uuid DEFAULT uuid_generate_v4 (),
	serviceInstanceId character varying,
	userId character varying,
	PRIMARY KEY (id)
);

/* TODO?:
	Probably don't need this.
	Can just assign cartId to each user.
	Finding a user's serviceInstances would then just be
		a join between user table and serviceInstances table.
*/

/*
DROP TABLE IF EXISTS carts;

CREATE TABLE carts(
	id character varying,
	cart character varying[],
	PRIMARY KEY (id)
);

INSERT INTO carts (id) VALUES ('1a');
*/