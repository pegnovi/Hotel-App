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
	duration_minutes decimal,
	price money,
	/*picture blob?*/
	picture_key character varying,
	service_type character varying,
	service_data json,
	PRIMARY KEY (id)
);

INSERT INTO services (id, name, description, duration_minutes, price, picture_key) 
VALUES ('mr1', 'massage', 'a very rough massage', 60, 200, 'massage');

INSERT INTO services (id, name, description, duration_minutes, price, picture_key) 
VALUES ('bnb1', 'breakfast in bed', 'choose food from menu', 0, 100, 'breakfastInBed');


DROP TABLE IF EXISTS serviceInstances;

CREATE TABLE serviceInstances(
	id uuid DEFAULT uuid_generate_v4 (),
	cart_id character varying,
	service_id character varying,
	scheduled_date_time timestamp without time zone,
	purchased boolean,
	PRIMARY KEY (id)
);


/* TODO?:
	Probably don't need this.
	Can just assign cart_id to each user.
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