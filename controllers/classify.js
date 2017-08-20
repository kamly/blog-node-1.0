'use strict'

const classify = require('../models/classify.js');

const getClassifyById = function (req, res){
   //console.log(req.params.id);
   classify.getClassifyById(req.params.id,function(result){
	    //console.log(result);
		res.send(result);	  
   }); 
}

const getAllClassify = function (req, res){
	classify.getAllClassify(function(result){
		res.send(result);		
	})
}


module.exports = {
  getClassifyById,
  getAllClassify,
}
