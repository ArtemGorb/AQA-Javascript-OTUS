import supertest from "supertest";
import config from "../config/config";

const URL = config.getConfig().baseURL

async function createAccount(username, password) {
 const result = await supertest(URL)
              .post('/Account/v1/User')
              .send({
                  "userName": username,
                  "password": password
              })
              .set("Content-type", "application/json")
  return result
};

async function getAccount(username, password, userID) {
  const result = await supertest(URL)
  .get(`/Account/v1/User/${userID}`)
  .set('Authorization', `Basic ${Buffer.from(`${username}:${password}`)}`)
  return result
};

async function deleteAccount(username, password, userID) {
  const result = await supertest(URL)
  .delete(`/Account/v1/User/${userID}`)
  .set('Authorization', `Basic ${Buffer.from(`${username}:${password}`)}`)
  return result
};

async function generateToken(username, password) {
  const result = await supertest(URL)
  .post('/Account/v1/GenerateToken')
  .send({
    "userName": username,
    "password": password
  })
  return result
};

async function authorizeUser(username, password) {
  const result = await supertest(URL)
  .post('/Account/v1/Authorized')
  .send({
    "userName": username,
    "password": password
  })
  return result
};

export default { 
  createAccount, 
  getAccount,
  deleteAccount, 
  generateToken,
  authorizeUser 
}