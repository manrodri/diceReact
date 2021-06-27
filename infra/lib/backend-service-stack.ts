import { CfnOutput, Construct, StackProps, Stage } from '@aws-cdk/core';
import { BackendStack} from "./backend-stack";

export class BackendServiceStack extends Stage {
    urlOutput: CfnOutput;
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const backend = new BackendStack(this, 'DiceWebService', {
            tags: {
                Application: 'DiceWebService',
                Environment: id
            }
        })
        this.urlOutput = backend.urlOutput
    }
}

