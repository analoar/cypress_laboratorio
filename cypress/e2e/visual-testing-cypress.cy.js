import login from '../support/commands/login-commands';
import checkout from '../support/commands/checkout-commands';
import registerData from '../fixtures/data.json';
import loginElements from '../support/elements/login-elements';
import homeElements from '../support/elements/home-elements';


describe('Visuals', () => {
  it('Compare screenshot of the entire Inicio page', () => {
    cy.visit('');
    cy.get('[data-at="header"]').invoke('css', 'position', 'absolute');

    cy.compareSnapshot('inicio', {
        capture: 'fullPage'
    });
  });

  it('Compare screenshot of the entire Login page', () => {
    cy.visit('/auth/login');
    cy.compareSnapshot('login', {
        capture: 'fullPage'
    });
  });

  it('Compare screenshot of the entire Registro page', () => {
    cy.visit('/auth/signup');
    cy.compareSnapshot('registro', {
        capture: 'fullPage'
    });
  });
  it('Compare screenshot of the entire Checkout page', () => {
    cy.visit('/auth/login');
    cy.checkCookieAPI(registerData.user1Data[0].email,registerData.user1Data[0].password,201),
    cy.get(loginElements.MICUENTA).should('be.visible');
    cy.visit('/checkout');
    cy.get('[data-at="header"]').invoke('css', 'position', 'absolute');
    cy.compareSnapshot('checkout', {
        capture: 'fullPage'
      });
    });

    it('Compare screenshot of the Cart drawer component', () => {
    cy.visit('/auth/login');
    cy.checkCookieAPI(registerData.user1Data[0].email,registerData.user1Data[0].password,201),
    cy.get(loginElements.MICUENTA).should('be.visible');
    cy.get('[data-at="header"]').invoke('css', 'position', 'absolute');
    cy.fillCart();
    cy.get(homeElements.CART).click();
    cy.compareSnapshot('Cart', {
        capture: 'fullPage'
    });
  });
})