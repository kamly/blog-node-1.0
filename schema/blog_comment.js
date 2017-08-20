/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('blog_comment', {
    commentId: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    articleId: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
      references: {
        model: 'blog_article',
        key: 'articleId'
      }
    },
    replyCommentId: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
      defaultValue: '0',
      references: {
        model: 'blog_comment',
        key: 'commentId'
      }
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    state: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: '1'
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'blog_comment'
  });
};
