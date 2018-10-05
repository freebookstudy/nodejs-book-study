/**
 * 입찰 테이블
 * @param sequelize
 * @param DataTypes
 * @returns {Model|*|void}
 */
module.exports = (sequelize, DataTypes) => (
  sequelize.define('auction', {
    bid: { //입찰가
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    msg: { //경매 메시지
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
);
