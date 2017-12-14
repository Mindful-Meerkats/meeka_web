'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Hoek = require('hoek');


const server = new Hapi.Server();
server.connection({port:'/tmp/hapi'});



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


server.start((err)=>{
	if(err){
		throw err;
	}
	console.log(`Server running at: ${server.info.uri}`);
});