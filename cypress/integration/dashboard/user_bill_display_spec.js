import { deleteAllBills } from '../../utils/bills-utils';

describe('user bill display', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('can see bill along with their name and current balance', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName = 'user bill display test account';
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
    cy.get('button')
      .contains('Finish')
      .click();

    cy.get('div.account-widget-account__name').should('exist');
    cy.get('div.account-widget-account__name a').contains(newAccName);

    cy.get('div.account-widget-account__balance').should('exist');
    cy.get('div.account-widget-account__balance span').contains('999,99');
    cy.get('div.account-widget-account__balance span').contains('USD');

    cy.get('.account-widget-group')
      .find('.account-widget-account__name')
      .should('have.length', 1);

    cy.wait(500);
    deleteAllBills();
  });

  it('can see multiple bills along with their names', () => {
    cy.get('.account-widget').should('not.exist');

    cy.get('.account-form input[placeholder="Account name"]').type(
      'user bill display test account 1'
    );
    cy.get('button')
      .contains('Save Account')
      .click();

    cy.get('.account-form input[placeholder="Account name"]').type(
      'user bill display test account 2'
    );
    cy.get('button')
      .contains('Save Account')
      .click();

    cy.get('.account-widget').should('exist');
    cy.get('button')
      .contains('Finish')
      .click();

    cy.get('.account-widget-group')
      .find('.account-widget-account__name')
      .should('have.length', 2);

    cy.wait(500);
    deleteAllBills();
  });
});
