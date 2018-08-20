module.exports = (sequelize, DataType) => {
  return sequelize.define('user', {
    name: {
      type: DataType.STRING(20),
      allowNull: false,
      unique: true
    },
    age: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false
    },
    married: {
      type: DataType.BOOLEAN,
      allowNull: false
    },
    comment: {
      type: DataType.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()')
    }
  }, {
    timestamps: false,
    underscored: true,
  });
}