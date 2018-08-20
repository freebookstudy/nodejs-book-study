module.exports = (sequelize, DataType) => {
  return sequelize.define('comment', {
    //1대 다 관계이므로 생략
    /*
    commenter: {
      type: DataType.STRING(20),
      allowNull: false,
      unique: true
    },
    */
    comment: {
      type: DataType.STRING(100),
      allowNull: false
    },
    created_at: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()')
    }
  }, {
    timestamp: false,
    underscored: true
  });
}