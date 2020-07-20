const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION
});

const documentClient = new AWS.DynamoDB.DocumentClient();

const TABLE = process.env.DYNAMODB_IMAGES;

const put = item => {
    return new Promise((res, rej) => {
        documentClient.put({
            TableName: TABLE,
            Item: item
        }, (err, data) => {
            if (err) {
                return rej(err);
            }
            return (res(data))
        })
    });
};

const get = id => {
    return new Promise((res, rej) => {
        documentClient.get({
          TableName: TABLE,
          Key: {
            id: id
          },
          ConsistentRead: true
        }, (err, data) => {
            if (err) {
                return rej(err)
            }
          return res(data.Item);
        })
      })
};

module.exports = {
    put, get
};