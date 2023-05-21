const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
    client.subscribe('inu')
    console.log('client has')
})
    client.on('message', (topic, message) => {
        console.log(message.toString());
    })