'use strict'

const comment = require('../models/comment.js');
var markdown = require('markdown').markdown;

const getCommentById = function (req, res){
   //console.log(req.params.id);
   comment.getCommentById(req.params.id,function(result){
	    //console.log(result);
		res.send(result);	  
   }); 
}

const getCommentByArticleId = function (req, res){
   //console.log(req.params.id);
   comment.getCommentByArticleId(req.params.articleid,function(result){
	    //console.log(result);
		var i;
		for(i=0;i<result.length;i++){
			result[i].content = markdown.toHTML(result[i].content);
		}
		res.send(result);	  
   }); 
}

const getLatestComment = function(req, res){
	comment.getLatestComment(req.params.num,function(result){
		res.send(result);		
	})
}

const postComment = function(req, res){
	//console.log(req.body)
	comment.postComment(req.body.articleId, req.body.replyCommentId, req.body.name, req.body.contact, req.body.content, function(result){
		res.send(result);		
	})
}

module.exports = {
  getCommentById,
  getLatestComment,
  postComment,
  getCommentByArticleId
}
