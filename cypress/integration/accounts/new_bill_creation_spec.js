import { deleteAllBills } from '../../utils/bills-utils';

describe('new bill creation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays bill creation fields', () => {
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

    cy.visit('http://localhost:3000/accounts');
    cy.wait(1000);

    cy.get('button')
      .contains('New')
      .click();

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

    cy.wait(1000);
    deleteAllBills();
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

    cy.visit('http://localhost:3000/accounts');
    cy.wait(1000);

    cy.get('button')
      .contains('New')
      .click();

    cy.get('.account-form input[placeholder="Account name"]').type(
      'new acc in new acc'
    );
    cy.get('button')
      .contains('Save Account')
      .click();

    cy.get('.account-widget').should('exist');
    cy.get('.account-widget-account__name a')
      .contains('new acc in new acc')
      .should('exist');

    cy.wait(1000);
    deleteAllBills();
  });

  it('can create new account with balance', () => {
    cy.get('.account-widget').should('not.exist');
    cy.get('.account-form input[placeholder="Account name"]').type('test-acc');
    cy.get('button')
      .contains('Save Account')
      .click();
    cy.get('button')
      .contains('Finish')
      .click();

    cy.get('.account-widget').should('exist');
    cy.get('.account-widget-account__name a').should(
      'contain.text',
      'test-acc'
    );

    cy.visit('http://localhost:3000/accounts');
    cy.wait(1000);

    cy.get('button')
      .contains('New')
      .click();

    const newAccName = 'My new account with additional currencies';
    cy.get('.account-form input[placeholder="Account name"]').type(newAccName);

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

    cy.wait(1000);
    deleteAllBills();
  });
});
