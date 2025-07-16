import '../support/commands/login-commands';
import '../support/commands/register-commands';
import '@percy/cypress';
import 'cypress-axe';
import { faker } from '@faker-js/faker';



// import '@shelex/cypress-allure-plugin';
const  compareSnapshotCommand = require('cypress-image-diff-js/command');
compareSnapshotCommand();
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

