const camelcaseKeys = require('camelcase-keys');
const _ = require('lodash');

// Guard Against SQL injection later (try postgres prepared statements)
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

	//https://stackoverflow.com/questions/37300997/multi-row-insert-with-pg-promise
	app.put('/api/orders', (req, res) => {
		var serviceInstances = req.body;

		var cs = new pgp.helpers.ColumnSet([
			{
				name: 'id',
				//cast: 'text',
				cnd: true
			},
			//'?id',
			'purchased'
		]);

		//var cs = new pgp.helpers.ColumnSet();
		var values = req.body.map((serviceInstance) => {
			return {
				id: serviceInstance.id,
				purchased: true
			};
		})

		var query = pgp.helpers.update(values, cs, 'serviceinstances') + ' WHERE v.id = t.id::text';
		console.log(query);
		db.none(query).
		then(() => {
			res.send({test: 'order submitted'});
		})
		.catch(function(err) {
			throw err;
		});
	});

	// Get all available services
	app.get('/api/services', (req, res) => {
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
	});

	// Get all unpurchased service instances
	app.get('/api/serviceInstances', (req, res) => {
		db.any('SELECT * from serviceInstances where purchased = false')
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
	});

	// Post new service instance
	app.post('/api/serviceInstances', (req, res) => {

		console.log(req.body);

		// TODO: check if valid serviceId and cartId
		db.one('INSERT INTO serviceInstances (service_id, cart_id, scheduled_date_time, purchased) VALUES (${serviceId}, ${cartId}, ${scheduledDateTime}, false) RETURNING id',
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

		db.none('DELETE FROM serviceInstances WHERE id = ${instanceId}',
			{
				instanceId: req.body.instanceId
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
