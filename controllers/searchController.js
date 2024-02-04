const searchController = {
    showSearchPage(req, res){
        res.render('pages/search', {
            title: 'Search',
            errors: req.errors
        })
    }
};


module.exports = searchController;