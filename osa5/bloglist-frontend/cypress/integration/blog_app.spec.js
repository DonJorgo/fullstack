describe('Blog app', function (){
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Blog App e2e test user',
      username: 'testuser1',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username').get('#username')
    cy.contains('password').get('#password')
    cy.contains('button','login')
  })

  describe('Login', function(){
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('testuser1')
      cy.get('#password').type('salasana')
      cy.contains('button', 'login').click()

      cy.contains('Blog App e2e test user logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser1')
      cy.get('#password').type('wrongpassword')
      cy.contains('button', 'login').click()

      cy.contains('invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.contains('Log in to application')
      cy.contains('username').get('#username')
      cy.contains('password').get('#password')
      cy.contains('button','login')

      cy.get('html')
        .should('not.contain', 'Blog App e2e test user logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser1', password: 'salasana' })
    })

    it('A blog can be created', function() {
      cy.contains('button', 'create new blog').click()
      cy.contains('title:').find('input').type('Blog Title')
      cy.contains('author:').find('input').type('Blog Author')
      cy.contains('url:').find('input').type('http://localhost')
      cy.get('#submitNewBlog').click()

      cy.contains('a new blog Blog Title by Blog Author added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.get('html')
        .should('contain', 'Blog Title Blog Author')
    })
  })
})