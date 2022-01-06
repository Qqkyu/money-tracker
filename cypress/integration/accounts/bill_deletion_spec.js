import { deleteAllBills } from '../../utils/bills-utils';

describe('bill deletion', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays delete button in edit account modal', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName = 'acc';
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

    cy.get('div.actions button.negative').should('contain.text', 'Delete');

    cy.wait(1000);
    deleteAllBills();
  });

  it('should delete account', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName = 'acc';
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

    cy.get('div.actions button.negative')
      .contains('Delete')
      .click();

    cy.get('h3')
      .contains('You are about to delete account')
      .should('exist');
    cy.get('p')
      .contains('What should we do with transactions linked to this account?')
      .should('exist');

    cy.get('button.negative')
      .contains('Proceed')
      .click();

    cy.get('.account-widget').should('not.exist');

    cy.wait(1000);
    deleteAllBills();
  });
});
