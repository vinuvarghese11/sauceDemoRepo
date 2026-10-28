class CheckoutPage {
  fillCheckoutDetails(firstName, lastName, postalCode) {
    if (firstName) cy.get('#first-name').clear().type(firstName);
    if (lastName) cy.get('#last-name').clear().type(lastName);
    if (postalCode) cy.get('#postal-code').clear().type(postalCode);
    cy.get('#continue').click();
  }

  completeCheckout() {
    cy.get('#finish').click();
  }

  verifyOrderSuccess() {
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  }

  getErrorMessage() {
    return cy.get('[data-test="error"]');
  }
}

module.exports = new CheckoutPage();