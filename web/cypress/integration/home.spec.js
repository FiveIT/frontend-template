/// <reference types="cypress" />

describe('Home', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have "Cat Facts" as title', () => {
    cy.get('h1').contains('Cat facts')
  })
})
