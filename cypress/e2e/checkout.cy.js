import login from '../support/commands/login-commands';
import registerData from '../fixtures/data.json';
import loginElements from '../support/elements/login-elements';
import homeElements from '../support/elements/home-elements';
import checkout from '../support/commands/checkout-commands'
import checkoutElements from '../support/elements/checkout-elements';



beforeEach(() => {
  cy.visit('/auth/login'),
  cy.checkCookieAPI(registerData.user1Data[0].email,registerData.user1Data[0].password,201),
  cy.wait(2000)
});

describe('Checkout validation Scenarios', () => {
it.skip('Adding things to car | Check cart counter', function () {
    cy.get(homeElements.BANDAS).click(),
    cy.get(homeElements.CARTCOUNTER).contains('1'),
    cy.get(homeElements.BANCA).click(),
    cy.get(homeElements.CARTCOUNTER).contains('2')
  });
  it.skip('Cart drawer details', function () {
    cy.fillCart(),
    cy.get(homeElements.CART).click(),
    cy.get(homeElements.CARTMODAL).should('be.visible'),
    cy.get(homeElements.GOCHECKOUT).should('be.visible'),
    cy.get(homeElements.CARTCLEAR).should('be.visible') //the rest is tested with the visual compare
  });
  
  it.skip('Clear Cart', function () {
    cy.fillCart(),
    cy.get(homeElements.CART).click(),
    cy.get(homeElements.CARTCLEAR).click(),
    cy.checkEmptyCart()
    cy.window().its('localStorage').should('have.length', 0)
  });
  
  it.skip('Delete elements from Cart', function () {
    cy.fillCart(),
    cy.get(homeElements.CART).click(),
    cy.get(homeElements.CARTMODAL).should('be.visible'),
    cy.get(homeElements.CARTCLEAR).click()
  });
  
  it('Checkout to buy', function () {
    cy.fillCart(),
    cy.get(homeElements.CART).click(),
    cy.get(homeElements.CARTMODAL).should('be.visible'),
    cy.get(homeElements.GOCHECKOUT).click(),
    cy.get(checkoutElements.TITLE).contains('Checkout')
  });
});