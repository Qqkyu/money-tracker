import { deleteAllBills } from '../../utils/bills-utils';

describe('transfer addition', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it("shouldn't show transfer tab when there is only one account", () => {
    cy.get('.account-widget').should('not.exist');

    cy.get('.account-form input[placeholder="Account name"]').type(
      'transfer test'
    );
    cy.get('.account-form div:nth-child(2) div:nth-child(2) input').type('100');
    cy.get('button')
      .contains('Save Account')
      .click();

    cy.get('button')
      .contains('Finish')
      .click();

    cy.visit('http://localhost:3000/transactions');
    cy.wait(1000);

    cy.get('button')
      .contains('New')
      .click();

    cy.get('a.item')
      .contains('Transfer')
      .should('not.exist');

    cy.wait(1000);
    deleteAllBills();
  });

  it('can create new transfer with provided amount and default date', () => {
    cy.get('.account-widget').should('not.exist');

    cy.get('.account-form input[placeholder="Account name"]').type(
      'transfer test acc 1'
    );
    cy.get('.account-form div:nth-child(2) div:nth-child(2) input').type('100');
    cy.get('button')
      .contains('Save Account')
      .click();

    cy.get('.account-form input[placeholder="Account name"]').type(
      'transfer test acc 2'
    );
    cy.get('.account-form div:nth-child(2) div:nth-child(2) input').type('100');
    cy.get('button')
      .contains('Save Account')
      .click();

    cy.get('button')
      .contains('Finish')
      .click();

    cy.visit('http://localhost:3000/transactions');
    cy.wait(1000);

    cy.get('button')
      .contains('New')
      .click();

    cy.get('a.item')
      .contains('Transfer')
      .click();

    cy.get('form.transaction-form div:nth-child(1) input')
      .first()
      .type('50');

    cy.get('button')
      .contains('Add Transfer')
      .click();

    cy.get('div.transaction-item__info').should('exist');
    cy.get('div.transaction-item__info')
      .contains('transfer test acc 1')
      .should('exist');
    cy.get('div.transaction-item__info')
      .contains('transfer test acc 2')
      .should('exist');

    cy.get('div.transaction-item__amount').should('exist');
    cy.get('div.transaction-item__amount')
      .contains('50,00')
      .should('exist');

    cy.wait(1000);
    deleteAllBills();
  });
});
