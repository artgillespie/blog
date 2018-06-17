dev:
	hugo server

build:
	hugo --theme=hugo-zen

deploy: build
	firebase deploy --only hosting	
