const router = require('express').Router();
const { searchController } = require('../../controllers');


router.post('/search', searchController.getSearchResult)

// http://localhost:3340/search/cura

module.exports = router
