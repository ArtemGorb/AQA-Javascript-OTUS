import { faker } from "@faker-js/faker";
import { v4 as uuid } from 'uuid';
function generateRandomUsername() {
  return username = faker.internet.username()
};

function generateNotExistUsername() {
  return uuid()
}

function generatePassword8() {
  const reqChars = [
  specSymbol = faker.internet.password({ length: 1, pattern: /[^"'A-Za-z0-9\\s]/}),
  lowerCase = faker.internet.password({ length: 1, pattern: /[a-z]/}),
  upperCase = faker.internet.password({ length: 1, pattern: /[A-Z]/}),
  digit = faker.internet.password({ length: 1, pattern: /[0-9]/})
  ]
  const otherChars = faker.internet.password({ length: 4} )
  const password = faker.helpers.shuffle([...reqChars, ...otherChars]).join('')
  return password
};

function generateInvalidPassword7() {
   return faker.internet.password({ length: 7} )
};

export default { 
  generateRandomUsername,
  generateNotExistUsername,
  generatePassword8, 
  generateInvalidPassword7 
}