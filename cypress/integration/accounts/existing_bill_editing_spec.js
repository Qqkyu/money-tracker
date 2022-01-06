import { deleteAllBills } from '../../utils/bills-utils';

describe('existing bill editing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays existing bill edition fields', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName = 'acc';
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

    cy.get('.account-widget-account__edit button').click();

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

  it('can edit existing bill', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName = 'acc';
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

    cy.get('.account-widget-account__edit button').click();

    cy.get('.account-form input[placeholder="Account name"]').type(' edited');

    cy.get('button')
      .contains('Save Account')
      .click();

    cy.get('.account-widget').should('exist');
    cy.get('.account-widget-account__name a')
      .contains('acc edited')
      .should('exist');

    cy.wait(1000);
    deleteAllBills();
  });
});
