/* eslint-disable no-undef */

import {faker} from '@faker-js/faker';
import {v4 as uuid} from 'uuid';
function generateRandomUsername() {
  return faker.internet.username();
}

function generateNotExistUsername() {
  return uuid();
}

function generatePassword8() {
  const reqChars = [
    // @ts-expect-error TS(2304): Cannot find name 'specSymbol'.
    (specSymbol = faker.internet.password({length: 1, pattern: /[^"'A-Za-z0-9\\s]/})),
    // @ts-expect-error TS(2304): Cannot find name 'lowerCase'.
    (lowerCase = faker.internet.password({length: 1, pattern: /[a-z]/})),
    // @ts-expect-error TS(2304): Cannot find name 'upperCase'.
    (upperCase = faker.internet.password({length: 1, pattern: /[A-Z]/})),
    // @ts-expect-error TS(2304): Cannot find name 'digit'.
    (digit = faker.internet.password({length: 1, pattern: /[0-9]/}))
  ];
  const otherChars = faker.internet.password({length: 4});
  // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
  const password = faker.helpers.shuffle([...reqChars, ...otherChars]).join('');
  return password;
}

function generateInvalidPassword7() {
  return faker.internet.password({length: 7});
}

export default {
  generateRandomUsername,
  generateNotExistUsername,
  generatePassword8,
  generateInvalidPassword7
};
