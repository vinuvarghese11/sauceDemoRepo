const LoginPage = require('../support/pages/LoginPage');
const InventoryPage = require('../support/pages/InventoryPage');
const CartPage = require('../support/pages/CartPage');
const CheckoutPage = require('../support/pages/CheckoutPage');

describe('Checkout Workflow Suite', () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login(Cypress.env('standardUser'), Cypress.env('password'));
    InventoryPage.verifyPageLoaded();
    InventoryPage.addMidPriceItem();
    InventoryPage.goToCart();
    CartPage.clickCheckout();
  });

  it('TC12: Complete successful end-to-end checkout flow', () => {
    CheckoutPage.fillCheckoutDetails('John', 'Doe', '12345');
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.summary_total_label').should('be.visible');
    CheckoutPage.completeCheckout();
    CheckoutPage.verifyOrderSuccess();
  });

  it('TC13: Parameterized validation for missing checkout fields', () => {
    // Missing all fields
    CheckoutPage.fillCheckoutDetails('', '', '');
    CheckoutPage.getErrorMessage().should('contain.text', 'First Name is required');

    // Missing Last Name
    CheckoutPage.fillCheckoutDetails('John', '', '');
    CheckoutPage.getErrorMessage().should('contain.text', 'Last Name is required');

    // Missing Postal Code
    CheckoutPage.fillCheckoutDetails('John', 'Doe', '');
    CheckoutPage.getErrorMessage().should('contain.text', 'Postal Code is required');
  });
});