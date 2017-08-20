'use strict'

const db = require('../config/db.js'); 
const tagModel = '../schema/blog_tag'; // 引入tag的表结构
const BlogDb = db.Blog; // 引入数据库

const Tag = BlogDb.import(tagModel);

const getTagById = function(id,callback){ 
	Tag.findOne({
		where:{
			tagId: id,
			state: '1',
		},
		attributes:[
			'tagId',
			'name',
		],
	}).then(function(result){
		callback(result);
	}).catch(function(err){
		console.log("发生错误：" + err);
	});
}

const getAllTag = function(callback){
	Tag.findAll({
		attributes:[
			'tagId',
			'name'
		]		
	}).then(function(result){
		callback(result);	
	}).catch(function(err){
		console.log('发生错误：' + err);	
	})
}

module.exports = {
  getTagById,  // 导出getTagById的方法，将会在controller里调用
  getAllTag
}




