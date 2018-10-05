/**
 * 유저 테이블 모델
 * @type {function(*, *): (Model|*|void)}
 */
module.exports = (sequelize, DataTypes) => (
  sequelize.define('user', {
    email: { //이메일(ID)
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    nick: { //닉네임
      type: DataTypes.STRING(15),
      allowNull: false
    },
    password: { //패스워드
      type: DataTypes.STRING(100),
      allowNull: true //SNS 로그인이면 패스워드가 없어도 되므로 필수가 아님
    },
    provider: { //local 인지 SNS 인지 구분하는 컬럼
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'local'
    },
    snsId: { //SNS 로그인을 했을 경우에만 SNS ID를 알려줌
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    timestamps: true,
    paranoid: true
  })
);