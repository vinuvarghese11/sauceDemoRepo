const LoginPage = require('../support/pages/LoginPage');
const InventoryPage = require('../support/pages/InventoryPage');
const CartPage = require('../support/pages/CartPage');

describe('Cart Management Suite', () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login(Cypress.env('standardUser'), Cypress.env('password'));
    InventoryPage.verifyPageLoaded();
  });

  it('TC08 & TC09: Add items, verify badge count, and review cart items', () => {
    InventoryPage.addFirstAndLastItems();
    InventoryPage.getCartBadge().should('have.text', '2');
    InventoryPage.goToCart();
    CartPage.verifyPageLoaded();
    CartPage.getCartItems().should('have.length', 2);
  });

  it('TC10 & TC11: Sequential item removal in cart & continue shopping reset', () => {
    InventoryPage.addFirstAndLastItems();
    InventoryPage.goToCart();
    CartPage.getCartItems().should('have.length', 2);
    
    CartPage.removeFirstItem();
    CartPage.getCartItems().should('have.length', 1);
    CartPage.removeFirstItem();
    CartPage.getCartItems().should('not.exist');

    CartPage.clickContinueShopping();
    InventoryPage.verifyPageLoaded();
  });
});