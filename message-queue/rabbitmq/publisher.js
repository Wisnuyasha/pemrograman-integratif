const amqp = require('amqplib/callback_api')

amqp.connect(`amqp://localhost`, (err, connect) => {
    if (err) throw err;
    connect.createChannel((err, channel) => {
        if (err) throw err;
        let queueName = "babaji";
        let message = "babaji ganteng";
        channel.assertQueue(queueName, {
            durable : false
        });
        channel.sendToQueue(queueName, Buffer.from(message));
        console.log(`message : ${message}`);
        setTimeout(() => {
            connect.close
        }, 1000);
    })
})