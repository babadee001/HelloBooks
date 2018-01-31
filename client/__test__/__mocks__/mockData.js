const mockData = {
  authResponse: {
    currentUser: {
      username: 'babadee',
      email: 'babadee@gmail.com',
    },
    data: {
      token: process.env.userToken
    }
  },
  user: {
    password: 'test',
    username: 'tester',
    membership: 'Silver',
    email: 'babadee@gmail.com',
  },
  notifications: [
    { id: 1, message: 'Hello from the other side' }
  ],
  Dashboard: {
    props: {
      user: {
        fullName: 'Test'
      },
      actions: {
        getAllBooksActions: jest.fn()
      }
    }
  },
  bookData: {
    title: 'This is a test',
    author: 'babadee',
    isbn: 'isbn-test-book',
    cover: 'hello.jpg',
    description: 'Hello world',
    catId: 1,
    quantity: 1
  },
  modifiedBook: [{
    id: 1,
    title: 'This is a test',
    author: 'babadee',
    isbn: 'isbn-test-book',
    cover: 'hello.jpg',
    descriptions: 'Hello world',
    catId: 1,
    quantity: 1
  },
  {
    id: 2,
    title: 'This is a test',
    author: 'babadee',
    isbn: 'isbn-test-book',
    cover: 'hello.jpg',
    descriptions: 'Hello world',
    categoryId: 1,
    quantity: 1
  }],
  returnedBook: {
    count: 5,
    rows: [{
      title: 'This is a test',
      author: 'babadee',
      isbn: 'isbn-test-book',
      cover: 'hello.jpg',
      descriptions: 'Hello world',
      categoryId: 1,
      quantity: 1
    },
    {
      title: 'This is a test',
      author: 'babadee',
      isbn: 'isbn-test-book',
      cover: 'hello.jpg',
      descriptions: 'Hello world',
      categoryId: 1,
      quantity: 1
    }]
  },
  deletedBook: [{
    title: 'This is a test',
    author: 'babadee',
    isbn: 'isbn-test-book',
    cover: 'hello.jpg',
    descriptions: 'Hello world',
    categoryId: 1,
    quantity: 1
  }],
  allBorrowedBooks: [{
    count: 5,
    rows: [{
      title: 'This is a test',
      author: 'babadee',
      isbn: 'isbn-test-book',
      cover: 'hello.jpg',
      descriptions: 'Hello world',
      categoryId: 1,
      quantity: 1
    },
    {
      title: 'This is a test',
      author: 'babadee',
      isbn: 'isbn-test-book',
      cover: 'hello.jpg',
      descriptions: 'Hello world',
      categoryId: 1,
      quantity: 1
    }]
  }],
  data: [{
    title: test,
    author: test,
    decription: test
  }]
};

export default mockData;
