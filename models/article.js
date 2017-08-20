'use strict'

var Promise = require("bluebird")

const db = require('../config/db.js');
const BlogDb = db.Blog; // 引入数据库

const articleModel = '../schema/blog_article'; 
const typeModel = '../schema/blog_type';
const directionModel = '../schema/blog_direction';
const classifyModel = '../schema/blog_classify';
const tagModel = '../schema/blog_tag';

const article = BlogDb.import(articleModel);
const type = BlogDb.import(typeModel);
const direction = BlogDb.import(directionModel);
const classify = BlogDb.import(classifyModel);
const tag = BlogDb.import(tagModel);

article.belongsTo(type, { foreignKey: 'typeId'});
article.belongsTo(direction, { foreignKey: 'directionId'});
article.belongsTo(classify, { foreignKey: 'classifyId'});

// 通过文章序号获取相关内容
const getArticleById = function(id,callback){ 
	var dataResult = [];
	article.findOne({
		where:{
			articleId: id,
			state: '1',
		},
		attributes:[
			'articleId',
			'title',
			'cover',
			'content',
			'tagIds',
			'pv',
			'createTime',
		],
		include:[
			{
				model:type,
				attributes:[
					'name'
				]
			},
			{
				model:direction,
				attributes:[
					'name'
				]
			},
			{
				model:classify,
				attributes:[
					'name'
				]
			},
		],
	}).then(function(articleResult){
		//console.log(typeof(articleResult.dataValues.tagIds));
		//console.log(typeof(JSON.parse(articleResult.dataValues.tagIds)));
		dataResult = articleResult.dataValues;
		var data = JSON.parse(articleResult.dataValues.tagIds); // 获取tagIds的数据
		return getTags(data);
	}).then(function(tagResult){
		//console.log(res)
		dataResult.tagResult = tagResult;
		//console.log(dataResult);
		callback(dataResult);
	}).catch(function(err){
		console.log("发生错误：" + err);
	});
}

// 获取最新的N篇文章
const getLatestArticle = function(num, callback){ 
	var dataResult = [];
	article.findAll({
		where:{
			state: '1',
		},
		attributes:[
			'articleId',
			'title',
			'cover',
			'des',
			'content',
			'tagIds',
			'pv',
			'createTime',
		],
		include:[
			{
				model:type,
				attributes:[
					'name'
				]
			},
			{
				model:direction,
				attributes:[
					'name'
				]
			},
			{
				model:classify,
				attributes:[
					'name'
				]
			},
		],
		limit: parseInt(num),
		order: [
			['createTime', 'DESC']
		]
	}).then(function(articleResult){
		//console.log(articleResult);
		for(var i=0; i<articleResult.length; i++){
			articleResult[i]['dataValues']['tagIds'] = JSON.parse(articleResult[i]['dataValues']['tagIds']);
		}
		callback(articleResult);
	}).catch(function(err){
		console.log("发生错误：" + err);
	});
}

// 获取最高PV
const getHPvArticle = function(num, callback){ 
	var dataResult = [];
	article.findAll({
		where:{
			state: '1',
		},
		attributes:[
			'articleId',
			'title',
			'cover',
			'pv',
			'createTime',
		],
		limit: parseInt(num),
		order: [
			['pv', 'DESC']
		]
	}).then(function(articleResult){
		callback(articleResult);
	}).catch(function(err){
		console.log("发生错误：" + err);
	});
}



// 搜索
const getLikeArticle = function(world, callback){ 
	var dataResult = [];
	article.findAll({
		where:{
			$or:[
				{ title: { $like : '%' + world +'%' } },
				{ content: { $like : '%' + world +'%' } }
			],
			state: '1',
		},
		attributes:[
			'articleId',
			'title',
			'cover',
			'content',
			'tagIds',
			'pv',
			'createTime',
		],
		include:[
			{
				model:type,
				attributes:[
					'name'
				]
			},
			{
				model:direction,
				attributes:[
					'name'
				]
			},
			{
				model:classify,
				attributes:[
					'name'
				]
			},
		],
		order: [
			['createTime', 'DESC']
		]
	}).then(function(articleResult){
		//console.log(articleResult);
		for(var i=0; i<articleResult.length; i++){
			articleResult[i]['dataValues']['tagIds'] = JSON.parse(articleResult[i]['dataValues']['tagIds']);
		}
		callback(articleResult);
	}).catch(function(err){
		console.log("发生错误：" + err);
	});
}


// 无限加载
const getPageArticle = function(page, num, callback){ 
	var dataResult = [];
	//console.log('page:'+page);
	//console.log('num'+num);
	var start = parseInt(page) * parseInt(num);
	article.findAll({
		where:{
			state: '1',
		},
		attributes:[
			'articleId',
			'title',
			'cover',
			'des',
			'content',
			'tagIds',
			'pv',
			'createTime',
		],
		include:[
			{
				model:type,
				attributes:[
					'name'
				]
			},
			{
				model:direction,
				attributes:[
					'name'
				]
			},
			{
				model:classify,
				attributes:[
					'name'
				]
			},
		],
		order: [
			['createTime', 'DESC']
		],
		limit: parseInt(num),
		offset: start,
	}).then(function(articleResult){
		//console.log(articleResult);
		for(var i=0; i<articleResult.length; i++){
			articleResult[i]['dataValues']['tagIds'] = JSON.parse(articleResult[i]['dataValues']['tagIds']);
		}
		callback(articleResult);
	}).catch(function(err){
		console.log("发生错误：" + err);
	});
}



// 获取标签集
const getTags = function(list){
	return new Promise((resolve,reject)=>{
		var temp = list.map(function(value,index){
			return getTagById(value);
		})
		Promise
		.all(temp)
		.then(data=>{
			//console.log(data);
			resolve(data)
		})
	})
}

// 通过标签序号获取相关内容
const getTagById = function(data){
	return new Promise((resolve,reject)=>{
		tag.findOne({
			where:{
				tagId:data,
				state:'1'
			}		
		}).then(function(tagResult){
			//console.log(tagResult.dataValues.name);
			resolve(tagResult.dataValues.name);	
		})
	})
}


module.exports = {
	getArticleById, // 通过文章序号获取相关内容
	getLatestArticle, // 获取最新的N篇文章
	getLikeArticle,
	getPageArticle,
	getHPvArticle,
}




