'use strict'

const direction = require('../models/direction.js');

const getDirectionById = function (req, res){
   //console.log(req.params.id);
   direction.getDirectionById(req.params.id,function(result){
	    //console.log(result);
		res.send(result);	  
   }); 
}

const getAllDirection = function (req, res){
	direction.getAllDirection(function(result){
		res.send(result);		
	})
}


module.exports = {
  getDirectionById,
  getAllDirection,
}
