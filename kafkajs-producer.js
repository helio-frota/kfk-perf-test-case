const { Kafka } = require('kafkajs');

const kafka = new Kafka({
	clientId: 'test-only',
	brokers: [process.env.BROKER]
});

const numMessages = 1_000_000;

const producer = kafka.producer();

async function connect() {
	await producer.connect();
}

async function produce() {

	for (let i = 0; i < numMessages; i++) {

		const value = Buffer.from('value-' + i);

		await producer.send({	
			topic: 'test-topic', 
		  messages: [ {  key: 'the-key', value: value, partition: 0 } ] 
		});

	}
}

async function disconnect() {
  await producer.disconnect();
}

(async () => {
  await connect();
  await produce();
  await disconnect();
})();