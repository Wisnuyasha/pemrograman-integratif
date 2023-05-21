const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://broker.hivemq.com') // ganti dengan URL broker Anda

client.on('connect', () => {
  setInterval(() => {
    var random = Math.random()*50;
    console.log(random);
    if(random<30) client.publish('inu', 'mqtt using hive' + random.toString())
  }), 30000;
})