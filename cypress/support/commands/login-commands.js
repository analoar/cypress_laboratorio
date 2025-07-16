import uiLogin from '../elements/login-elements';
import uiRegister from '../elements/register-elements';


Cypress.Commands.add('typeDataLogin', (email, password) => {
    cy.get(uiLogin.EMAIL).type(email);
    cy.get(uiLogin.PASSWORD).type(password);
    cy.wait(2000);
    cy.get(uiLogin.LOGIN_BUTTON).click({});
});

//Method to check 2 API calls available for Login
Cypress.Commands.add('checkCookieAPI', (email, password, statusCode) => {
    cy.intercept({
        method: 'POST',
        url: 'https://api.laboratoriodetesting.com/api/v1/auth/login',
    }).as('login');
    cy.intercept('POST', '/api/auth-cookie').as('cookie');
    cy.typeDataLogin(email, password)
    cy.wait('@login').then((interception) => {
    expect(interception.response.statusCode).to.eq(statusCode);})
    cy.wait('@cookie').then((interception) => {
    expect(interception.response.statusCode).to.eq(200);})
});

//Method to check only the Login API call
Cypress.Commands.add('checkLoginAPI', (email, password, statusCode) => {
    cy.intercept({
        method: 'POST',
        url: 'https://api.laboratoriodetesting.com/api/v1/auth/login',
    }).as('login');
    cy.intercept('POST', '/api/auth-cookie').as('cookie');
    cy.typeDataLogin(email, password)
    cy.wait('@login').then((interception) => {
    expect(interception.response.statusCode).to.eq(statusCode);})
});

Cypress.Commands.add('forgetPassword', (email) => {
    cy.intercept({
        method: 'POST',
        url: 'https://api.laboratoriodetesting.com/api/v1/auth/forgot-password',
    }).as('password');
    cy.get(uiLogin.MODALEMAIL).type(email),
    cy.get(uiLogin.MODALCTA).click(),
    cy.wait('@password').then((interception) => {
    expect(interception.response.statusCode).to.eq(201);})
});

Cypress.Commands.add('checkModalContent', (title, message) => {
    cy.get(uiLogin.MODAL).should('be.visible'),
    cy.get(uiLogin.MODALTITLE).contains(title),
    cy.get(uiLogin.MODALMENSAJE).contains(message)
});

//Method to check only the Login API call
Cypress.Commands.add('checkSignUpAPI', (email, name, password, statusCode) => {
    cy.intercept({
        method: 'POST',
        url: 'https://api.laboratoriodetesting.com/api/v1/auth/signup',
    }).as('register');
    cy.intercept('POST', '/api/auth-cookie').as('cookie');
    cy.typeDataSignUp(email, name, password)
    cy.wait('@register').then((interception) => {
    expect(interception.response.statusCode).to.eq(statusCode);})
});

Cypress.Commands.add('typeDataSignUp', (email, name, password) => {
    cy.get(uiRegister.EMAIL).type(email);
    cy.get(uiRegister.NAME).type(name);
    cy.get(uiRegister.PASSWORD).type(password);
    cy.get(uiRegister.REPEATPASSWORD).type(password);
    cy.get(uiRegister.SIGNUP_BUTTON).click();
});