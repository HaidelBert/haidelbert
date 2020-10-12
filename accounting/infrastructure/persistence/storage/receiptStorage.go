package storage

import (
	"bytes"
	b64 "encoding/base64"
	"fmt"
	"github.com/HaidelBert/accounting/domain/accounting"
	random "github.com/HaidelBert/accounting/infrastructure"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

type ReceiptStorageS3 struct{
	S3Client *s3.S3
	Bucket *string
	S3Downloader s3manager.Downloader
}

func (rs ReceiptStorageS3) Store(receipt string) (*string, error) {
	parsed := Parse(receipt)
	key := random.RandString(50)+"."+parsed.Extension
	content, err := b64.StdEncoding.DecodeString(parsed.Base64Content)
	_, err = rs.S3Client.PutObject(&s3.PutObjectInput{
		Body:  bytes.NewReader(content),
		Bucket: rs.Bucket,
		Key:    &key,
	})
	if err != nil {
		fmt.Printf("Failed to upload data to %s/%s, %s\n", *rs.Bucket, key, err.Error())
		return nil, err
	}
	return &key, nil
}

func (rs ReceiptStorageS3) Download(key string) (*accounting.ReceiptDownload, error) {
		request := s3.GetObjectInput{
		Bucket: rs.Bucket,
		Key:    &key,
	}
	result, err := rs.S3Client.GetObject(&request)
	if err != nil {
		fmt.Printf("Failed to download data to %s/%s, %s\n", *rs.Bucket, key, err.Error())
		return nil, err
	}

	receiptDownload := accounting.ReceiptDownload {
		Content: result.Body,
		Filename: key,
		MimeType: *result.ContentType,
	}

	return &receiptDownload, nil
}
