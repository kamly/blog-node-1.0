var express = require('express');
var router = express.Router();

const classify = require('../controllers/classify.js');
const direction = require('../controllers/direction.js');
const type = require('../controllers/type.js');
const tag = require('../controllers/tag.js');
const article = require('../controllers/article');
const comment = require('../controllers/comment');

module.exports = function(app){
	
	//设置跨域访问
/*	app.all('*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		res.header("X-Powered-By",' 3.2.1')
		res.header("Content-Type", "application/json;charset=utf-8");
		next();
	});
*/
	// 标签
	app.get('/tag/:id',tag.getTagById); 
	app.get('/tags',tag.getAllTag); // ok
	//类型
	app.get('/type/:id',type.getTypeById);
	app.get('/types',type.getAllType) // ok
	//方向
	app.get('/direction/:id',direction.getDirectionById);
	app.get('/directions',direction.getAllDirection); // ok
	//分类
	app.get('/classify/:id',classify.getClassifyById);
	app.get('/classifys',classify.getAllClassify); // ok
	//文章
	app.get('/article/:id',article.getArticleById); // ok
	app.get('/article/last/:num',article.getLatestArticle); // ok
	app.get('/article/hpv/:num',article.getHPvArticle); // ok
	app.get('/article/like/:world',article.getLikeArticle);
	app.get('/article/page/:page/num/:num',article.getPageArticle); // ok
	//评论
	app.get('/comment/:id',comment.getCommentById);
	app.get('/comment/last/:num',comment.getLatestComment);  // ok
	app.post('/comment/new',comment.postComment); // ok
	app.get('/comment/articleid/:articleid',comment.getCommentByArticleId) // ok
	
}


