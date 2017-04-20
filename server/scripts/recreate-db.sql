DROP TABLE IF EXISTS services;

CREATE TABLE services(
	id character varying,
	productId character varying,
	name character varying,
	description character varying,
	price money
);

DROP TABLE IF EXISTS cart;

CREATE TABLE cart(
	id character varying,
	cartContent json
);

/*INSERT INTO cart (id, cartContent) VALUES ('1a', '{}');*/