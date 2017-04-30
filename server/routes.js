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

	app.post('/api/serviceInstance', (req, res) => {

		// TODO: check if valid serviceId and cartId
		db.none('INSERT INTO serviceInstances (serviceId, cartId) VALUES (${serviceId}, ${cartId})',
				{
					serviceId: req.body.serviceId,
					cartId: req.body.cartId
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