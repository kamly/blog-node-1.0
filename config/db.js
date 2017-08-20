'use strict'

var Sequelize = require('sequelize');

var config = {
    sequelize:{
        username: 'root',
        password: 'ken13533442002li',
        database: 'blog',
        host: "120.25.221.195",
        dialect: 'mysql',
        define: {
            underscored: false,  // 使用驼峰式命令规则
			timestamps: false, // 不要添加时间戳属性 (updatedAt, createdAt)
            paranoid: true, // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
			freezeTableName: true, // 禁止修改表名
        }
    }
};


var Blog = new Sequelize(config.sequelize.database,config.sequelize.username,config.sequelize.password,config.sequelize)




module.exports = {Blog};

