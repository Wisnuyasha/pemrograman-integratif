const amqp = require('amqplib/callback_api')

amqp.connect(`amqp://localhost`, (err, connect) => {
    if (err) throw err;
    connect.createChannel((err, channel) => {
        if (err) throw err;
        let queueName = "babaji";
        channel.assertQueue(queueName, {
            durable : false
        });
        channel.consume(queueName, (msg) => {
            console.log(`received : ${msg.content.toString()}`);
            channel.ack(msg);
        })
    })
})