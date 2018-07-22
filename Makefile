CLOUDFRONT_DISTRIBUTION_ID := E34360W9NXORIC
BUCKET_NAME := artgillespie.com-cdn

dev:
	hugo server --bind 0.0.0.0

build:
	hugo --theme=hugo-zen

deploy: build
	AWS_SDK_LOAD_CONFIG=true s3deploy -bucket $(BUCKET_NAME) -region us-west-2 -source public
	aws cloudfront create-invalidation --distribution-id  $(CLOUDFRONT_DISTRIBUTION_ID) --paths '/*'
