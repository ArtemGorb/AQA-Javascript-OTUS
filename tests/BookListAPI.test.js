import AccountOperator from '../framework/fixtures/AccountOperator.js';
import UserCredsFeeder from '../framework/fixtures/UserCredsFeeder.js';
import config from '../framework/config/config.js';
import BooksOperator from '../framework/fixtures/BooksOperator.js';
import BooksDataFeeder from '../framework/fixtures/BooksDataFeeder.js';

let token = null;
let userID = null;

beforeAll(async () => {
  const getTokenResult = await AccountOperator.generateToken(
    config.getConfig().alwaysPresentUsername,
    config.getConfig().alwaysPresentPassword
  );
  token = `Bearer ${getTokenResult.body.token}`;
  userID = config.getConfig().alwaysPresentUserId;
});

describe('Создание листа книг', () => {
  it('Успешно', async () => {
    let isbns = [];
    for (let i = 0; i < 2; i++) {
      isbns.push(BooksDataFeeder.generateISBN());
    }
    const result = await BooksOperator.createBookList(userID, isbns, token);
    expect(result.status).toBe(201);
  });

  it('Ошибка запроса: Невалидный ISBN', async () => {
    const isbns = [UserCredsFeeder.generateRandomUsername()];
    const result = await BooksOperator.createBookList(userID, isbns, token);
    expect(result.status).toBe(400);
  });

  it('Ошибка запроса: Недостаточно прав', async () => {
    let isbns = [];
    for (let i = 0; i < 2; i++) {
      isbns.push(BooksDataFeeder.generateISBN());
    }
    const result = await BooksOperator.createBookList(userID, isbns);
    expect(result.status).toBe(401);
  });
});

describe('Обновление данных книги', () => {
  const isbns = [BooksDataFeeder.generateISBN()]
  beforeEach(async () => {
    await BooksOperator.createBookList(userID, isbns, token);
  });
  afterEach(async () => {
    await BooksOperator.deleteBookList(userID, token);
  });

  it('Успешно', async () => {
    const newISBN = BooksDataFeeder.generateISBN();
    let result = await BooksOperator.updateBook(userID, isbns, newISBN, token);
    expect(result.status).toBe(200);
    result = await BooksOperator.getBook(newISBN);
    expect(result.body.isbn).toEqual(newISBN);
  });

  it('Ошибка запроса: Невалидный ISBN', async () => {
    const invalidISBN = UserCredsFeeder.generateRandomUsername();
    let result = await BooksOperator.updateBook(userID, isbns, invalidISBN, token);
    expect(result.status).toBe(400);
  });

  it('Ошибка запроса: Недостаточно прав', async () => {
    const newISBN = BooksDataFeeder.generateISBN();
    let result = await BooksOperator.updateBook(userID, isbns, newISBN);
    expect(result.status).toBe(401);
  });
});

describe('Получение данных книги', () => {
  const isbns = [BooksDataFeeder.generateISBN()];
  beforeAll(async () => {
    await BooksOperator.createBookList(userID, isbns, token);
  });
  afterAll(async () => {
    await BooksOperator.deleteBookList(userID, token);
  });

  it('Успешно', async () => {
    let result = await BooksOperator.getBook(isbns, token);
    expect(result.status).toBe(200);
  });

  it('Ошибка запроса: Невалидный ISBN', async () => {
    const notExistISBN = BooksDataFeeder.generateISBN();
    let result = await BooksOperator.updateBook(notExistISBN, token);
    expect(result.status).toBe(400);
  });
});

describe('Удаление книги', () => {
  const isbns = [BooksDataFeeder.generateISBN()];
  beforeEach(async () => {
    await BooksOperator.createBookList(userID, isbns, token);
  });
  afterEach(async () => {
    await BooksOperator.deleteBookList(userID, token);
  });

  it('Успешно', async () => {
    let result = await BooksOperator.deleteBook(userID, isbns, token);
    expect(result.status).toBe(204);
  });

  it('Ошибка запроса: Невалидный ISBN', async () => {
    const invalidISBN = UserCredsFeeder.generateRandomUsername();
    let result = await BooksOperator.deleteBook(userID, invalidISBN, token);
    expect(result.status).toBe(400);
  });

  it('Ошибка запроса: Недостаточно прав', async () => {
    let result = await BooksOperator.deleteBook(userID, isbns);
    expect(result.status).toBe(401);
  });
});
