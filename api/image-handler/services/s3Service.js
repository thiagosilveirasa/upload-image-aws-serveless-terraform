const AWS = require('aws-sdk');
const mimeTypes = require('mime-types')

AWS.config.update({
    region: process.env.AWS_REGION
});

const uuid = require('uuid/v4');

const s3 = new AWS.S3();

const BUCKET = process.env.BUCKET;

const upload = (body, contentType) => {
    if (!contentType || (contentType !== 'image/jpeg' && contentType !== 'image/png')) {
        throw new Error('Content-type inválido.');
    }
    const id = uuid();
    const extension = mimeTypes.extension(contentType);
    const key = `${id}.${extension}`;
    return new Promise((res, rej) => {
        s3.putObject({
            Bucket: BUCKET,
            Key: key,
            Body: new Buffer(body.replace(/^data:image\/\w+;base64,/, ""),'base64'),
            ContentEncoding: 'base64',
            ContentType: contentType
        }, (err) => {
            if (err) {
                return rej(err)
            }
            return res({
                bucket: BUCKET,
                key: key
            });
        });
    });
    
}

module.exports = {
    upload: upload
};

