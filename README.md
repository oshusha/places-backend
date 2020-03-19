# Places server
version : 1.0.0
## How to develop the server

**Initialize the environment**

1\. Clone the repository:

```bash
git clone https://github.com/oshusha/places-backend.git
cd places-backend
```


2\. Install the dependencies:

```bash
npm install
```


**Launch the server**

1\. Run the development server 

In development mode with hot reload:
```bash
npm run dev
```
In production mode:
```bash
npm run start
```

2\. Open [localhost:3000](http://localhost:3000) to see the live server.



`By default, this server runs on port 3000.
To change the default port the nodejs server instance is listening on, 
simply use the .env file:`

ex:
DATABASE_URL=mongodb://127.0.0.1:27017/places

PORT=3000

[DEMO](https://oshusha.github.io/places/)


API methods:

GET /cards — get all cards

GET /cards/:cardId - get card by id

POST /cards — create cards

DELETE /cards/:cardId — delete card by id

PATCH /cards/:cardId/likes- like the card

DELETE /cards/:cardId/likes -remove like

GET /users - get all users

GET /users/:userId - get user by id

POST /users - create user

DELETE /users/:userId - delete user by id

PATCH /users/:userId - update user info

PATCH /users/:userId/avatar - update avatar




