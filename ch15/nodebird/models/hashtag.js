/**
 * 해쉬태그 테이블
 * @type {function(*, *): (Model|*|void)}
 */
module.exports = (sequelize, DataTypes) => (
  sequelize.define('hashtag', {
    title: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true //해쉬태그는 고유해야 하므로 unique 설정 true
    }
  }, {
    timestamps: true,
    paranoid: true
  })
);