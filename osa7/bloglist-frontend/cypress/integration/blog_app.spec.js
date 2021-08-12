describe('Blog app', function (){
  beforeEach(function () {
    cy.resetDB()
    cy.createUser({
      name: 'Blog App e2e test user',
      username: 'testuser1',
      password: 'salasana'
    })
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

    describe('and several blogs exist', function () {

      beforeEach( function() {
        cy.createBlog({ title: 'title1', author: 'author1', url: 'http://localhost' })
        cy.createBlog({ title: 'title2', author: 'author2', url: 'http://localhost' })
        cy.createBlog({ title: 'title3', author: 'author3', url: 'http://localhost' })
        cy.createBlog({ title: 'title4', author: 'author4', url: 'http://localhost' })
      })

      it('one of those can be liked', function() {
        cy.contains('title2').click()
        cy.contains('like').parent().as('secondBlogLikes')
        cy.get('@secondBlogLikes').contains('0')
        cy.get('@secondBlogLikes').find('button').click()
        cy.get('@secondBlogLikes').contains('1')
      })

      it('creator of a blog can remove it', function() {
        cy.contains('title3').click()
        cy.contains('Remove').click()
        cy.get('html').should('not.contain', 'title3 author3')
      })

      it('user other than the creator of a blog can not remove it', function(){
        cy.createUser({
          name: 'User Without Blogs',
          username: 'otheruser',
          password: 'salasana'
        })
        cy.login({ username: 'otheruser', password: 'salasana' })
        cy.contains('title3').click()
        cy.get('html').contains('Remove').should('not.be.visible')
      })

      it('they are oredered based on likes', function() {
        likeBlog('title2', 3)
        likeBlog('title3', 1)
        likeBlog('title4', 2)
        cy.get('#blogs > div:nth-child(1)').contains('title2')
        cy.get('#blogs > div:nth-child(2)').contains('title4')
        cy.get('#blogs > div:nth-child(3)').contains('title3')
        cy.get('#blogs > div:nth-child(4)').contains('title1')
      })

      function likeBlog(title, times) {
        cy.contains(title).click()
        for(let i = 0; i < times; i++) {
          cy.contains('like').click()
          cy.contains('like').parent().contains(i+1)
        }
        cy.contains('blogs').click()
      }

    })
  })
})