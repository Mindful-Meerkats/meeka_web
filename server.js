'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Hoek = require('hoek');


const server = new Hapi.Server();
server.connection({port:3000, host:'localhost'});



server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('./public/index.html');
        }
    });

    server.route({
    	method: 'GET',
    	path: '/{file*}',
    	handler: {
    		directory: {
    			path: 'public',
    			listing: true
    		}
    	}
    });
});

/*// database shizzle for quest fetching
const Controller = require('./src/controller/questcontroller');
let options = {
    adapter: require('k7-sequelize'),
    connectionString: 'postgres://meeka_web:@localhost:5432/meeka_quests',
    model: 'src/models/quest.js'
};

server.register({
    register: require('k7'),
    options:options
}, (server,err)=>{
    const cont = new Controller(server.database);
    server.route([{
        method:'GET',
        path:'/rquest',
        handler: cont.random
    },
    {
        method: 'GET',
        path: '/find/{id}',
        handler: cont.find
    },
    {
        method: 'GET',
        path: '/list5',
        handler: cont.list5
    }]);

});*/


server.start((err)=>{
	if(err){
		throw err;
	}
	console.log(`Server running at: ${server.info.uri}`);
});