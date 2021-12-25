import { deleteAllBills } from '../../utils/bills-utils';

describe('user currency modification', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('can change base currency in settings', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName = 'test-acc';
    cy.get('.account-form input[placeholder="Account name"]').type(newAccName);
    cy.get('button')
      .contains('Save Account')
      .click();
    cy.get('button')
      .contains('Finish')
      .click();

    cy.get('.account-widget').should('exist');
    cy.get('.account-widget-account__name a').should(
      'contain.text',
      newAccName
    );

    cy.visit('http://localhost:3000/settings');

    cy.get('label')
      .contains('Base Currency')
      .parent()
      .children('div')
      .children('input')
      .click();

    cy.get('div')
      .contains('PLN, Polish złoty')
      .first()
      .click();

    cy.get('label')
      .contains('Base Currency')
      .parent()
      .children('div')
      .children('input')
      .click();

    cy.get('div')
      .contains('USD, US Dollar')
      .first()
      .click();
  });

  it('can change base currency in settings', () => {
    cy.get('div')
      .contains('Select additional currencies')
      .first()
      .click();

    cy.get('div')
      .contains('Select additional currencies')
      .parent()
      .children('div')
      .last()
      .contains('PLN, Polish złoty')
      .click();

    cy.get('div')
      .contains('Select additional currencies')
      .first()
      .parent()
      .click();

    cy.get('div')
      .contains('Select additional currencies')
      .parent()
      .children('div')
      .last()
      .contains('EUR, Euro')
      .click();

    cy.get('div.exchange-rate-table').should('exist');

    cy.wait(500);
    deleteAllBills();
  });
});
