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

    cy.wait(1000);

    cy.get('.account-widget').should('exist');
    cy.get('.account-widget-account__name a').should(
      'contain.text',
      newAccName
    );

    cy.visit('http://localhost:3000/settings');
    cy.wait(1000);

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

  it('can select and change additional currencies in settings', () => {
    cy.get('label')
      .contains('Additional Currencies (optional)')
      .parent()
      .children('div')
      .children('i')
      .click();

    cy.get('div')
      .contains('Select additional currencies')
      .parent()
      .children('div')
      .last()
      .contains('PLN, Polish złoty')
      .click();

    cy.get('div')
      .contains('Additional Currencies (optional)')
      .parent()
      .children('div')
      .children('i')
      .click();

    cy.get('div')
      .contains('Select additional currencies')
      .parent()
      .children('div')
      .last()
      .contains('EUR, Euro')
      .click();

    cy.get('div.exchange-rate-table').should('exist');

    cy.wait(1000);
    deleteAllBills();
  });
});
