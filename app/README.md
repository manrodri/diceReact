# randomDiceRoll

This is my solution to a [devProject](https://www.codementor.io/projects/web/random-number-generator-web-app-bz042v8kll)

## Technology stack

- React for the frontend
- AWS Lambda and AWS Apigateway for the front end. All code deployed using CDK.
- DB not necessary

## Deployment

- AWS Codebuild job for the front end.
- AWS Codebuild job for the backend
- Front end deployed to an S3 bucket. 
- No domain name, cdn or cloudwatch monitoring at the moment.

## Done

### Backend

- Basic lambda function and apigateway (not proxy without authentication, models, or request and response transformation)
- S3 bucket to host client side code
- IAM roles necessary for this infra to work
- CDKPipeline to handles backend continuous deployment
- CodeBuild Job that handles Continuous Deployment to S3 bucket


### Frontend

- Basic React app that meets requirements
- It Uses code running in client to provide diceRoll
- Improve User experience (css)


## To do

### Frontend

- Input validation
- Display cards using grid
- Button to play again with the same setting
- use of backend

### Back end

- Integrate frontend CB job in CDK Pipeline
- Use AWS CodeDeploy to deploy lambda last version and alias
- Provide rollback
- Write some tests
- Use Cloudwatch
- Use custom domain, certificate and cdn