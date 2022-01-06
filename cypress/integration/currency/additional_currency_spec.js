import { deleteAllBills } from '../../utils/bills-utils';

describe('additional currency', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('creates a row and column for chosen currency', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName = 'exchange-rate-table-test-acc';
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

    cy.get('tr th')
      .contains('PLN')
      .should('exist');
    cy.get('tr th')
      .contains('EUR')
      .should('exist');
  });

  it('updates exchange rate table when additional currency is added', () => {
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
      .contains('RUB, Russian Rouble')
      .click();

    cy.get('tr th')
      .contains('RUB')
      .should('exist');

    cy.wait(1000);
    deleteAllBills();
  });
});
