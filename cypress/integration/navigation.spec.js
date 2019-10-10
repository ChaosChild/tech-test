/// <reference types="Cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  })

  describe('Top navbar', () => {
    it('exists', () => {
      cy.get('.navbar').should('be.visible');
      cy.get('.navbar').should('contain', 'home');
      cy.get('.navbar').should('contain', 'about');
      cy.get('.navbar').should('contain', 'task');
    });

    it('routes correctly', () => {
      cy.get('.navbar').contains('about').click();
      cy.location('hash').should('contain', '/about');

      cy.get('.navbar').contains('task').click();
      cy.location('hash').should('contain', '/task');

      cy.get('.navbar').contains('home').click();
      cy.location('hash').should('contain', '/home');
    });
  });
})
