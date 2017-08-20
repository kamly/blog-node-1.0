'use strict'

const article = require('../models/article.js');
const comment = require('../models/comment.js');
var markdown = require('markdown').markdown;

const getArticleById = function (req, res){
   //console.log(req.params.id);
   article.getArticleById(req.params.id, function(result){
	    //console.log(result.content);
		result.content = markdown.toHTML(result.content);
		res.send(result);	  
   }); 
}

const getLatestArticle = function(req, res){
	article.getLatestArticle(req.params.num, function(result){
		res.send(result);	
	})
}

const getLikeArticle = function(req, res){
	article.getLikeArticle(req.params.world, function(result){
		res.send(result);		
	})
}

const getPageArticle = function(req, res){
	article.getPageArticle(req.params.page, req.params.num, function(result){
		res.send(result);		
	})
}

const getHPvArticle = function(req, res){
	article.getHPvArticle(req.params.num, function(result){
		res.send(result);	
	})
}

module.exports = {
  getArticleById,
  getLatestArticle,
  getLikeArticle,
  getPageArticle,
  getHPvArticle,
}
