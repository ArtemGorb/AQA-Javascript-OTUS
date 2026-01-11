import { faker } from '@faker-js/faker';
import  { nameIsValid, fullTrim, getTotal } from '../../../src/app.js'

test('Name data type check. String returns true', () => {
 expect(nameIsValid('wasd')).toBeTruthy()
});

test.each([
  ['wa', true],
  ['gdssd', true],
  ['f', false]
])
('Name length check. "%s" returns %s', (name, expectedResult) => {
    expect(nameIsValid(name)).toBe(expectedResult)
});

test.each([
  ['asd', true],
  ['zsd', true],
  ['\'sd', false],
  ['{sd', false]
])
('Name valid symbols check. "%s" returns %s', (name, expectedResult) => {
    expect(nameIsValid(name)).toBe(expectedResult)
});

test.each([
  [' a s ', 'as'],
  [null, ''],
  [undefined, '']
])('Name space trimmer check. "%s" returns "%s"', (name, expectedResult) => {
    expect(fullTrim(name)).toBe(expectedResult)
});

//Best practice should be to use test.each() with multiple items, but i'm out of time :'(
test('Total calc check', () => {
  const price = faker.number.float()
  const quantity = faker.number.float()
  const discount = faker.number.float({min: 0, max: 99})
  expect(getTotal([{
    price, 
    quantity, 
    discount
  }])).toBe(price * quantity * (1 - discount / 100))
});

test.each([
  null,
  undefined,
  true,
  faker.number.bigInt(),
  faker.string.alpha(),
  {},
  []
  ])
  ('Discount is not a number exception for %s', (discount) => {
    expect(() => getTotal([{price: 10, quantity: 20}], discount)).toThrow('Скидка должна быть числом')
  })

test.each( [-0.000001, faker.number.float({min: -100000000, max: -0.000002}), 99.000001, faker.number.float({min: 99.000002, max: 100000000})] )
('Discount is out of bounds exception for %s', (discount) => {
    expect(() => getTotal([{price: 10, quantity: 20}], discount)).toThrow('Процент скидки должен быть от 0 до 99')
})