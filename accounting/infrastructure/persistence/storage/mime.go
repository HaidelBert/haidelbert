package storage

import "strings"

type MimeUpload struct {
	MimeType string
	Base64Content string
	Extension string
}

func Parse(payload string) MimeUpload {
	metaAndContent := strings.SplitAfterN(payload, ",", 2)
	mimeType := strings.Replace(strings.Replace(strings.SplitAfterN(metaAndContent[0], ";", 2)[0], "data:", "", 1), ";", "", 1)

	return MimeUpload{
		MimeType: mimeType,
		Base64Content: metaAndContent[1],
		Extension: strings.SplitAfterN(mimeType, "/", 2)[1],
	}
}
