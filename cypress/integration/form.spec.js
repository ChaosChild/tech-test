/// <reference types="Cypress" />

const wrongAmount = '`123.456'; // TODO: Extract to fixture.
const rightAmount = '123.45'; // TODO: Extract to fixture.

context('Form use', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/#/task');
  });

  describe('Currency form', () => {
    it('exists', () => {
      cy.get('.qa-form-currency')
        .should('be.visible')
        .should('have.descendants', '.qa-label-currency')
        .should('have.descendants', '.qa-input-currency')
        .should('have.descendants', '.qa-label-amount')
        .should('have.descendants', '.qa-input-amount')
        .should('have.descendants', '.qa-button-submit');
    });

    it('allows currency selection', () => {
      cy.wait(1000); // Wait for API call to populate store. Potentially brittle.
      cy.get('.qa-input-currency').select('GBP'); // TODO: Extract to fixture.
    });

    it('allows numerical input', () => {
      cy.get('.qa-input-amount')
        .type('123.45').should('have.value', '123.45'); // TODO: Extract to fixture.
    });

    it('validates input', () => {
      cy.get('.qa-input-amount')
        .type('abc').should('have.value', '')
        .type(wrongAmount).get('.qa-button-submit').click().get('.qa-input-amount')
        .should(($field) => {
          expect($field.get(0).checkValidity()).to.equal(false);
          expect($field.get(0).validationMessage).to.contain('Please enter a valid value.'); // TODO: Extract to fixture.
        })
        .clear()
        .type('0').get('.qa-button-submit').click().get('.qa-input-amount')
        .should(($field) => {
          expect($field.get(0).checkValidity()).to.equal(false);
          expect($field.get(0).validationMessage).to.contain('Value must be greater than or equal to 0.01.'); // TODO: Extract to fixture.
        });
    });

    it('accepts valid input', () => {
      cy.get('.qa-input-currency').select('ZAR'); // Unit currency.

      cy.get('.qa-input-amount')
        .type(rightAmount).get('.qa-button-submit').click();

      cy.get('.qa-form-submit-value')
        .should('be.visible')
        .should('contain', rightAmount);
    });
  });
});

