// @ts-expect-error TS(7016): Could not find a declaration file for module 'supe... Remove this comment to see the full error message
import supertest from 'supertest';
import config from '../config/config';

const URL = config.getConfig().baseURL;

async function createBookList(userID: any, isbns: any, token = '123') {
  const result = await supertest(URL)
    .post('/BookStore/v1/Books')
    .send({
      userId: userID,
      collectionOfIsbns: isbns.map((isbn: any) => ({
        isbn
      }))
    })
    .set('Authorization', token);
  return result;
}

async function deleteBookList(userID: any, token = '123') {
  // eslint-disable-next-line prettier/prettier
  const result = await supertest(URL)
    .delete(`/BookStore/v1/Books/${userID}`)
    .set('Authorization', token);
  return result;
}

async function updateBook(userID: any, oldISBN: any, newISBN: any, token = '123') {
  const result = await supertest(URL)
    .put(`/BookStore/v1/Books/${oldISBN}`)
    .send({
      userID: userID,
      isbn: newISBN
    })
    .set('Authorization', token);
  return result;
}

async function getBook(isbn: any, token = '123') {
  // eslint-disable-next-line prettier/prettier
  const result = await supertest(URL)
    .get(`/BookStore/v1/Books/${isbn}`)
    .set('Authorization', token);
  return result;
}

async function deleteBook(userID: any, isbn: any, token = '123') {
  const result = await supertest(URL)
    .delete(`/BookStore/v1/Book`)
    .send({
      userID: userID,
      isbn: isbn
    })
    .set('Authorization', token);
  return result;
}

export default {
  createBookList,
  deleteBookList,
  updateBook,
  getBook,
  deleteBook
};
