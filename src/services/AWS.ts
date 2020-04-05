import AWS from 'aws-sdk';
import IAWSConfig from '../models/interfaces/IAWSConfig';

class AmazonWebServices {
    private client: AWS.Rekognition | null
    constructor(){
        this.client = null;
    }

    isOperating = () => {
        return this.client === null ? false: true;
    }

    loadConfig = (config: IAWSConfig) => {
        AWS.config.update(new AWS.Config({
            region: 'us-east-1',
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
            sessionToken: config.sessionToken
        }));
        this.client = new AWS.Rekognition();
    }

    detectLables = async (buffer: any) => {
        if(this.client === null){
            throw new Error('missing aws config');
        }
        const params = {
            Image: {
                Bytes: buffer
            },
            MaxLabels: 3
        }
        return this.client.detectLabels(params).promise();
    }

}

const amazonWebServices = new AmazonWebServices();

export default amazonWebServices;