# Implementation of gRPC API and Protobuf in Node JS

## Goals

We will build basic CRUD application using gRPC API and Protobuf in NodeJS.

## Development Steps

### 1. Init Project

1. Clone your github repo in local
    ```bash
    git clone https://github.com/mocatfrio/integrative-programming.git
    ```

2. Then make project directory
    ```bash
    mkdir grpc-nodejs
    ```
    Move to the directory
    ```bash
    cd grpc-nodejs
    ```

3. Init node env
    ```bash
    npm init
    ```
    Install all library
    ```bash
    npm i
    ```

4. Create 4 files:
    * [Proto file](mahasiswa.proto)
    * [Server.js](server.js)
    * [Client.js](client.js)
    * [Main file for testing (run.js)](run.js)

    ```bash
    touch mahasiswa.proto client.js server.js run.js
    ```

### 2. Add CRUD Functions

#### a. Proto file
```protobuf
syntax = "proto3";
message Mahasiswa {
  string id = 1;
  string nama = 2;
  string nrp = 3;
  int64 nilai = 4;
}
message MahasiswaList {
  repeated Mahasiswa mahasiswa = 1;
}
message MahasiswaId {
  string id = 1;
}
message Empty {}

service MahasiswaService {
  // Create 
  rpc addMahasiswa (Mahasiswa) returns (Mahasiswa) {}
  // Read 
  rpc getAll (Empty) returns (MahasiswaList) {}
  rpc getMahasiswa (MahasiswaId) returns (Mahasiswa) {}
  // Update
  rpc editMahasiswa (Mahasiswa) returns (Mahasiswa) {}
  // Delete
  rpc deleteMahasiswa (MahasiswaId) returns (Empty) {}
}
```

#### b. Server

Add Service in server.js

```js

// Defining service methods
const getAll = async (call, callback) => {
  mhsRef.get()
  .then(querySnapshot => {
    const mhs = [];
    querySnapshot.forEach(doc => {
      mhs.push({ ...doc.data(), id: doc.id });
    });
    callback(null, { mahasiswa:mhs });
  })
  .catch(error => {
    console.error(error);
    callback(error, { mhs: [] });
  });
}

const addMahasiswa = async (call, callback) =>  {
  const mhs = { ...call.request };
  mhsRef.add(mhs)
    .then(docRef => {
      const mhsRefItem = mhsRef.doc(docRef.id);
      mhsRefItem.set({
        ...mhs,
        id : docRef.id
      }).then(() => {
        callback(null, { ...mhs, id: docRef.id });
      })
    })
    .catch(error => {
      console.error(error);
      callback(error, { ...mhs });
    });
}

const getMahasiswa = async (call, callback) => {
  const mhsId = call.request.id;
  mhsRef.doc(mhsId).get()
    .then(docSnapshot => {
      if (docSnapshot.exists) {
        callback(null, { ...docSnapshot.data(), id: docSnapshot.id });
      } else {
        callback(null, { id: null });
      }
    })
    .catch(error => {
      console.error(error);
      callback(error, { id: null });
    });
}

const editMahasiswa = async (call, callback) => {
  const mhsID = call.request.id;
  const mhsRefItem = mhsRef.doc(mhsID);
  const mhs = { ...call.request };
  mhsRefItem.set(mhs)
    .then(() => {
      callback(null, { ...mhs, id: mhsID });
    })
    .catch(error => {
      console.error(error);
      callback(error, { ...mhs });
    });

}

const deleteMahasiswa = async (call, callback) => {
  const mhsID = call.request.id;
  mhsRef.doc(mhsID).delete()
    .then(() => {
      callback(null, { mhs: [] });
    })
    .catch(error => {
      console.error(error);
      callback(error, { mhs: [] });
    });
}

// Add service in proto 
server.addService(mahasiswaProto.service, {
  getAll,
  addMahasiswa,
  getMahasiswa,
  editMahasiswa,
  deleteMahasiswa,
})
```

#### c. Main file
We need new js file to test our application, named **run.js**

```js
const client = require("./client");

// read data 
client.getAll({}, (error, mahasiswa) => {
  if (!error) {
    console.log('successfully fetch data')
    console.log(mahasiswa)
  } else {
    console.error(error)
  }
})

// add mahasiswa 
client.addMahasiswa(
  {
    nama: "anap",
    nrp: "5027211034",
    nilai: 100
  },
  (error, mahasiswa) => {
    if (!error) {
      console.log('successfully create data')
      console.log(mahasiswa)
    } else {
      console.error(error)
    }
  }
)

// edit mahasiswa 
client.editMahasiswa(
  {
    id: "vFOpF0gMSPEoSptKDvei",
    nama: "reynold",
    nrp: "5027211033",
    nilai: 99
  },
  (error, mahasiswa) => {
    if (!error) {
      console.log('successfully edit data')
      console.log(mahasiswa)
    } else {
      console.error(error)
    }
  }
)

// delete mahasiswa 
client.deleteMahasiswa(
  {
    id: "vFOpF0gMSPEoSptKDvei"
  }, 
  (error, mahasiswa) => {
    if (!error) {
      console.log('successfully delete data')
    } else {
      console.error(error)
    }
  }
)
```


## Testing
Use `npm start` to start the server and `node run` to start the client. Here is the screenshot.

![ss1](./img/ss1.png)

## Assignments

1. Make connection to the database (such as MongoDB etc)
2. Modify the existing CRUD function so that it can update data in the database

Optional but preferred:

3. Use the HTTP server and create endpoints to call our gRPC service procedures.

    For example:
    
    * **/mahasiswa** GET endpoint will call the getAll to get all mahasiswa in the database.
    * **/mahasiwa/:id/edit** POST will call the editMahasiswa to edit an item.

      etc.

4. Add simple UI 

Connect to firebase (config in **/database/config.js**)

```js
const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDemtJN14v73EW__Nd696Rp--z5IGSmPw0",
    authDomain: "grpc-node-firebase-express.firebaseapp.com",
    projectId: "grpc-node-firebase-express",
    storageBucket: "grpc-node-firebase-express.appspot.com",
    messagingSenderId: "115925109591",
    appId: "1:115925109591:web:9d33971b551f1b2c468c12",
    measurementId: "G-ZMG040B16M"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();

  module.exports = { firebaseApp, db };
```

Import/define package and express for api
```js
// Import package 
const grpc = require('@grpc/grpc-js');
const app = require('express')();
var protoLoader = require('@grpc/proto-loader');
const { db } = require("./database/config.js");
const mhsRef = db.collection('mahasiswa');
const mhsController = require('./controller/mhsController.js');

// express backend
app.use('/', mhsController);
```

Change Method for service (with firestore)
```js
// Defining service methods
const getAll = async (call, callback) => {
  mhsRef.get()
  .then(querySnapshot => {
    const mhs = [];
    querySnapshot.forEach(doc => {
      mhs.push({ ...doc.data(), id: doc.id });
    });
    callback(null, { mahasiswa:mhs });
  })
  .catch(error => {
    console.error(error);
    callback(error, { mhs: [] });
  });
}

const addMahasiswa = async (call, callback) =>  {
  const mhs = { ...call.request };
  mhsRef.add(mhs)
    .then(docRef => {
      const mhsRefItem = mhsRef.doc(docRef.id);
      mhsRefItem.set({
        ...mhs,
        id : docRef.id
      }).then(() => {
        callback(null, { ...mhs, id: docRef.id });
      })
    })
    .catch(error => {
      console.error(error);
      callback(error, { ...mhs });
    });
}

const getMahasiswa = async (call, callback) => {
  const mhsId = call.request.id;
  mhsRef.doc(mhsId).get()
    .then(docSnapshot => {
      if (docSnapshot.exists) {
        callback(null, { ...docSnapshot.data(), id: docSnapshot.id });
      } else {
        callback(null, { id: null });
      }
    })
    .catch(error => {
      console.error(error);
      callback(error, { id: null });
    });
}

const editMahasiswa = async (call, callback) => {
  const mhsID = call.request.id;
  const mhsRefItem = mhsRef.doc(mhsID);
  const mhs = { ...call.request };
  mhsRefItem.set(mhs)
    .then(() => {
      callback(null, { ...mhs, id: mhsID });
    })
    .catch(error => {
      console.error(error);
      callback(error, { ...mhs });
    });

}

const deleteMahasiswa = async (call, callback) => {
  const mhsID = call.request.id;
  mhsRef.doc(mhsID).delete()
    .then(() => {
      callback(null, { mhs: [] });
    })
    .catch(error => {
      console.error(error);
      callback(error, { mhs: [] });
    });
}

```

Add service to proto
```js
// Add service in proto 
const PROTO_PATH = './mahasiswa.proto';
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const mahasiswaProto = grpc.loadPackageDefinition(packageDefinition).MahasiswaService;
server.addService(mahasiswaProto.service, {
  getAll,
  addMahasiswa,
  getMahasiswa,
  editMahasiswa,
  deleteMahasiswa,
})
```

CRUD All the method with express (HTTP request) to firestore

Defining/Importing all the packages
```js
const express = require('express');
const router = express.Router();
const client = require('../client');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
```

Create all method for each endpoints
```js
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

```

### Documentation
Use `npm start` to start the server (nodemon) to start the client.
![nodemon](./img/nodemon.jpg)

Use `node run.js` to test the method with certain input.
![runjs](./img/runjs.jng)

## Others
* Markdown Guide: https://www.markdownguide.org/basic-syntax/
    
