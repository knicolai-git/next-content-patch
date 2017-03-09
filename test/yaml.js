import test from 'ava';
import yaml from '../lib/yaml';

test('read valid yaml file', t => yaml(`${__dirname}/fixtures/yaml/valid.yaml`));

test('read empty file', t => yaml(`${__dirname}/fixtures/yaml/empty.yaml`));

test('throw when reading invalid file', t => t.throws(yaml(`${__dirname}/fixtures/yaml/invalid.yaml`)));

test('throw on unknown file', t => t.throws(yaml(`${__dirname}/fixtures/no-a-file.yaml`)));
