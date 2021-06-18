const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'test-only',
  brokers: [process.env.BROKER],
});

const consumer = kafka.consumer({ groupId: 'test-consumer3' });

let count = 0;

async function connect() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
}

async function consume() {
  await consumer.run({
    eachMessage: async ({ message }) => {
      count++;
      if (count === 1_000_000) {
        console.log('last message:', message.value.toString());
        consumer.disconnect();
      }
    },
  });
}

(async () => {
  await connect();
  await consume();
})();
