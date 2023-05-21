javascript
// Import library Paho MQTT
const mqtt = require('paho-mqtt');

// Membuat koneksi MQTT ke broker
const client = new mqtt.Client('broker.mqtt.com', 1883, 'publisher-client');
client.connect({
    onSuccess: () => {
        console.log('Connected to MQTT broker');
    },
    onFailure: (err) => {
        console.error(`Failed to connect to MQTT broker: ${err}`);
    }
});

// Publish pesan ke topik tertentu setiap 5 detik
setInterval(() => {
    const message = new mqtt.Message('Hello from publisher!');
    message.destinationName = 'test/topic';
    client.send(message);
}, 5000);