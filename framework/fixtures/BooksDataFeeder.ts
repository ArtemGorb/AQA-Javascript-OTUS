import {faker} from '@faker-js/faker';

function generateISBN() {
  return faker.commerce.isbn();
}

export default {
  generateISBN
};
