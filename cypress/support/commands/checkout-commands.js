import uiLogin from '../elements/login-elements';
import uiHome from '../elements/home-elements';
import uiCheckout from '../elements/checkout-elements';
import data from '../../fixtures/data.json';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';




Cypress.Commands.add('fillCart', () => {
    cy.get(uiHome.BANDAS).click();
    cy.get(uiHome.BANCA).click();
    cy.get(uiHome.MANCUERNAS).click();
    cy.get(uiHome.SETPESAS).click()
});

Cypress.Commands.add('checkEmptyCart', () => {
    cy.get(uiHome.EMPTYCART).contains(data.emptyCart),
    cy.window().its('localStorage').should('have.length', 0)

});

Cypress.Commands.add('fillPaymentInfo', () => {
    const randomStreetAddress = faker.location.streetAddress();
    const randomCountry = faker.location.country();
    const randomName = faker.person.firstName();
    const randomLast = faker.person.lastName();

    cy.get(uiCheckout.NAME).type(randomName);
    cy.get(uiCheckout.LAST).type(randomLast);
    cy.get(uiCheckout.EMAIL).type(data.user1Data[0].email),
    cy.get(uiCheckout.ADDRESS).type(randomStreetAddress),
    cy.get(uiCheckout.COUNTRY).select('Colombia'),
    cy.get(uiCheckout.CARDNAME).type(`${randomName} ${randomLast}`),
    cy.get(uiCheckout.CARDNUMBER).type(data.user1Data[0].creditCard),
    cy.get(uiCheckout.CARDEXP).type(data.user1Data[0].expiration),
    cy.get(uiCheckout.CARDCVV).type(data.user1Data[0].CVV)
});

Cypress.Commands.add('checkDate', () => {
    const expectedDate = dayjs().format('D MMM, YY');
    cy.get(uiCheckout.ORDERDATE)
      .invoke('text')
      .then((dateFromUI) => {
        // Compare the text in a case-insensitive way (e.g., "jul" vs "Jul")
        expect(dateFromUI.toLowerCase()).to.equal(expectedDate.toLowerCase());
      });

})
