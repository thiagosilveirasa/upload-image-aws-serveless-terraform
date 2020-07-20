const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION
});

const rekognition = new AWS.Rekognition();

const detectLabels = (bucket, key) => {
    return new Promise((res, rej) => {
        rekognition.detectLabels({
          Image: {
            S3Object: {
              Bucket: bucket,
              Name: key,
            }
          },
          MinConfidence: 95,
          MaxLabels: 6
        }, (err, data) => {
          if (err) {
            return (rej(err));
          }
          return res(data.Labels.map(label => label.Name));
        })
    })
};

module.exports = {
    detectLabels: detectLabels
};