class LoginPage {
  visit() {
    cy.visit('/');
  }

  fillUsername(username) {
    cy.get('#user-name').should('be.visible').clear().type(username);
  }

  fillPassword(password) {
    cy.get('#password').should('be.visible').clear().type(password);
  }

  clickLogin() {
    cy.get('#login-button').should('be.visible').click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
  }

  getErrorMessage() {
    return cy.get('[data-test="error"]');
  }
}

module.exports = new LoginPage();