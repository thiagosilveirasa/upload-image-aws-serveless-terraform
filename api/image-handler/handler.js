'use strict';

const s3Service = require('./services/s3Service');
const dynamodbService = require('./services/dynamodbService');

module.exports.upload = async (event) => {
    try {
      const item = await s3Service.upload(event.body, event.headers['content-type']);
      await dynamodbService.put(item);

      return {
        statusCode: 201,
        body: JSON.stringify(item)
      };
    } catch (e) {
      return {
        statusCode: 400,
        body: JSON.stringify({message: e.message})
      }; 
    }
};

module.exports.tags = async (event) => {
  const data = await dynamodbService.get(event.pathParameters.id);
  return {
    statusCode: 200,
    body: JSON.stringify(data.labels)
  }
};

