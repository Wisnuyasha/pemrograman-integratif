// Import package 
const grpc = require('@grpc/grpc-js');
const app = require('express')();
var protoLoader = require('@grpc/proto-loader');
const { db } = require("./database/config.js");
const mhsRef = db.collection('mahasiswa');
const mhsController = require('./controller/mhsController.js');

// express backend
app.use('/', mhsController);

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}

// Define Proto path 
const PROTO_PATH = './mahasiswa.proto';
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
// Load Proto 
const mahasiswaProto = grpc.loadPackageDefinition(packageDefinition).MahasiswaService;

const server = new grpc.Server();



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

// Start server 
server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
