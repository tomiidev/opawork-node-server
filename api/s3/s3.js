import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;

console.log('Región:', AWS_BUCKET_REGION);  // Añadir esto para depuración

const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    }
});

export const uploadFileToS3 = async (file) => {
    try {
        console.log(file);
        const stream = fs.createReadStream(file.path);
        const uploadParams = {
            Bucket: AWS_BUCKET_NAME,
            Key: file.originalname,
            Body: stream,
            ACL: 'public-read',
        };
        const command = new PutObjectCommand(uploadParams);
        const result = await client.send(command);
        console.log('Archivo subido:', result);
        return result;
    } catch (error) {
        console.error('Error al subir archivo:', error);
        throw error;
    }
};
