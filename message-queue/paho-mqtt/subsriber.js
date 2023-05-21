// Import library Paho MQTT
const mqtt = require('paho-mqtt');

// Membuat koneksi MQTT ke broker
const client = new mqtt.Client('broker.mqtt.com', 1883, 'subscriber-client');
client.connect({
    onSuccess: () => {
        console.log('Connected to MQTT broker');
    },
    onFailure: (err) => {
        console.error(`Failed to connect to MQTT broker: ${err}`);
    }
});

// Subscribe ke topik tertentu
client.subscribe('test/topic');

// Meng-handle pesan yang diterima
client.onMessageArrived = (message) => {
    console.log(`Received message: ${message.payloadString}`);
};