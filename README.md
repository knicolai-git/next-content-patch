# Content Patch [![Build Status][circle-image]][circle-url]

Builds JSON and sends it to S3 so that ES-interface can patch content with
experimental data that's not yet available in CAPI.

## How to add data


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

`--bucket={bucketName}`: S3 bucket to upload to

`--bucketDirectory={bucketPath}`: Path of files in the S3 bucket.

`--concurrency`: Limit ES reingest concurrency.

`--skipReingest`: Don't do the ES reingest.

## FAQs

Why is the data in Yaml format? So we can write comments and have an easier time making the data by hand.

<!-- badge URLs -->
[circle-url]: https://circleci.com/gh/Financial-Times/next-content-patch
[circle-image]: https://circleci.com/gh/Financial-Times/next-content-patch.svg?style=svg
