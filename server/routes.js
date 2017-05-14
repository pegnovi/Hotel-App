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

module.exports = function(app) {

	// Get all available services
	app.get('/api/services', (req, res) => {
		db.any('SELECT * from services')
		.then((services) => {
			res.send(services);
		})
		.catch(function(err) {
			throw err;
		});
	});

	// Get all service instances
	app.get('/api/serviceInstances', (req, res) => {
		db.any('SELECT * from serviceInstances')
		.then((serviceInstances) => {
			res.send(serviceInstances);
		})
		.catch(function(err) {
			throw err;
		});
	});

	app.post('/api/serviceInstances', (req, res) => {

		console.log(JSON.stringify(req.body, null, 2));

		// TODO: check if valid serviceId and cartId
		db.none('INSERT INTO serviceInstances (serviceId, cartId, scheduledDateTime) VALUES (${serviceId}, ${cartId}, ${scheduledDateTime})',
				{
					serviceId: req.body.serviceId,
					cartId: req.body.cartId,
					scheduledDateTime: req.body.scheduledDateTime
				}
		)
		.then(() => {
			res.send('Saved service instance');
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