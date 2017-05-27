const camelcaseKeys = require('camelcase-keys');
const _ = require('lodash');

const pgp = require('pg-promise')();

const db = pgp({
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	host: process.env.PG_HOST,
	poolSize: 10, // max number of clients in pool
	idleTimeoutMillis: 1000,
	port: process.env.PG_PORT
});

const hasDB = true;

module.exports = function(app) {

	// Get all available services
	app.get('/api/services', (req, res) => {

		if(hasDB) {
			db.any('SELECT * from services')
			.then((services) => {
				res.send(
					_.map(services, (service) => {
						return camelcaseKeys(service);
					})
				);
			})
			.catch(function(err) {
				throw err;
			});
		}
		else {
			// Temporary (while no DB available)
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({
				"data": [
					{
						"instanceId": "abcd",
						"serviceId": "mr1",
						"pictureKey": "massage",
						"name": "Massage",
						"description": "A very rough massage",
						"price": 26
					},
					{
						"instanceId": "efgh",
						"serviceId": "bib1",
						"pictureKey": "breakfastInBed",
						"name": "Breakfast in Bed",
						"description": "You can choose from a menu",
						"price": 41
					}
				]
			}));
		}

	});

	// Get all service instances
	app.get('/api/serviceInstances', (req, res) => {
		if(hasDB) {
			db.any('SELECT * from serviceInstances')
			.then((serviceInstances) => {
				res.send(
					_.map(serviceInstances, (serviceInstance) => {
						return camelcaseKeys(serviceInstance);
					})
				);
			})
			.catch(function(err) {
				throw err;
			});
		}
		else {
			// Temporary (while no DB available)
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({
				"data": [
					{
						"instanceId": "abcd",
						"serviceId": "mr1",
						"pictureKey": "massage",
						"name": "Massage",
						"description": "A very rough massage",
						"price": 26
					},
					{
						"instanceId": "efgh",
						"serviceId": "bib1",
						"pictureKey": "breakfastInBed",
						"name": "Breakfast in Bed",
						"description": "You can choose from a menu",
						"price": 41
					}
				]
			}));
		}
	});

	// Post new service instance
	app.post('/api/serviceInstances', (req, res) => {

		console.log(req.body);

		// TODO: check if valid serviceId and cartId
		db.one('INSERT INTO serviceInstances (service_id, cart_id, scheduled_date_time) VALUES (${serviceId}, ${cartId}, ${scheduledDateTime}) RETURNING id',
				{
					serviceId: req.body.serviceId,
					cartId: req.body.cartId,
					scheduledDateTime: req.body.scheduledDateTime
				}
		)
		.then((data) => {
			res.send(camelcaseKeys(data));
		})
		.catch(function(err) {
			throw err;
		});
	});

	app.delete('/api/serviceInstances', (req, res) => {

		console.log(JSON.stringify(req.body, null, 2));

		db.none('DELETE FROM serviceInstances WHERE id = ${serviceInstanceId}',
			{
				serviceInstanceId: req.body.serviceInstanceId
			}
		)
		.then(() => {
			res.send('Deleted serviceInstance');
		})
		.catch(function(err) {
			throw err;
		});

	});



	app.post('/api/services', (req, res) => {

		console.log(req.query);

		querystring = `INSERT INTO services (id, name, description, price)
			VALUES (
				'${req.body.id}',
				'${req.body.name}',
				'${req.body.description}',
				'${parseFloat(req.body.price)}'
			)
		`;

		db.none(querystring)
		.then(function() {
			res.send('created todo');
		})
		.catch(function(err) {
			throw err;
		});

	});

};
