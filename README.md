# Content Patch [![Build Status][circle-image]][circle-url]

Builds JSON and sends it to S3 so that ES-interface can patch content with
experimental data that's not yet available in CAPI.

## How to add data

TODO: explain. In the meantime...

* look in `/data`. it should be fairly self explanatory how to tweak some data.
* To know more look at `/lib/reader.js` and `/lib/builder.js`.

## Tasks

### Create JSON files

```
$ tasks/create-json
```

**options**

`--outputDir={dir}`: Directory to save JSON files. Will create directory if needed. default is `.tmp`

`--inputDir={dir}`: Directory with YAML files. default is `data`

### Deploy

```
$ tasks/deploy
```

**options**

`--dir={dir}`: Folder where all the JSON files to be uploaded are

`--bucket={bucketName}`: S3 bucket to upload to

`--bucketDirectory={bucketPath}`: Path of files in the S3 bucket.

`--concurrency`: Limit ES reingest concurrency.

`--skipReingest`: Don't do the ES reingest.

### Examples

```
$ tasks/create-jsons --inputDir=data --outputDir=tmp
$ tasks/deploy --dir=tmp --bucket=my-bucket --bucketDirectory=some/path/ --skipReingest
```

This will process YAML files in `/data`, turning them into JSON files in `/tmp` and sync them all to `s3://my-bucket/some/path` -- and skip ES reingestion.

## FAQs

**Why is the data in Yaml format?**

1) So we can write comments 2) it's easier to write when making data by hand.

<!-- badge URLs -->
[circle-url]: https://circleci.com/gh/Financial-Times/next-content-patch
[circle-image]: https://circleci.com/gh/Financial-Times/next-content-patch.svg?style=svg
