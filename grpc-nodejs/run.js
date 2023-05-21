const client = require("./client");

// read data 
client.getAll({}, (error, mahasiswa) => {
  if (!error) {
    console.log('successfully fetch data')
    console.log(notes)
  } else {
    console.error(error)
  }
})

// add notes 
client.addNotes(
  {
    nama: "reyhan",
    nrp: "5027211042",
    nilai: 100
  },
  (error, notes) => {
    if (!error) {
      console.log('successfully create data')
      console.log(notes)
    } else {
      console.error(error)
    }
  }
)

// edit notes 
client.editNotes(
  {
    id: "0a3DUp3gZhLMa0CyBakn",
    nama: "inu tapi diedit lagi",
    nrp: "5027211033 edited lagi",
    nilai: 1
  },
  (error, notes) => {
    if (!error) {
      console.log('successfully edit data')
      console.log(notes)
    } else {
      console.error(error)
    }
  }
)

// delete notes 
client.deleteNotes(
  {
    id: "4xuoEvuD6Jr8kqDduAPb"
  }, 
  (error, notes) => {
    if (!error) {
      console.log('successfully delete data')
    } else {
      console.error(error)
    }
  }
)