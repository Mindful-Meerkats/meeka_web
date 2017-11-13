'use strict';

function QuestController(db) {
	this.db = db,
	this.model = db.Quest
}

QuestController.prototype = {
	random,
	find,
	list5
}

module.exports = QuestController;

function random(request,reply) {
	const count = 0,id = 0;
	this.model
	.count()
	.then((c)=>{
		count = c
	});

	id = Math.floor((Math.random()*count));

	this.model
	.findById(id)
	.then((quest)=>{
		reply({
			quest: quest
		});
	}).catch((err) => reply.badImplementation(err.message));

}

function find(request, reply){
	const id = request.params.id;

	this.model
	.findById(id)
	.then((quest)=>{
		reply({
			quest: quest
		});
	});
}

function list5(request,reply){
	const count = 0,ids = [];
	this.model
	.count()
	.then((c)=>{
		count = c
	});

	for (var i = 0; i < 5; i++) {
		id = Math.floor((Math.random()*count));
		ids.push(id);
	}
	

	this.model
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