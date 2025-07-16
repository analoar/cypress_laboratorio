import login from '../support/commands/login-commands';
import registerData from '../fixtures/data.json';
import loginElements from '../support/elements/login-elements'


beforeEach(() => {
  cy.visit('/auth/login')
});

describe('Login Scenarios', () => {
  it('Checking initial status for elements', function () {
    cy.get(loginElements.EMAIL).should('be.enabled'),
    cy.get(loginElements.PASSWORD).should('be.enabled'),
    cy.get(loginElements.LOGIN_BUTTON).should('not.be.enabled')
  });
  it('Sucessfull login in with Test User ', function () {
    cy.checkCookieAPI(registerData.user1Data[0].email,registerData.user1Data[0].password,201),
    cy.get(loginElements.MICUENTA).should('be.visible'),
    cy.get(loginElements.CERRARSESION).should('be.visible')
  });
  it('Unsucessfull login', function () {
    cy.checkLoginAPI(registerData.user1Data[0].email,'wrongPass',401),
    cy.checkModalContent(registerData.errorTitleModal,registerData.errorModal)
  });

  it('Forgot password', function () {
    cy.get(loginElements.OLVIDOPASSWORD).click(),
    cy.get(loginElements.MODAL).should('be.visible'),
    cy.forgetPassword(registerData.user1Data[0].email),
    cy.wait(500),
    cy.checkModalContent(registerData.titlePasswordModal,registerData.passwordModal)
  });
});