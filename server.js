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

// database shizzle for quest fetching
const dbconn = 'postgres://meeka_web:@localhost:5432/meeka_quests';
const models = require('./models');



server.route([{
        method:'GET',
        path:'/rquest',
        handler: (request,reply) => {
    const count = 0,id = 0;
    models.Quest
    .count()
    .then((c)=>{
        count = c
    });

    id = Math.floor((Math.random()*count));

    models.Quest
    .findById(id)
    .then((quest)=>{
        reply({
            quest: quest
        });
    }).catch((err) => reply.badImplementation(err.message));

    }},
    {
        method: 'GET',
        path: '/find/{id}',
        handler: (request, reply) => {
    const id = request.params.id;

    models.Quest
    .findById(id)
    .then(quest=>{
        reply({
            quest: quest
        });
    });
},
    },
    {
        method: 'GET',
        path: '/list5',
        handler: (request,reply) => {
    const count = 0,ids = [];
    models.Quest
    .count()
    .then((c)=>{
        count = c
    });

    for (var i = 0; i < 5; i++) {
        id = Math.floor((Math.random()*count));
        ids.push(id);
    }
    

    models.Quest
    .findAll({
        where: {
            id: ids
        }
    })
    .then((quests)=>{
        reply({
            quests: quests
        });
    }).catch((err) => reply.badImplementation(err.message));
}
    }]);

models.sequelize.sync().then(()=> {
server.start((err)=>{
	if(err){
		throw err;
	}
	console.log(`Server running at: ${server.info.uri}`);
});
});