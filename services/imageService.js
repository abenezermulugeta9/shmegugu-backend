require('dotenv').config();

const fs = require('fs');
const s3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const awsS3 = new s3({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    }
});

module.exports.uploadImage = (file) => {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return awsS3.upload(uploadParams).promise();
}

module.exports.downloadImage = (fileKey) => {
    const downloadParams = {
        Key: fileKey, 
        Bucket: bucketName
    }

    return awsS3.getObject(downloadParams).createReadStream();
}