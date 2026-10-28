const LoginPage = require('../support/pages/LoginPage');
const InventoryPage = require('../support/pages/InventoryPage');

describe('Login Feature Suite', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('TC01: Standard Sauce demo page load validation and cosmetic checks', () => {
    cy.get('#user-name').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#login-button').should('be.visible');
  });

  it('TC03: Successful Login with valid credentials', () => {
    LoginPage.login(Cypress.env('standardUser'), Cypress.env('password'));
    InventoryPage.verifyPageLoaded();
  });

  it('TC14: Logout validation from application', () => {
    LoginPage.login(Cypress.env('standardUser'), Cypress.env('password'));
    InventoryPage.verifyPageLoaded();
    InventoryPage.openMenu();
    InventoryPage.clickLogout();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  });

  it('TC15, TC16, TC17: Validate Login error for locked-out and invalid identity user attempts', () => {
    LoginPage.login(Cypress.env('lockedUser'), Cypress.env('password'));
    LoginPage.getErrorMessage().should('contain.text', 'Sorry, this user has been locked out.');
  });
});