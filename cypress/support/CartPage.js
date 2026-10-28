class CartPage {
  verifyPageLoaded() {
    cy.url().should('include', '/cart.html');
    cy.get('.title').should('have.text', 'Your Cart');
  }

  getCartItems() {
    return cy.get('.cart_item');
  }

  removeFirstItem() {
    cy.get('.cart_item').first().find('.btn_secondary').click();
  }

  clickCheckout() {
    cy.get('#checkout').click();
  }

  clickContinueShopping() {
    cy.get('#continue-shopping').click();
  }
}

module.exports = new CartPage();