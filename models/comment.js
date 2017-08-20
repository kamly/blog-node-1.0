'use strict'

const db = require('../config/db.js'); 
const BlogDb = db.Blog; // 引入数据库

const commentModel = '../schema/blog_comment';
const articleModel = '../schema/blog_article';

const comment = BlogDb.import(commentModel);
const article = BlogDb.import(articleModel);

comment.belongsTo(article, {foreignKey: 'articleId'});
// comment.belongsToMany(comment, {as: 'comment1', through: comment, foreignKey: 'commentId' });

const getCommentById = function(id,callback){ 
	comment.findOne({
		where:{
			commentId: id,
			state: '1',
		},
		attributes:[
			'articleId',
			'replyCommentId',
			'name',
			'contact',
			'content',
			'createTime',
		],
		include:[
			{
				model:article,
				attributes:[
					'title'
				]
			}
		],
	}).then(function(result){
		callback(result);
	}).catch(function(err){
		console.log("发生错误：" + err);
	});
}

const getCommentByArticleId = function(articleId,callback){ 
	comment.findAll({
		where:{
			articleId: articleId,
			state: '1',
		},
		attributes:[
			'articleId',
			'replyCommentId',
			'name',
			'contact',
			'content',
			'createTime',
		],
		include:[
			{
				model:article,
				attributes:[
					'title'
				]
			}
		],
	}).then(function(result){
		callback(result);
	}).catch(function(err){
		console.log("发生错误：" + err);
	});
}

const getLatestComment = function(num,callback){
	comment.findAll({
		where:{
			state: '1',
		},
		attributes:[
			'articleId',
			'replyCommentId',
			'name',
			'contact',
			'content',
			'createTime',
		],
		include:[
			{
				model:article,
				attributes:[
					'title',
					'cover',
					'pv',
					'createTime',
				]
			}
		],
		limit: parseInt(num),
	}).then(function(result){
		callback(result);
	}).catch(function(err){
		console.log("发生错误：" + err);
	});
}

const postComment = function(articleId,replyCommentId,name,contact,content,callback){
	comment.create({
		articleId:articleId,
		replyCommentId:replyCommentId,
		name:name,
		contact:contact,
		content:content,
	}).then(function(result){
		callback(result);
	}).catch(function(err){
		console.log("发生错误：" + err);
	});
}

module.exports = {
  getCommentById,
  getLatestComment,
  postComment,
  getCommentByArticleId,
}




