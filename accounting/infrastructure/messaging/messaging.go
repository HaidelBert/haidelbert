package messaging

import (
	"encoding/json"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log"
)


type Service struct{
	Producer *kafka.Producer
}

func (s *Service) Send(topic string, payload interface{}) error {
	b, err := json.Marshal(payload)
	if err != nil {
		return err
	}
	deliveryChan := make(chan kafka.Event)
	pErr := s.Producer.Produce(&kafka.Message{
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
		Value: b,
	}, deliveryChan)
	e := <-deliveryChan
	m := e.(*kafka.Message)

	if pErr != nil {
		log.Printf("Delivery failed: %v\n", pErr)
		return pErr
	} else if m.TopicPartition.Error != nil {
		log.Printf("Delivery failed: %v\n", m.TopicPartition.Error)
		return m.TopicPartition.Error
	} else {
		log.Printf("Delivered message to topic %s [%d] at offset %v\n",
			*m.TopicPartition.Topic, m.TopicPartition.Partition, m.TopicPartition.Offset)
	}

	close(deliveryChan)
	return nil
}