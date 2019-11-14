# App Name

<Description here>

## Prerequisites
1. Node 12.13
2. Mongo DB 4
1. [Yarn](https://yarnpkg.com/lang/en/)
3. Docker 19.xx.xx

## Local development

During development run below command
```
yarn dev
```

This will run API on port `8080` by default configuration.

## Docker Deployment

To deploy with docker, run below command
```
docker-compose up 
```

Run with `-d` flag to run in background.

## Lint

To verify
```
yarn lint
```

To verify and fix auto fixable issues run,
```
yarn lint:fix
```


