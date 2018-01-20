[![Build Status](https://travis-ci.org/babadee001/HelloBooks.svg?branch=production-tests)](https://travis-ci.org/babadee001/HelloBooks)
[![Coverage Status](https://coveralls.io/repos/github/babadee001/HelloBooks/badge.svg?branch=staging)](https://coveralls.io/github/babadee001/HelloBooks?branch=staging)
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
* REACT: This project makes use of the REACT Javascript library to build the interface. REACT is used for building web pages that are structured as a collection of components. For more information about  See [this link](https://facebook.github.io/react/).
* ECMAScript 6: Also known as ES2015, this is a version of Javascript with
    next-generation features like arrow functions, generators, enhanced object literals,
    spread operators and more. The ES2015 is used in many areas of this project. See [this link](https://en.wikipedia.org/wiki/ECMAScript) for details.
* Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. For more information about Redux see [this link](http://redux.js.org/) for details.
* Materializecss is used to style the frontend. For more information about materializecss see [this link](http://materializecss.com/) for details.
* Webpack: Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging modules.

## API
> POST : ```/api/v1/users/signup```
API routes for users to create accounts and login to the application

> POST : ```/api/v1/users/signin (username, password)```
An API route that allow users to signin to the application

> GET : ```/api/v1/books```
An API route that allow users to get all books in the library

> PUT : /api/v1/books/<bookId>
An API route that allows admin to modify books in the library

> GET : ```/api/v1/books?returned=false```
An API route that allow users to get all the books that the user has borrowed but has not returned

> POST : ```/api/users/<userId>/books```
An API route that allow user to borrow a book

> PUT : ```/api/users/<userId>/books/<bookId>```
An API route that allow user to return a book

> DELETE : ```/api/v1/books/delete/:bookId```
An API route that allows admin to delete books

> GET : ```/api/v1/users/all```
An API route that allows admin to get all users


## How to Contribute
Contributions can be made to this project by simply following these steps:
* **Fork** the repository
* Follow [Installation and Setup](#installation) as explained earlier
* Create a branch off **staging** for the feature you wish to add
* Make neccessary changes, commit and raise a pull request against staging
**Note** when making contributions, please endevour to follow the [Airbnb](https://github.com/airbnb/javascript) javascript style guide. check out the wiki page of this project

## License
This project is authored by **Temidayo Oyedele** (temidayooyedele300@gmail.com) and is licensed for your use, modification and distribution under the **MIT** license.
[MIT][license]
<!-- Definitions -->
[license]: LICENSE
[author]: Temidayo Oyedele

### FAQs
For more details contact temidayooyedele300@gmail.com
