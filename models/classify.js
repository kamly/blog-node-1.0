'use strict'

const db = require('../config/db.js'); 
const classifyModel = '../schema/blog_classify'; 
const BlogDb = db.Blog; // 引入数据库

const Classify = BlogDb.import(classifyModel);

const getClassifyById = function(id,callback){ 
	Classify.findOne({
		where:{
			classifyId: id,
			state: '1',
		},
		attributes:[
			'classifyId',
			'name',
		],
	}).then(function(result){
		callback(result);
	}).catch(function(err){
		console.log("发生错误：" + err);
	});
}

const getAllClassify = function(callback){
	Classify.findAll({
		attributes:[
			'classifyId',
			'name'
		]		
	}).then(function(result){
		callback(result);	
	}).catch(function(err){
		console.log('发生错误：' + err);	
	})
}


module.exports = {
  getClassifyById,
  getAllClassify,
}




