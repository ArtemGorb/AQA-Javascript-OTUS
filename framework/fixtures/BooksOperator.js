import supertest from 'supertest';
import config from '../config/config';

const URL = config.getConfig().baseURL;

async function createBookList(userID, isbns, token = '123') {
  const result = await supertest(URL)
    .post('/BookStore/v1/Books')
    .send({
      userId: userID,
      collectionOfIsbns: isbns.map(isbn => ({isbn}))
    })
    .set('Authorization', token);
  return result;
}

async function deleteBookList(userID, token = '123') {
  // eslint-disable-next-line prettier/prettier
  const result = await supertest(URL)
    .delete(`/BookStore/v1/Books/${userID}`)
    .set('Authorization', token);
  return result;
}

async function updateBook(userID, oldISBN, newISBN, token = '123') {
  const result = await supertest(URL)
    .put(`/BookStore/v1/Books/${oldISBN}`)
    .send({
      userID: userID,
      isbn: newISBN
    })
    .set('Authorization', token);
  return result;
}

async function getBook(isbn, token = '123') {
  // eslint-disable-next-line prettier/prettier
  const result = await supertest(URL)
    .get(`/BookStore/v1/Books/${isbn}`)
    .set('Authorization', token);
  return result;
}

async function deleteBook(userID, isbn, token = '123') {
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
