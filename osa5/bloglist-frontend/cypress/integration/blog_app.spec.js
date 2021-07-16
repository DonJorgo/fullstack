describe('Blog app', function (){
  this.beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username').get('#username')
    cy.contains('password').get('#password')
    cy.contains('button','login')
  })
})