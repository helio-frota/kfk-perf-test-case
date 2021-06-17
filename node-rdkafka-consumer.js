const Kafka = require('node-rdkafka');

const consumer = new Kafka.KafkaConsumer({
	'metadata.broker.list': process.env.BROKER,
	'group.id': 'test-consumer',
	'enable.auto.commit': true
}, {
	'auto.offset.reset': 'earliest'
});

let count = 0;

consumer.connect()
	.once('ready', () => {
		consumer.subscribe(['test-topic']);
		consumer.consume();
	})
	.on('data', (msg) => {
		count++;
    if (count === 1_000_000) {
			console.log('last message:', msg.value.toString());
			consumer.disconnect();
		}
	});

process.once('SIGINT', consumer.disconnect);
