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

	app.put('/api/cart', (req, res) => {
	
		var queryString = 'UPDATE cart SET cartContent=${cartContent} WHERE id=${id}';

		db.none(queryString, {
			cartContent: {
				[req.body.productId]: 1
			},
			id: '1a'
		})
		.then(function() {
			res.send('cart updated');
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