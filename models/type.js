'use strict'

const db = require('../config/db.js'); 
const typeModel = '../schema/blog_type'; 
const BlogDb = db.Blog; // 引入数据库

const Type = BlogDb.import(typeModel);

const getTypeById = function(id,callback){ 
	Type.findOne({
		where:{
			typeId: id,
			state: '1',
		},
		attributes:[
			'typeId',
			'name',
		],
	}).then(function(result){
		callback(result);
	}).catch(function(err){
		console.log("发生错误：" + err);
	});
}

const getAllType = function(callback){
	Type.findAll({
		attributes:[
			'typeId',
			'name'
		]		
	}).then(function(result){
		callback(result);	
	}).catch(function(err){
		console.log('发生错误：' + err);	
	})
}


module.exports = {
  getTypeById,
  getAllType
}




