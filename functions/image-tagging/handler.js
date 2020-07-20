'use strict';

const rekognitionService = require('./services/rekognitionService');
const dynamodbService = require('./services/dynamodbService');

module.exports.tag = async (event) => {
  const s3Info = JSON.parse(event.Records[0].body);   
  const bucket = s3Info.Records[0].s3.bucket.name;
  const key = s3Info.Records[0].s3.object.key;
  const labels = await rekognitionService.detectLabels(bucket, key);
  const dbItem = await dynamodbService.get(key);
  dbItem.labels = labels;
  await dynamodbService.put(dbItem);

  return { message: 'Tag criada(s) com sucesso.', event };
};
