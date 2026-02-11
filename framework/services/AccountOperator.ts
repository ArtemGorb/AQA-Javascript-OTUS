// @ts-expect-error TS(7016): Could not find a declaration file for module 'supe... Remove this comment to see the full error message
import supertest from 'supertest';
import config from '../config/config';

const URL = config.getConfig().baseURL;

async function createAccount(username: any, password: any) {
  const result = await supertest(URL)
    .post('/Account/v1/User')
    .send({
      userName: username,
      password: password
    })
    .set('Content-type', 'application/json');
  return result;
}

async function getAccount(username: any, password: any, userID: any) {
  const result = await supertest(URL)
    .get(`/Account/v1/User/${userID}`)
    .set('Authorization', `Basic ${Buffer.from(`${username}:${password}`)}`);
  return result;
}

async function deleteAccount(username: any, password: any, userID: any) {
  const result = await supertest(URL)
    .delete(`/Account/v1/User/${userID}`)
    .set('Authorization', `Basic ${Buffer.from(`${username}:${password}`)}`);
  return result;
}

async function generateToken(username: any, password: any) {
  const result = await supertest(URL).post('/Account/v1/GenerateToken').send({
    userName: username,
    password: password
  });
  return result;
}

async function authorizeUser(username: any, password: any) {
  const result = await supertest(URL).post('/Account/v1/Authorized').send({
    userName: username,
    password: password
  });
  return result;
}

export default {
  createAccount,
  getAccount,
  deleteAccount,
  generateToken,
  authorizeUser
};
