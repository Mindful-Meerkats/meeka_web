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

let options = {
    adapter: require('k7-sequelize'),
    connectionString: 'postgres://meeka_web:@localhost:5432/meeka_quests'
};

server.register({
    require('k7'),
    options:options
}, (err)=>{
    server.route({
        method:'GET',
        path:'/rquest',
        handler: 
    })

});*/


server.start((err)=>{
	if(err){
		throw err;
	}
	console.log(`Server running at: ${server.info.uri}`);
});