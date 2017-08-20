'use strict'

const db = require('../config/db.js'); 
const directionModel = '../schema/blog_direction'; 
const BlogDb = db.Blog; // 引入数据库

const Direction = BlogDb.import(directionModel);

const getDirectionById = function(id,callback){ 
	Direction.findOne({
		where:{
			directionId: id,
			state: '1',
		},
		attributes:[
			'directionId',
			'name',
		],
	}).then(function(result){
		callback(result);
	}).catch(function(err){
		console.log("发生错误：" + err);
	});
}

const getAllDirection = function(callback){
	Direction.findAll({
		attributes:[
			'directionId',
			'name'
		]		
	}).then(function(result){
		callback(result);	
	}).catch(function(err){
		console.log('发生错误：' + err);	
	})
}


module.exports = {
  getDirectionById,
  getAllDirection,
}




