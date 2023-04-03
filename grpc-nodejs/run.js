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
    nama: "reyhan",
    nrp: "5027211042",
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
    id: "0a3DUp3gZhLMa0CyBakn",
    nama: "inu tapi diedit lagi",
    nrp: "5027211033 edited lagi",
    nilai: 1
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
    id: "4xuoEvuD6Jr8kqDduAPb"
  }, 
  (error, mahasiswa) => {
    if (!error) {
      console.log('successfully delete data')
    } else {
      console.error(error)
    }
  }
)