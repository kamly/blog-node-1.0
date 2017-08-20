'use strict'

const tag = require('../models/tag.js');

const getTagById = function (req, res){
   //console.log(req.params.id);
   tag.getTagById(req.params.id,function(result){
	    //console.log(result);
		res.send(result);	  
   }); 
}

const getAllTag = function (req, res){
	tag.getAllTag(function(result){
		res.send(result);		
	})
}

module.exports = {
  getTagById,
  getAllTag
}
