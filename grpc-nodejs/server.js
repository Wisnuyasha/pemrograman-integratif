// Import package 
const grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

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
const mahasiswaProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// Dummy data 
let mahasiswa = {
  mahasiswa: [
    {
      id: "1",
      nama: "Rudi",
      nrp: "5119",
      nilai: 59
    },
    {
      id: "2",
      nama: "Budi",
      nrp: "5118",
      nilai: 60
    }
  ]
}

// defining service methods

const addMahasiswa = async (call, callback) =>  {
  const _mahasiswa = { ...call.request };
  mahasiswa.mahasiswa.push(_mahasiswa);
  callback(null, _mahasiswa);
}

const getAll = async (call, callback) => {
  callback(null, mahasiswa);
}

const getMahasiswa = async (call, callback) => {
  const mahasiswaId = call.request.id;
  const mahasiswaItem = mahasiswa.mahasiswa.find(({ id }) => mahasiswaId == id);
  callback(null, mahasiswaItem);
}

const editMahasiswa = async (call, callback) => {
  const mahasiswaId = call.request.id;
  const mahasiswaItem = mahasiswa.mahasiswa.find(({ id }) => mahasiswaId == id);
  mahasiswaItem.nama = call.request.nama;
  mahasiswaItem.nrp = call.request.nrp;
  mahasiswaItem.nilai = call.request.nilai;
  callback(null, mahasiswaItem)
}

const deleteMahasiswa = async (call, callback) => {
  const mahasiswaId = call.request.id;
  mahasiswa = mahasiswa.mahasiswa.filter(({ id }) => id !== mahasiswaId);
  callback(null, {mahasiswa});
}

// Add service in proto 
server.addService(mahasiswaProto.MahasiswaService.service, {
  addMahasiswa,
  getAll,
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
)

