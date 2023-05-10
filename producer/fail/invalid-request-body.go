package fail

import "errors"

func InvalidRequestBody() error {
	return errors.New("invalid request body")
}
