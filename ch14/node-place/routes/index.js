const express = require('express');
const util = require('util');
const googleMaps = require('@google/maps');

const History = require('../schemas/history');
const Favorite = require('../schemas/favorite');

const router = express.Router();
const googleMapsClient = googleMaps.createClient({
  key: process.env.PLACES_API_KEY,
});

router.get('/', async (req, res, next) => {
  try {
    const favorites = await Favorite.find({});
    //최근 순으로 검색내역 5개 가져오기
    const histories = await History.find({}).limit(5).sort('-createdAt');
    res.render('index', { results: favorites, history: histories });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
 * 자동완성
 */
router.get('/autocomplete/:query', (req, res, next) => {
  googleMapsClient.placesQueryAutoComplete({
    input: req.params.query,
    language: 'ko',
  }, (err, response) => {
    if (err) {
      return next(err);
    }
    return res.json(response.json.predictions);
  });
});

/**
 * 장소검색
 */
router.get('/search/:query', async (req, res, next) => {
  const googlePlaces = util.promisify(googleMapsClient.places);
  const googlePlacesNearby = util.promisify(googleMapsClient.placesNearby);
  const { lat, lng, type } = req.query;
  try {
    const histories = await History.find({}).limit(5).sort('-createdAt');
    const history = new History({ query: req.params.query });
    await history.save();
    let response;
    if (lat && lng) {
      response = await googlePlacesNearby({
        keyword: req.params.query,
        location: `${lat},${lng}`,
        rankby: 'distance',
        language: 'ko',
        type,
      });
    } else {
      response = await googlePlaces({
        query: req.params.query,
        language: 'ko',
        type,
      });
    }
    res.render('result', {
      title: `${req.params.query} 검색 결과`,
      results: response.json.results,
      query: req.params.query,
      history: histories
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
 * 즐겨찾기 추가
 */
router.post('/location/:id/favorite', async (req, res, next) => {
  try {
    const favorite = await Favorite.create({
      placeId: req.params.id,
      name: req.body.name,
      location: [req.body.lng, req.body.lat],
    });
    res.send(favorite);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
 * 즐겨찾기 삭제
 */
router.delete('/location/:id/favorite', async (req, res, next) => {
  try {
    await Favorite.remove({ placeId: req.params.id });
    res.send('deleted');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
 * 길안내 API 국내에선 사용불
 */
router.get('/derections', async (req, res, next) => {
  try {
    const { origin, dest } = req.query;
    const derections = util.promisify(googleMapsClient.directions);
    const response = await derections({
      origin,
      destination: dest
    });
    console.log(req.query, response);
  }catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
