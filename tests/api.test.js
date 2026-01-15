import { faker } from '@faker-js/faker'

const bookStoreURL = 'https://bookstore.demoqa.com'
const userName = faker.internet.username()
const password = '!' + faker.internet.password({
    length: 7,
    pattern: /\w/
}
)
const basicAuthToken = Buffer.from(`${userName}:${password}`).toString('base64')
let userId = null;

describe('Создание пользователя', () => {
    it('Успешное создание пользователя', async () => {
        const rawResult = await fetch(`${bookStoreURL}/Account/v1/User`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "userName": userName,
                "password": password
            })
        })
        if (rawResult.status == 201) {
            const result = await rawResult.json()
            userId = result.userID
            const rawCreationCheckResult = await fetch(`${bookStoreURL}/Account/v1/User/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Basic ${basicAuthToken}`
                }
            }
            )
            expect(rawCreationCheckResult.status).toBe(200)
        } else expect(false).toBeTruthy()
    });

    it('Создание пользователя c ошибкой, логин уже используется', async () => {
        const rawResult = await fetch(`${bookStoreURL}/Account/v1/User`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "userName": userName,
                "password": password
            })
        })
        expect(rawResult.status).toBe(406)
    });

    it('Создание пользователя c ошибкой, пароль не подходит', async () => {
        const rawResult = await fetch(`${bookStoreURL}/Account/v1/User`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "userName": faker.internet.username(),
                "password": faker.internet.password({ length: 7 })
            })
        })
        expect(rawResult.status).toBe(406)
    });
});

describe('Генерация токена', () => {
    it('Генерация токена успешно', async () => {
        const rawResult = await fetch(`${bookStoreURL}/Account/v1/GenerateToken`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "userName": userName,
                "password": password
            })
        })
        expect(rawResult.status).toBe(200)
    });
    
    it('Генерация токена c ошибкой', async () => {
        const rawResult = await fetch(`${bookStoreURL}/Account/v1/GenerateToken`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "useName": userName,
                "password": password
            })
        })
        expect(rawResult.status).toBe(400)
    });
});

afterAll(() => {
    fetch(`${bookStoreURL}/Account/v1/User/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            Authorization: `Basic ${basicAuthToken}`
        }
    })
});