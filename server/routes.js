const pg = require('pg');

console.log(process.env);

const pool = new pg.Pool({
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	host: process.env.PG_HOST,
	max: 10, // max number of clients in pool
	idleTimeoutMillis: 1000,
	port: process.env.PG_PORT
});

module.exports = function(app) {

	app.post('/api/services', (req, res) => {
		pool.connect((err, client, release) => {
			if(err) {
				throw err;
			}

			console.log(req.query);

			querystring = `INSERT INTO services (id, name, description, price)
				VALUES (
					'${req.query.id}',
					'${req.query.name}',
					'${req.query.description}',
					'${parseFloat(req.query.price)}'
				)
			`;

			client.query(querystring, (err, result) => {
				if(err) {
					throw err;
				}

				// was successful
				release();
				if(result && result.rows) {
					res.send('created todo');
				}
			});
		});
	});

};