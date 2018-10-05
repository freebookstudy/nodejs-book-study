const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoriteSchema = new Schema({
  placeId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: { type: [Number], index: '2dsphere'}, //MongoDB에서 지원하는 자료형 위도 경도를 저장하기 좋음
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Favorite', favoriteSchema);