const express = require('express');
const router = express.Router();
const client = require('../client');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

// all endpoints method
// getAll/read method
router.get('/mhs', (req, res) => {
  client.getAll({}, (error, response) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.send(response);
    }
  });
});

// post/create method
router.post('/mhs', (req, res) => {
  const nama = req.body.nama;
  const nrp = req.body.nrp;
  const nilai = req.body.nilai;
  const mhs = {
    nama: nama,
    nrp: nrp,
    nilai: nilai,
  };
  client.addMahasiswa(mhs, (error, response) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.send(response);
    }
  });
});

// delete method
router.delete('/mhs/:id', (req, res) => {
  const mhsId = req.params.id;
  const mhs = {
    id: mhsId,
  };
  client.deleteMahasiswa(mhs, (error, response) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.send(response);
    }
  });
});

// get mahasiswa/id method
router.get('/mhs/:id', (req, res) => {
  const mhsId = req.params.id;
  const mhs = {
    id: mhsId,
  };
  client.getMahasiswa(mhs, (error, response) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.send(response);
    }
  });
});

// update mahasiswa/2 method
router.put('/mhs/:id/edit', (req, res) => {
  const mhsId = req.params.id;
  const mhs = {
    id: mhsId,
    nama: req.body.nama,
    nrp: req.body.nrp,
    nilai: req.body.nilai,
  };
  client.editMahasiswa(mhs, (error, response) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.send(response);
    }
  });
});


module.exports = router;
