const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_REGION
});

const documentClient = new AWS.DynamoDB.DocumentClient()

const TABLE = process.env.DYNAMODB_IMAGES;

const put = item => {
    return new Promise((res, rej) => {
        documentClient.put({
            TableName: TABLE,
            Item: {
                id: item.key,
                bucket: item.bucket
            }
        }, (err, data) => {
            if (err) {
                return rej(err);
            }
            return res(data);
        })
    });
}

module.exports = {
    put
}