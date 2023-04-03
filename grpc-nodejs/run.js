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