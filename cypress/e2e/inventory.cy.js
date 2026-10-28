const LoginPage = require('../support/pages/LoginPage');
const InventoryPage = require('../support/pages/InventoryPage');

describe('Inventory & Sorting Suite', () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login(Cypress.env('standardUser'), Cypress.env('password'));
    InventoryPage.verifyPageLoaded();
  });

  it('TC04: Sorting page basics and default checks (6 items displayed)', () => {
    InventoryPage.getInventoryItems().should('have.length', 6);
    cy.get('.product_sort_container').should('have.value', 'az');
  });

  it('TC05: Sorting validation by Name (A-Z and Z-A)', () => {
    InventoryPage.sortProductsBy('az');
    cy.get('.inventory_item_name').then($items => {
      const namesAZ = [...$items].map(el => el.innerText);
      const sortedAZ = [...namesAZ].sort();
      expect(namesAZ).to.deep.equal(sortedAZ);
    });

    InventoryPage.sortProductsBy('za');
    cy.get('.inventory_item_name').then($items => {
      const namesZA = [...$items].map(el => el.innerText);
      const sortedZA = [...namesAZ].reverse();
      expect(namesZA).to.deep.equal(sortedZA);
    });
  });

  it('TC06: Sorting validation by Price (Low to High, High to Low)', () => {
    InventoryPage.sortProductsBy('lohi');
    cy.get('.inventory_item_price').then($prices => {
      const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });

    InventoryPage.sortProductsBy('hilo');
    cy.get('.inventory_item_price').then($prices => {
      const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sortedPrices);
    });
  });

  it('TC07: Sorting dropdown defaults back on refresh', () => {
    InventoryPage.sortProductsBy('hilo');
    cy.reload();
    cy.get('.product_sort_container').should('have.value', 'az');
  });
});