// importtiere angeforderte Daten - essenttials
const express = require('express');
// erstelle einen new router
const router = express.Router();

// erstelle einen JSON data array
let data = [
    { id: 1, title: 'Vorname',  order: 1, completed: true, createdOn: new Date() },
    { id: 2, title: 'Name',     order: 2, completed: true, createdOn: new Date() },
    { id: 3, title: 'Geburtsjahr', order: 3, completed: true, createdOn: new Date() },
    { id: 4, title: 'Geburtsmonat', order: 4, completed: false, createdOn: new Date() },
    { id: 5, title: 'Übungsschwerpunkt', order: 5, completed: false, createdOn: new Date() },
    { id: 6, title: 'Trainer', order: 5, completed: false, createdOn: new Date() },
];

// READ
// Dieser End-Punkt einer API gibt einen JSON data array aus
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// Dieser End-Punkt gibt ein object aus einem data array nach id aus
// wir bekommen die `id` von den URL end-points

//READ
router.get('/:id', function (req, res) {
    // finde ein object aus dem `data` array mit dem treffer match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    // wenn ein object gefunden gib ein object zurück ansonsten return gib Fehler 404 an not-found
    if (found) {
        res.status(200).json(found);
    }
    else {
        res.sendStatus(404);
    }
});

//CREATE
router.post('/', function (req,res){
  let itemIds = data.map(item => item.id);
  let orderNums = data.map(item => item.order);
  let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
  let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
  let newItem = {
    id: newId,
    title: req.body.title,
    order: newOrderNum,
    completed: false,
    createdOn: new Date ()
  };
  data.push(newItem);
  res.status(201).json(newItem);
});

//UPDATE
router.put(('/:id', function (req, res) {
  let found = data.find(function(item) {
    return item.id ===parseInt(req.params.id);
  });

  if (found){
    let updated = {
      id: found.id,
      title: req.body.title,
      order: req.body.order,
      completed: req.body.completed
    };

    let targetIndex = data.indexOf(found);
    data.splice(targetIndex, 1, updated);
    res.sendStatus(204);
  }

  else {
    res.sendStatus(404);
  }
}));  //kein Ahnung wieso hier zwei Klammern stehen sollen?

//DELETE

router.delete('/:id', function (req, res) {
  let found = data.find(function(item){
    return item.id ===parseInt(req.params.id);
  });

  if (found){
    let targetIndex = data.indexOf(found);
    data.splice(targetIndex,1);
    }
    res.sendStstus(204);
  });
module.exports = router;
