/**
 * 게시글 테이브
 * @type {function(*, *): (Model|*|void)}
 */
module.exports = (sequelize, DataTypes) => (
  sequelize.define('post', {
    content: { //게시글
      type: DataTypes.STRING(140),
      allowNull: false
    },
    img: { //이미지 주소
      type: DataTypes.STRING(200),
      allowNull: true
    },
    userId: { //유저 ID
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    timestamps: true,
    paranoid: true
  })
);