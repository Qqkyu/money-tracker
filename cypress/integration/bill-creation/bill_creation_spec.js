import { deleteAllBills } from '../../utils/bills-utils';

describe('bill creation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays bill creation fields', () => {
    cy.get('.account-form').should('exist');
    cy.get('.account-form .fields').should('exist');

    cy.get('.account-form div:nth-child(1) div:nth-child(1) label').should(
      'contain.text',
      'Name'
    );
    cy.get('.account-form div:nth-child(1) div:nth-child(2) label').should(
      'contain.text',
      'Group'
    );

    cy.get('.account-form div:nth-child(3) button').should(
      'contain.text',
      'Save Account'
    );
  });

  it('can create new account with default options', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName = 'My new account with default options';
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

    cy.wait(1000);
    deleteAllBills();
  });

  it('can create new account with additional currencies', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName = 'My new account with additional currencies';
    cy.get('.account-form input[placeholder="Account name"]').type(newAccName);

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

    cy.get('button')
      .contains('Save Account')
      .click();
    cy.get('.account-widget').should('exist');
    cy.get('.account-widget-account__name a').should(
      'contain.text',
      newAccName
    );
    cy.get('button')
      .contains('Finish')
      .click();

    cy.wait(1000);
    deleteAllBills();
  });

  it('can create new account with additional currencies and balance', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName =
      'My new account with additional currencies and non default group';
    cy.get('.account-form input[placeholder="Account name"]').type(newAccName);

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

    cy.get('.account-form div:nth-child(2) div:nth-child(2) input').type(
      '999.99'
    );

    cy.get('button')
      .contains('Save Account')
      .click();
    cy.get('.account-widget').should('exist');
    cy.get('.account-widget-account__name a').should(
      'contain.text',
      newAccName
    );
    cy.get('button')
      .contains('Finish')
      .click();

    cy.wait(1000);
    deleteAllBills();
  });
});
