import uiLogin from '../elements/login-elements';
import uiHome from '../elements/home-elements';
import data from '../../fixtures/data.json';


Cypress.Commands.add('fillCart', () => {
    cy.get(uiHome.BANDAS).click();
    cy.get(uiHome.BANCA).click();
    cy.get(uiHome.MANCUERNAS).click();
    cy.get(uiHome.SETPESAS).click()
});

Cypress.Commands.add('checkEmptyCart', () => {
    cy.get(uiHome.EMPTYCART).contains(data.emptyCart)
});
