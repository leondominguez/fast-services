

const config = {
	dbUser: 'admin' ,
	dbPassword: 'pg1234' ,
	dbHost: 'dbhost' , //cuando pase a docker se cambia a 'dbhost'
	dbName: 'mande' ,
	dbPort:  '5432',
	dev: process.env.NODE_ENV !== 'local',
	port: process.env.API_PORT || '3001',
	host: process.env.API_host || 'localhost',
	cors: '*',
};

export default config;