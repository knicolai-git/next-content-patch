export async function putObject(file, {bucket, bucketDirectory}) {

}

export async function putObjects(files, {bucket, bucketDirectory}) {
  // TODO: upload folder to s3 and ensure all objects have the correct permissions
  return Promise.resolve(files);
}

export async function deleteObject(files, {bucket, bucketDirectory}) {

}

export async function deleteObjects(files, {bucket, bucketDirectory}) {
  return Promise.resolve(files);
}
