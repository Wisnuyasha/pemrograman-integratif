const express = require('express');
const router = express.Router();
const client = require('../client');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

// all endpoints method
router.get('/mhs', (req, res) => {
  client.getAllMhs({}, (error, response) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.send(response);
    }
  });
});

router.post('/mhs', (req, res) => {
  const nama = req.body.nama;
  const nrp = req.body.nrp;
  const nilai = req.body.nilai;
  const mhs = {
    nama: nama,
    nrp: nrp,
    nilai: nilai,
  };
  client.addNotes(mhs, (error, response) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.send(response);
    }
  });
});

router.delete('/mhs/:id', (req, res) => {
  const mhsId = req.params.id;
  const mhs = {
    id: mhsId,
  };
  client.deleteNotes(mhs, (error, response) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.send(response);
    }
  });
});

router.get('/mhs/:id', (req, res) => {
  const mhsId = req.params.id;
  const mhs = {
    id: mhsId,
  };
  client.getNotes(mhs, (error, response) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.send(response);
    }
  });
});

router.post('/mhs/:id/edit', (req, res) => {
  const mhsId = req.params.id;
  const mhs = {
    id: mhsId,
    nama: req.body.nama,
    nrp: req.body.nrp,
    nilai: req.body.nilai,
  };
  client.editNotes(mhs, (error, response) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.send(response);
    }
  });
});

module.exports = router;
