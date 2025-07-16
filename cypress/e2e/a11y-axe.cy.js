import login from '../support/commands/login-commands';
import checkout from '../support/commands/checkout-commands';
import registerData from '../fixtures/data.json';
import loginElements from '../support/elements/login-elements';
import homeElements from '../support/elements/home-elements';


describe('Accessibility Tests', () => {
  it('Should have no detectable accessibility violations on the Inicio page', () => {
    cy.visit('');
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Should have no detectable accessibility violations on the Login page', () => {
    cy.visit('/auth/login');
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Should have no detectable accessibility violations on the Registro page', () => {
    cy.visit('/auth/signup');
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Should have no detectable accessibility violations on the Checkout page', () => {
    cy.visit('/auth/login');
    cy.checkCookieAPI(registerData.user1Data[0].email,registerData.user1Data[0].password,201),
    cy.get(loginElements.MICUENTA).should('be.visible');
    cy.visit('/checkout');
    cy.injectAxe();
    cy.checkA11y();
    });

    it('Compare screenshot of the Cart drawer component', () => {
    cy.visit('/auth/login');
    cy.checkCookieAPI(registerData.user1Data[0].email,registerData.user1Data[0].password,201),
    cy.get(loginElements.MICUENTA).should('be.visible');
    cy.get('[data-at="header"]').invoke('css', 'position', 'absolute');
    cy.fillCart();
    cy.get(homeElements.CART).click();
    cy.injectAxe();
    cy.checkA11y();
  });
})