class InventoryPage {
  verifyPageLoaded() {
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  }

  getInventoryItems() {
    return cy.get('.inventory_item');
  }

  sortProductsBy(optionValue) {
    cy.get('.product_sort_container').select(optionValue);
  }

  addFirstAndLastItems() {
    cy.get('.btn_inventory').first().click();
    cy.get('.btn_inventory').last().click();
  }

  addMidPriceItem() {
    cy.get('.inventory_item').eq(2).find('.btn_inventory').click();
  }

  getCartBadge() {
    return cy.get('.shopping_cart_badge');
  }

  goToCart() {
    cy.get('.shopping_cart_link').click();
  }

  openMenu() {
    cy.get('#react-burger-menu-btn').click();
  }

  clickLogout() {
    cy.get('#logout_sidebar_link').should('be.visible').click();
  }
}

module.exports = new InventoryPage();