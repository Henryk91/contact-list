var express = require("express");
var router = express.Router();
var Handler = require('../controllers/handlers.js')

var dbHandler = new Handler();




router.get("/", function (req, res) {
  var user = req.query.user;

  if(user === 'all'){
  dbHandler.getAllContacts((docs) => {
    res.json(docs)
  })
}else {

  dbHandler.getMyContacts(user , (docs) => {
    res.json(docs)
  })
}
  // res.json(contactDummy)
});

module.exports = router;