const faker = require('faker');

const randomName = faker.name.findName();
const username = faker.name.firstName();
const randomEmail = faker.internet.email();

module.exports = {
  'Users should not be able to login with invalid details': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=signin]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Invalid username or password')
      .assert.urlContains('http://localhost:8000/signin')
      .pause(1000),

  'Users should be able to signup, signin and logout': browser =>
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .setValue('input[name=confirmpassword]', randomName)
      .setValue('input[name=email]', randomEmail)
      .click('#membership option:nth-child(2n)')
      .click('button[name=signup]')
      .waitForElementVisible('#bookList', 5000)
      .click('#logout')
      .assert.urlContains('http://localhost:8000')
      .url('http://localhost:8000/signin')
      .assert.urlContains('http://localhost:8000/signin')
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=signin]')
      .waitForElementVisible('#bookList', 5000)
      .assert.urlContains('http://localhost:8000/dashboard')
      .click('#logout')
      .pause(1000),

  'Users cannot signup with existing or invalid details': browser =>
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'babadee')
      .setValue('input[name=password]', randomName)
      .setValue('input[name=confirmpassword]', randomName)
      .setValue('input[name=email]', randomEmail)
      .click('#membership option:nth-child(2n)')
      .click('button[name=signup]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Username or email already exists')
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'ba')
      .setValue('input[name=password]', randomName)
      .setValue('input[name=confirmpassword]', randomName)
      .setValue('input[name=email]', randomEmail)
      .click('#membership option:nth-child(2n)')
      .click('button[name=signup]')
      .waitForElementVisible('.toast', 5000)
      .assert
      .containsText('.toast', 'Username cannot be less than three characters')
      .pause(1000),

  'Users should be able to borrow and return book': browser =>
    browser
      .url('http://localhost:8000/signin')
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=signin]')
      .waitForElementVisible('#bookList', 5000)
      .assert.urlContains('http://localhost:8000/dashboard')
      .click('#borrow')
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .waitForElementVisible('#bookList', 5000)
      .url('http://localhost:8000/history')
      .waitForElementVisible('#history', 5000)
      .click('#returnBook')
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .end(),

  'Users should be able to view their profile': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=signin]')
      .waitForElementVisible('#bookList', 5000)
      .url('http://localhost:8000/profile')
      .waitForElementVisible('#profile', 5000)
      .end(),

  'Users should get a not found page when wrong url is visited': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=signin]')
      .waitForElementVisible('#bookList', 5000)
      .url('http://localhost:8000/profileee')
      .waitForElementVisible('#notfound', 5000)
      .end()
};
