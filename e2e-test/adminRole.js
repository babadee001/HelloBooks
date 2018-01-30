const path = require('path');
const faker = require('faker');

const randomName = faker.name.findName();

module.exports = {
  'Admin should be able to sign in': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin1')
      .setValue('input[name=password]', 1111)
      .click('button[name=signin]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Logged In Successfully')
      .pause(1000)
      .assert.urlContains('http://localhost:8000/admin')
      .pause(1000)
      .end(),

  'Admin should be able to add a book': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin1')
      .setValue('input[name=password]', 1111)
      .click('button[name=signin]')
      .waitForElementVisible('#adminhome', 5000)
      .url('http://localhost:8000/add')
      .waitForElementVisible('#add', 5000)
      .setValue('input[name=title]', 'This is just a test')
      .setValue('.input-field textarea', 'This is just a test')
      .setValue('input[name=isbn]', 'isbn-test')
      .setValue('input[name=author]', 'babadee')
      .click('#catId option:nth-child(2n)')
      .setValue('input[name=quantity]', 6)
      .setValue('input[type=file]', path.resolve('../../Desktop/test.jpg'))
      .waitForElementVisible('#completed', 20000)
      .click('#addbook')
      .waitForElementVisible('.toast', 10000)
      .assert.containsText('.toast', 'Book added successfully')
      .assert.urlContains('http://localhost:8000/admin')
      .end(),

  'Admin should be able to add category': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin1')
      .setValue('input[name=password]', 1111)
      .click('button[name=signin]')
      .waitForElementVisible('#adminhome', 5000)
      .url('http://localhost:8000/logs')
      .waitForElementVisible('#logs', 5000)
      .setValue('input[name=name]', randomName)
      .setValue('.textarea textarea', 'This is just a test')
      .click('input[name=description]', 'test description')
      .pause(1000)
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Category added successfully')
      .assert.urlContains('http://localhost:8000/admin')
      .end(),

  'Admin should not be able to add book with the same isbn': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin1')
      .setValue('input[name=password]', '1111')
      .click('button[name=signin]')
      .waitForElementVisible('#adminhome', 5000)
      .url('http://localhost:8000/logs')
      .setValue('input[name=title]', 'This is just a test')
      .setValue('.textarea textarea', 'This is just a test')
      .setValue('input[name=isbn]', 'isbn-the-book')
      .setValue('input[name=author]', 'James Waldow')
      .click('#catId option:nth-child(2n)')
      .setValue('input[name=quantity]', 19)
      .click('#addbook')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Book with that ISBN already exist')
      .assert.urlContains('http://localhost:8000/admin')
      .end(),

  'Admin should be able to edit a book': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin1')
      .setValue('input[name=password]', '1111')
      .click('button[name=signin]')
      .waitForElementVisible('#adminhome', 5000)
      .click('#edit_button')
      .clearValue('input[name=title]')
      .setValue('input[name=title]', 'This book has been edited')
      .click('#submit_edit')
      .waitForElementVisible('.headcard', 5000)
      .assert.urlContains('http://localhost:8000/admin')
      .end(),

  'Admin should be able to delete a book': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin1')
      .setValue('input[name=password]', '1111')
      .click('button[name=signin]')
      .waitForElementVisible('#adminhome', 5000)
      .click('#delete_button')
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .waitForElementVisible('#headcard', 5000)
      .assert.urlContains('http://localhost:8000/admin')
      .end(),
};
