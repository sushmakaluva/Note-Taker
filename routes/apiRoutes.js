const fs = require('fs');

const routes = (app) => {
  app.get('/api/notes', (req, res) => {
    fs.readFile(`${__dirname}/../db/db.json`, 'utf8', (err, data) => {
      if (err) throw err;
      const parsedData = JSON.parse(data);
      for (let i = 0; i < parsedData.length; i += 1) {
        parsedData[i].id = "id" + i;
      }
      res.json(parsedData);
    });
  });

  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    console.log(newNote);
    fs.readFile(`${__dirname}/../db/db.json`, 'utf8', (err, data) => {
      if (err) throw err;
      const ArrayData = JSON.parse(data);
      ArrayData.push(newNote);
      fs.writeFile(`${__dirname}/../db/db.json`, JSON.stringify(ArrayData), (err2, data2) => {
        if (err2) throw err2;
        console.log(data2);
        res.json(newNote);
      });
    });
  });

  app.delete('/api/notes/:id', (req, res) => {

    const chosenId = parseInt(req.params.id.split('id')[1]);
    // console.log(req.params);
    // console.log(req.query);
    fs.readFile(`${__dirname}/../db/db.json`, 'utf8', (err, data) => {
      if (err) throw err;
      const ArrayData = JSON.parse(data);
      for (let i = 0; i < ArrayData.length; i += 1) {
        ArrayData[i].id = i;
      }
      console.log(ArrayData);
      const v1 = ArrayData.map((element) => element.id);
      console.log(v1);
      const removeIndex = ArrayData.map((element) => element.id).indexOf(chosenId);
      console.log(removeIndex);
      ArrayData.splice(removeIndex, 1);
      fs.writeFile(`${__dirname}/../db/db.json`, JSON.stringify(ArrayData), (err2, data2) => {
        if (err2) throw err2;
        console.log(data2);
        res.json(ArrayData);
      });
    });
  });
};

module.exports = routes;
