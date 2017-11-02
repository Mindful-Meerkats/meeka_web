'use strict';

module.exports = (sequelize,DataType) => {
	const Quest = sequelize.define('Quest',{
		id:{ type: DataType.INTEGER, allowNull:false},
		quest:{ type: DataType.TEXT, allowNull: true},
		title:{type: DataType.STRING, allowNull: true},
		description:{type: DataType.TEXT, allowNull:true},
		mind:{type: DataType.INTEGER, allowNull:true},
		body:{type: DataType.INTEGER, allowNull:true},
		soul:{type: DataType.INTEGER, allowNull:true},
		community:{type: DataType.INTEGER, allowNull:true},
		thriftiness:{type: DataType.INTEGER, allowNull:true},
		pawprint:{type: DataType.INTEGER, allowNull:true},
		happiness:{type: DataType.INTEGER, allowNull:true}
	})
}