# kfk-perf-test-case

Basic performance test case, this is not a benchmark test comparing both Node.js kafka clients at the same time.

* The test is to check the time spent to produce and consume messages.

Node.js and Kafka version:

```
Node v14.17.0
kafka 2.8.0 running in "zookeeper-less" mode.
```

> You can try on your machine with the same kafka configuration used in this test by executing [this script](./kfk-setup.sh)

### node-rdkafka producer

producing 100 messages

```
$ export BROKER=`<your broker server here>`
$ time node node-rdkafka-producer.js 

real	0m0.073s
user	0m0.039s
sys     0m0.010s
```

producing 10.000 messages

```
$ time node node-rdkafka-producer.js 

real	0m0.080s
user	0m0.092s
sys     0m0.000s
```

producing 1.000.000 messages

```
$ time node node-rdkafka-producer.js 

real	0m1.663s
user	0m1.764s
sys     0m0.131s
```

Check the number of messages sent to the Kafka broker:

```
$ kafka-run-class.sh kafka.tools.GetOffsetShell --topic=test-topic --broker-list=`<your broker server here>` | cut -d ':' -f3
1010100
```

### node-rdkafka consumer

> Environment reset and producing 1.000.000

consuming 1.000.000 messages

* auto-commit true

```
$ time node node-rdkafka-consumer.js 
last message: value-999999

real	0m9.491s
user	0m5.769s
sys     0m0.314s
```

---
> Environment reset
---

### kafkajs producer

producing 100 messages

```
$ export BROKER=`<your broker server here>`
$ time node kafkajs-producer.js 

real	0m0.261s
user	0m0.145s
sys     0m0.010s
```

producing 10.000 messages

```
$ time node kafkajs-producer.js 

real	0m4.124s
user	0m2.124s
sys     0m0.250s
```

producing 1.000.000 messages

```
$ time node kafkajs-producer.js 

real	2m44.518s
user	1m29.784s
sys     0m14.727s
```

Check the number of messages sent to the Kafka broker:

```
$ kafka-run-class.sh kafka.tools.GetOffsetShell --topic=test-topic --broker-list=`<your broker server here>` | cut -d ':' -f3
1010100
```

### kafkajs consumer

> Environment reset and producing 1.000.000

consuming 1.000.000 messages

* auto-commit true

```
time node kafkajs-consumer.js 
last message: value-999999

real	0m28.375s
user	0m24.994s
sys     0m6.042s
```
