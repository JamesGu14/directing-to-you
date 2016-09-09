'use strict'

var express = require('express')
var router = express.Router()
const _ = require('lodash')

var dictionary = [
  { phone: '123', latitude: '31.208911099999998', longitude: '121.59742200000001' },
  { phone: '001', latitude: '31.241518', longitude: '121.530439' },
  { phone: '002', latitude: '31.314256', longitude: '120.661488' }
]

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' })
})

/** GET findee upload location page */
router.get('/findee', function(req, res) {
  res.render('findee', {title: 'Findee Page'})
})

/** POST allows findee upload current location */
router.post('/uploadLocation', function (req, res) {
  let phone = req.body.phone
  let latitude = req.body.latitude
  let longitude = req.body.longitude
  dictionary.push({
    phone: phone,
    latitude: latitude,
    longitude: longitude
  })
  printDictionary()
  res.json({
    res: 'success'
  })
})

function printDictionary() {
  console.log('========================')
  dictionary.forEach(function(findee) {
    console.log(findee.phone + ' ' + findee.latitude + ' ' + findee.longitude)
  }, this)
}

/** GET finder page */
router.get('/finder', function(req, res) {
  res.render('finder', {title: 'Finder Page'})
})


/** GET user location by phone number */
router.get('/getUserLocation/:phone', function(req, res) {
  let phone = req.params.phone
  let index = _.findIndex(dictionary, { 'phone': phone })
  if (index < 0) {
    return res.json({
      res: 'phone number not matched'
    })
  }
  return res.json({
    res: 'success',
    latitude: dictionary[index].latitude,
    longitude: dictionary[index].longitude
  })
})


module.exports = router
