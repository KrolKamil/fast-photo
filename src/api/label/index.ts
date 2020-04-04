import AWS from 'aws-sdk';

const config = new AWS.Config({
    region: 'us-east-1',
    accessKeyId: 'ASIA4C5S3JZEWEHAS4N3',
    secretAccessKey: 'mtXGkp7oScNjN8bFVpIWCKXEo4qV6141a9K39TZE',
    sessionToken: 'FwoGZXIvYXdzEIT//////////wEaDJoOdH3Kvk/zwWuxPCLFAcU9Ri35AsHDu/vk69JwmwdUz3h4QrwAXfueP2/YC8u9seFXxuOvOabYkrl70ZS7c/FbNImWOjCFJBJowMBAcOvqzV4wdGfPF7hBV4iTfCBBYM2XetEv5nyZy8/krdwJ0kNjcGHbo8oPzdfu0ciiHr1AC4k8HYN1tod7jRoVtM9nBExoyHOi1gqMyAldS9M/VDzi/xc/3GIktgG69V/uIHPzwoVDupaX1iAPbKMnPGZTZ5jQEyQ47nJXnUeX836j9La275zcKKSvo/QFMi0KdixDwG6YeMFs7WVIVEiJGLQgwCmgGjvSiZM1YtHPno7E4mCe5W720agkFhA='
});
AWS.config.update(config);
const client = new AWS.Rekognition();

const detectLables = async (buffer: any) => {
    const params = {
        Image: {
            Bytes: buffer
        },
        MaxLabels: 3
    }   
    return client.detectLabels(params).promise();
}

export default detectLables;