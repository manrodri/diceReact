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


## Next

### Frontend

- Input validation
- Display cards using grid
- Button to play again with the same setting

### Back end

- Use of AWS CodePipeline
- Use AWS CodeDeploy to deploy lambda last version and alias
- Provide rollback
- Write some tests
- Use Cloudwatch
- Use custom domain, certificate and cdn