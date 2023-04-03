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
    id: "123",
    nama: "inu",
    nrp: "05",
    nilai: 90
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
    id: "2xsJJAtBzC7H0g2fRs72",
    nama: "Budi",
    nrp: "5118",
    nilai: 0
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
    id: "96S7JNGGHavMFLYpx5YL"
  }, 
  (error, mahasiswa) => {
    if (!error) {
      console.log('successfully delete data')
    } else {
      console.error(error)
    }
  }
)