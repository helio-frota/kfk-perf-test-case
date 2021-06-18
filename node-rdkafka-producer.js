const Kafka = require('node-rdkafka');

const producer = new Kafka.Producer({
  'metadata.broker.list': process.env.BROKER,
  dr_cb: true,
});

let counter = 0;

const numMessages = 1_000_000;

producer.on('delivery-report', () => counter++);

producer.on('ready', () => {
  for (let i = 0; i < numMessages; i++) {
    const value = Buffer.from('value-' + i);

    producer.produce('test-topic', 0, value, 'the-key');

    producer.poll(0);

    if (counter === numMessages) {
      break;
    }
  }

  producer.disconnect();
});

producer.connect();
