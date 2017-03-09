import test from 'ava';
import {
  isUUID,
  assertUUID,
  invalidUUIDs,
  assertAllUUIDs,
  isObject,
  task
} from '../lib/utils';

function mockExit() {
  return function () {
    return 0;
  }
}

test('isUUID return true with valid string', t =>
  t.true(isUUID('aec5898e-b88c-11e6-ba85-95d1533d9a62'))
);

test('isUUID returns false with invalid string', t =>
  t.false(isUUID('11e6-ba85-95d1533d9a62'))
);

test('isUUID returns false with no args', t =>
  t.false(isUUID())
);

test('isUUID returns false with null', t =>
  t.false(isUUID(null))
);

test('assertUUID does not throw with valid string', t =>
  t.notThrows(() => assertUUID('aec5898e-b88c-11e6-ba85-95d1533d9a62'))
);

test('assertUUID throws with invalid string', t =>
  t.throws(() => assertUUID('11e6-ba85-95d1533d9a62'))
);

test('invalidUUIDs returns empty array when all valid UUIDs', t => {
  const result = invalidUUIDs([
    'c2736eba-b81e-11e6-ba85-95d1533d9a62',
    '0ddeb68e-b81f-11e6-ba85-95d1533d9a62',
    '536e6672-b81f-11e6-ba85-95d1533d9a62'
  ]);
  t.is(result.length, 0, 'no invalid IDs');
});

test('invalidUUIDs where some strings are invalid UUIDs', t => {
  const result = invalidUUIDs([
    'foo',
    '0ddeb68e-b81f-11e6-ba85-95d1533d9a62',
    '536e6672-b81f-11e6-ba85-95d1533d9a62',
    'bar',
  ]);
  t.is(result.length, 2, 'All UUIDs are invalid');
  t.deepEqual(result, ['foo', 'bar'], 'List invalid UUIDs')
});

test('invalidUUIDs where all strings are invalid UUIDs', t => {
  const result = invalidUUIDs(['foo', 'bar', 'baz']);
  t.is(result.length, 3, 'All UUIDs are invalid');
  t.deepEqual(result, ['foo', 'bar', 'baz'], 'List invalid UUIDs')
});

test('assertAllUUIDs does not throw when all UUIDs are valid', t =>
  t.notThrows(() =>
    assertAllUUIDs([
      '0ddeb68e-b81f-11e6-ba85-95d1533d9a62',
      '536e6672-b81f-11e6-ba85-95d1533d9a62',
    ])
  )
);

test('assertAllUUIDs does not throw with empty list', t =>
  t.notThrows(() => assertAllUUIDs([]))
);

test('assertAllUUIDs does not throw with no args', t =>
  t.notThrows(() => assertAllUUIDs())
);

test('assertAllUUIDs throw when some UUIDs are invalid', t =>
  t.throws(() =>
    assertAllUUIDs([
      '0ddeb68e-b81f-11e6-ba85-95d1533d9a62',
      'foo',
    ])
  )
);

test('assertAllUUIDs throw when all UUIDs are invalid', t =>
  t.throws(() =>
    assertAllUUIDs([
      'foo',
      'bar',
    ])
  )
);

test('isObject returns true with blank object', t =>
  t.true(isObject({}))
);

test('isObject returns true with basic object', t =>
  t.true(isObject({foo:'bar'}))
);

test('isObject returns true with no args', t =>
  t.false(isObject())
);

test('isObject returns true with array', t =>
  t.false(isObject([]))
);

test('isObject returns true with string', t =>
  t.false(isObject('beep bop'))
);

test('task calls function', async t => {
  const result = mockExit();
  await t.notThrows(
    task(function(){})()
  );
  t.falsy(result(), 0);
});

test('task calls async', async t => {
  const result = mockExit();
  await t.notThrows(
    task(async function(){})()
  );
  t.is(result(), 0);
});

test.skip('task exits process when function throws', async t => {
  const result = mockExit();
  function fn (){
    throw new Error('Test errror');
  }
  await t.notThrows(task(fn)());
  t.is(result(), 1);
});

test.skip('task exits process when function returns a rejected promise', async t => {
  const result = mockExit();
  function fn () {
    return Promise.reject(new Error('Test errror'));
  }
  await t.notThrows(task(fn)());
  t.is(result(), 1);
});

test.skip('task exits process when async function throws', async t => {
  const result = mockExit();
  async function fn () {
    return new Error('Test errror');
  }
  await t.notThrows(task(fn)());
  t.is(result(), 1);
});
