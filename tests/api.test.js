import AccountOperator from '../framework/fixtures/AccountOperator.js';
import UserCredsFeeder from '../framework/fixtures/UserCredsFeeder.js';
import config from '../framework/config/config.js';

const username = UserCredsFeeder.generateRandomUsername();
const password = UserCredsFeeder.generatePassword8();
let userID = null;
let token = null;

describe('Создание пользователя', () => {
  it('Успешно', async () => {
    const result = await AccountOperator.createAccount(username, password);
    if (result.status == 201) {
      userID = result.body.userID;
      const creationCheckResult = await AccountOperator.getAccount(username, password, userID);
      expect(creationCheckResult.status).toBe(200);
    } else {
      console.log(result.text, username, password);
      expect(result.status).toBe(201);
    }
  });

  it('Логин уже используется', async () => {
    const result = await AccountOperator.createAccount(
      config.getConfig().alreadyInUseUsername,
      UserCredsFeeder.generatePassword8()
    );
    expect(result.status).toBe(406);
  });

  it('Невалидный пароль', async () => {
    const result = await AccountOperator.createAccount(username, UserCredsFeeder.generateInvalidPassword7());
    expect(result.status).toBe(406);
  });
});

describe('Генерация токена', () => {
  it('Успешно', async () => {
    const result = await AccountOperator.generateToken(username, password);
    token = result.token;
    expect(result.status).toBe(200);
  });

  it('Ошибка запроса: number в username', async () => {
    const result = await AccountOperator.generateToken(123, password);
    expect(result.status).toBe(400);
  });
});

describe('Авторизация пользователя', () => {
  it('Успешно', async () => {
    const result = await AccountOperator.authorizeUser(username, password);
    expect(result.status).toBe(200);
    expect(result.body).toBeTruthy();
  });

  it('Ошибка запроса: boolean в password', async () => {
    const result = await AccountOperator.authorizeUser(username, true);
    expect(result.status).toBe(400);
  });

  it('Ошибка запроса: пользователь не найден', async () => {
    const result = await AccountOperator.authorizeUser(UserCredsFeeder.generateNotExistUsername(), password);
    expect(result.status).toBe(404);
  });
});

describe('Получение информации о пользователе', () => {
  it('Успешно', async () => {
    const result = await AccountOperator.getAccount(username, password, userID);
    expect(result.status).toBe(200);
  });

  it('Удаление пользователя недостаточно прав', async () => {
    const result = await AccountOperator.getAccount(
      UserCredsFeeder.generateNotExistUsername(),
      UserCredsFeeder.generatePassword8(),
      userID
    );
    expect(result.status).toBe(401);
  });
});

describe('Удаление пользователя', () => {
  it('Успешно', async () => {
    const result = await AccountOperator.deleteAccount(username, password, userID);
    expect(result.status).toBe(200);
  });

  it('Ошибка запроса: Недостаточно прав', async () => {
    const result = await AccountOperator.deleteAccount(
      UserCredsFeeder.generateNotExistUsername(),
      UserCredsFeeder.generatePassword8(),
      userID
    );
    expect(result.status).toBe(401);
  });
});
