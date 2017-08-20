'use strict'

const type = require('../models/type.js');

const getTypeById = function (req, res){
   //console.log(req.params.id);
   type.getTypeById(req.params.id,function(result){
	    //console.log(result);
		res.send(result);	  
   }); 
}

const getAllType = function (req, res){
	type.getAllType(function(result){
		res.send(result);		
	})
}


module.exports = {
  getTypeById,
  getAllType,
}
