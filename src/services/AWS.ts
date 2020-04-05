import AWS from 'aws-sdk';

class AmazonWebServices {
    private client: AWS.Rekognition | null
    constructor(){
        this.client = null;
    }
    loadConfig = (config: any) => {
        AWS.config.update(new AWS.Config({
            region: 'us-east-1',
            accessKeyId: config.aws_access_key_id,
            secretAccessKey: config.aws_secret_access_key,
            sessionToken: config.aws_session_token
        }));
        this.client = new AWS.Rekognition();
    }

    detectLables = async (buffer: any) => {
        if()
        const params = {
            Image: {
                Bytes: buffer
            },
            MaxLabels: 3
        }
    }

}

const amazonWebServices = new AmazonWebServices();

export default amazonWebServices;