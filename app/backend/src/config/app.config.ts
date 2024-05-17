import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        port: process.env.PORT || 3000,

        storageEndPoint: process.env.STORAGE_ENDPOINT || '',
        storagePort: process.env.STORAGE_PORT
            ? Number(process.env.STORAGE_PORT)
            : undefined,
        storageUseSSL:
            process.env.STORAGE_SSL === 'true' || process.env.STORAGE_SSL === '1'
                ? true
                : false,
        storageAccessKey: process.env.STORAGE_ACCESS_KEY || '',
        storageSecretKey: process.env.STORAGE_SECRET_KEY || '',
        storageDefaultSecondsExpiry: +(
            process.env.STORAGE_DEFAULT_SECONDS_EXPIRY || 0
        ),
        storageDefaultBucketName:
            process.env.STORAGE_DEFAULT_BUCKET_NAME || '',
    };
});
