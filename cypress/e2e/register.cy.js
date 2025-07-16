import login from '../support/commands/login-commands';
import registerData from '../fixtures/data.json';
import registerElements from '../support/elements/register-elements';

const random = '1' + Math.random().toString().substr(2, 4)

// The actual registration doesn't happen, so the validation of loging in with the new account was not included

beforeEach(() => {
  cy.visit('/auth/signup')
});

describe('Registration Scenarios', () => {
  it('Checking initial status for elements', function () {
    cy.get(registerElements.EMAIL).should('be.enabled'),
    cy.get(registerElements.NAME).should('be.enabled'),
    cy.get(registerElements.PASSWORD).should('be.enabled'),
    cy.get(registerElements.REPEATPASSWORD).should('be.enabled'),
    cy.get(registerElements.SIGNUP_BUTTON).should('not.be.enabled')
  });

  it('Validate mandatory fields', function () {
    cy.get(registerElements.EMAIL).type('names').clear(),
    cy.get(registerElements.NAME).type('names').clear(),
    cy.get(registerElements.PASSWORD).type('names').clear(),
    cy.get(registerElements.REPEATPASSWORD).type('names').clear(),
    cy.get(registerElements.EMAILERROR).should('be.visible').contains(registerData.registrationMandatoryMessage),
    cy.get(registerElements.NAMEERROR).should('be.visible').contains(registerData.registrationMandatoryMessage),
    cy.get(registerElements.PASSWORDERROR).should('be.visible').contains(registerData.registrationMandatoryMessage),
    cy.get(registerElements.REPEATERROR).should('be.visible').contains(registerData.registrationMandatoryMessage)
    //cy.get(registerElements.SIGNUP_BUTTON).should('not.be.enabled') => Known issue
  });
  it('Validate email field | Invalid', function () {
    cy.get(registerElements.EMAIL).type('email@'),
    cy.get(registerElements.NAME).click(),
    cy.get(registerElements.EMAILERROR).should('be.visible').contains(registerData.invalidMail)
    //cy.get(registerElements.SIGNUP_BUTTON).should('not.be.enabled') => Known issue
  });

  it('Validate password field | Minimum Characters & Different Password', function () {
    cy.get(registerElements.PASSWORD).type('pass'),
    cy.get(registerElements.REPEATPASSWORD).click(),
    cy.get(registerElements.PASSWORDERROR).should('be.visible').contains(registerData.minCharactersPassword)
    cy.get(registerElements.PASSWORD).type(registerData.userRegData[0].password),
    cy.get(registerElements.REPEATPASSWORD).type('pass'),
    cy.get(registerElements.REPEATERROR).should('be.visible').contains(registerData.differentPassword)
    //cy.get(registerElements.SIGNUP_BUTTON).should('not.be.enabled') => Known issue
  });
  
  it('Validate successful registration flow', function () {
    cy.checkSignUpAPI(
      `${registerData.userRegData[0].email} ${random} ${registerData.userRegData[0].domain}`,
      `${registerData.userRegData[0].name} ${random}`,
      registerData.userRegData[0].password,
      201);
    cy.checkModalContent(registerData.titleRegistrationModal,registerData.registrationModal)
  });

  it('Validate already registered user', function () {
    cy.checkSignUpAPI(
      registerData.user1Data[0].email,
      `${registerData.userRegData[0].name} ${random}`,
      registerData.userRegData[0].password,
      409);
    cy.checkModalContent(registerData.titleRegistrationErrorModal,registerData.registrationErrorModal)
  });
});