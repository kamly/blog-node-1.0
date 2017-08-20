/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('blog_article', {
    articleId: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cover: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tagIds: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    directionId: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
      references: {
        model: 'blog_direction',
        key: 'directionId'
      }
    },
    classifyId: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
      references: {
        model: 'blog_classify',
        key: 'classifyId'
      }
    },
    typeId: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
      references: {
        model: 'blog_type',
        key: 'typeId'
      }
    },
    pv: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
      defaultValue: '0'
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
    tableName: 'blog_article'
  });
};
