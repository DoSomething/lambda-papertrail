build:
	docker build . -t lambda-papertrail

tests:
	make build
	docker run --rm lambda-papertrail
