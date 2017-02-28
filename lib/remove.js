import yaml from './yaml';
import { deleteObjects } from './s3';

/*
 Removes stuff that was previously hacked with overrides generated by this tool,
 so that all hacks are deleted from S3 and ElasticSearch.

 We keep track of the IDs for the things that have been removed in /data/remove.yaml

 If you think a content items is mistakenly being overridden in production
 adding the offending ID to /data/remove.yaml

 */
export default async function ({dir = 'data', filename = 'remove.yaml', bucket, bucketDirectory}) {
  const data = await yaml(filename, { dir });
  const ids = [];

  if (!data) {
    console.log('Nothing to remove');
    return;
  }

  // TODO: add the remove IDs to the list
  // TODO: delete them from s3
  // TODO: remove the items in the ids array that were not removed
  const filenames = ids.map(id => `${id}.json`);
  await deleteObjects(filenames, {bucket, bucketDirectory});

  return ids;
}