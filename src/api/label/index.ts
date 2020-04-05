import AWS from 'aws-sdk';

const config = new AWS.Config({
    region: 'us-east-1',
    accessKeyId: 'ASIA4C5S3JZESJSGAEHU',
    secretAccessKey: 'o0VvPryQA+3nsHKjWMYb0a/JCbIigKXxYB0pC2/v',
    sessionToken: 'FwoGZXIvYXdzEJP//////////wEaDM7hGGr8/KT3FrkVpSLFAVzdoIqT3cyIrTQ9bG7rxKyP6+LstzUMUWKba1NhdvW5UTwMNUb8O0wonNclXa5emFuRi4l94t9DmlW93lPB/e2pkNU31xzrtcFQVo0BuKZubDu9hlF8pVF8jlhpA7nGfssQ4iqbSisPF8RieUZzhH77KjpKh+K0d9pWTCssLhz/XEvxRzDzFFsqf8CcanCSSzEIC2GV4L1D2tSydOjEFb9cU1wd0EHKG5bh4on/aTrlWRln042XipcYOvJAAYU32F8Dv8rjKMHEpvQFMi3MqkUxBJPUvX4LrlBLvF464artvfQUC41nxXY8LAjjaP01HaWXMo5xuc0P1uk='});
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