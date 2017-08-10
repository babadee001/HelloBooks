# Hello-Books
Hello-Books is a simple RESTFUL application that helps manage a book library and its processes like updating, borrowing and adding books. The application has an admin who updates book information, add new books etc. 
Registered users can view available books, borrow books, view borrowed history and return books.

## Features
* Signup with new account.
* Signin with details.
* Add books  to library.
* View all books in library.
* Borrow and return books.


## Installation
To install this application,
1. make a new directory 
2. git clone this repository
3. Navigate to directory of cloned repo
4. Run ```npm install``` to install dependencies
5. Then run ```npm start`` to start the application
6. 'npm test' runs the tests.

## Built with
* [NodeJS](https://nodejs.org/en/) - A Javscript runtime built runtime that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJS](http://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. This is used in this application for routing to endpoints.
* [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system.
* [Sequelize](http://docs.sequelizejs.com/) - An ORM for Node.js that supports the dialects of PostgreSQL and features solid transaction support an relations.

## API
The routes currently specified in the application are as follows:

- **'/api/v1/users/signup'**
    - **POST** - Creates a new user using a  username, email and password.

- **'/api/v1/users/signin'**
    - **POST** - Allows an already existing user to sign in into the application with a username and password.


- **'api/v1/books'**
    - **POST** - Creates a new book in the library

- **'api/v1/books/:bookId'**
    - **PUT** - Enables Admin to edit or update information about a book.
- **'api/v1/books'**
    - **GET** - Retrieve all books in library