#!/bin/bash

#: Title       : Kafka server setup
#: Date        : 2021-06-17
#: Author      : "Helio Frota" <00hf11 at gmail dot com>
#: Version     : 0.0.1
#: Description : Applies the same configuration used in the test

if [ ! -f "kafka_2.12-2.8.0.tgz" ]
then 
  wget https://downloads.apache.org/kafka/2.8.0/kafka_2.12-2.8.0.tgz
fi

tar xf kafka**.tgz
cd kafka_2.12-2.8.0
sed -i "/listeners=PLAINTEXT:\/\/:9092,CONTROLLER:\/\/:9093/ s/listeners=PLAINTEXT:\/\/:9092,CONTROLLER:\/\/:9093/listeners=PLAINTEXT:\/\/localhost:9092,CONTROLLER:\/\/localhost:9093/" ./config/kraft/server.properties
sed -i "/num.network.threads=/ s/num.network.threads=3/num.network.threads=1/" ./config/kraft/server.properties
sed -i "/num.io.threads=/ s/num.io.threads=8/num.io.threads=1/" ./config/kraft/server.properties
ID=$(./bin/kafka-storage.sh random-uuid)
./bin/kafka-storage.sh format -t $ID -c ./config/kraft/server.properties
./bin/kafka-server-start.sh -daemon ./config/kraft/server.properties
# ./bin/kafka-topics.sh --bootstrap-server 192.168.122.99:9092 --create --topic test-topic
cd ..

