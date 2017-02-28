import s3 from 's3';

const key = process.env.AWS_ACCESS_KEY_ID;
const secret = process.env.AWS_SECRET_ACCESS_KEY;

function createClient() {
  return s3.createClient({
    maxAsyncS3: 20,     // this is the default
    s3RetryCount: 3,    // this is the default
    s3RetryDelay: 1000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Options: {
      accessKeyId: key,
      secretAccessKey: secret,
      // any other options are passed to new AWS.S3()
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    },
  });
}

export async function syncDirectory(dir, {bucket, bucketDirectory}) {

  return new Promise(function(resolve, reject) {
    const uploader = createClient().uploadDir({
      localDir: dir,
      deleteRemoved: true, // default false, whether to remove s3 objects
                           // that have no corresponding local file.
      s3Params: {
        Bucket: bucket,
        Prefix: bucketDirectory,
        // other options supported by putObject, except Body and ContentLength.
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
      },
    });

    uploader.on('error', function(err) {
      console.error("unable to sync:", err.stack);
      reject(err);
    });

    uploader.on('end', function() {
      console.log("done uploading");
      resolve(true);
    });
  });

}
