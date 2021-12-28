import { deleteAllBills } from '../../utils/bills-utils';

describe('income addition', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('can create new income with provided amount and default date', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName = 'income test account';
    cy.get('.account-form input[placeholder="Account name"]').type(newAccName);

    cy.get('.account-form div:nth-child(2) div:nth-child(2) input').type('100');

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

    cy.get('div.account-widget-account__name').should('exist');
    cy.get('div.account-widget-account__name a').contains(newAccName);

    cy.get('div.account-widget-account__balance').should('exist');
    cy.get('div.account-widget-account__balance span').contains('100,00');
    cy.get('div.account-widget-account__balance span').contains('USD');

    cy.visit('http://localhost:3000/transactions');
    cy.wait(1000);

    cy.get('button')
      .contains('New')
      .click();

    cy.get('a')
      .contains('Income')
      .click();

    cy.get('form.transaction-form div:nth-child(1) input')
      .first()
      .type('50');

    cy.get('button')
      .contains('Add Income')
      .click();

    cy.get('td')
      .contains('Total income')
      .parent()
      .children('td:nth-child(2)')
      .children('span')
      .contains('50,00')
      .should('exist');
  });

  it('can create new income with provided amount and custom date', () => {
    cy.visit('http://localhost:3000/transactions');
    cy.wait(1000);

    cy.get('button')
      .contains('New')
      .click();

    cy.get('a')
      .contains('Income')
      .click();

    cy.get('form.transaction-form div:nth-child(1) input')
      .first()
      .type('50');

    cy.get('form.transaction-form input[type="date"]').type('1999-12-31');

    cy.get('button')
      .contains('Add Income')
      .click();

    cy.get('td')
      .contains('Total income')
      .parent()
      .children('td:nth-child(2)')
      .children('span')
      .contains('50,00')
      .should('exist');

    cy.wait(500);
    deleteAllBills();
  });
});
