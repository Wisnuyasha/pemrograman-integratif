// Import package 
const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
// Load service 
const PROTO_PATH = "./mahasiswa.proto"

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const MahasiswaService = grpc.loadPackageDefinition(packageDefinition).MahasiswaService;

// Define client 
const client = new MahasiswaService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
)

module.exports = client;

// client.getAll({}, (error, notes) => {
//   if (!error) {
//     console.log('successfully fetch data')
//     console.log(notes)
//   } else {
//     console.error(error)
//   }
// })