import { deleteAllBills } from '../../utils/bills-utils';

describe('latest transactions editing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should create and edit income amount', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName = 'income edit test account';
    cy.get('.account-form input[placeholder="Account name"]').type(newAccName);

    cy.get('.account-form div:nth-child(2) div:nth-child(2) input').type('100');

    cy.get('button')
      .contains('Save Account')
      .click();
    cy.get('.account-widget-account__name a').should(
      'contain.text',
      newAccName
    );
    cy.get('button')
      .contains('Finish')
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

    cy.get('div.account-widget-account__balance').should('exist');
    cy.get('div.account-widget-account__balance span').contains('150,00');
    cy.get('div.account-widget-account__balance span').contains('USD');

    cy.get('div.transaction-item__edit button').click();

    cy.get('div.modal a')
      .contains('Income')
      .click();

    cy.get('div.modal form.transaction-form div:nth-child(1) input')
      .first()
      .type('{selectall}{backspace}100');

    cy.get('div.modal button')
      .contains('Save Income')
      .click();

    cy.get('div.account-widget-account__balance').should('exist');
    cy.get('div.account-widget-account__balance span').contains('200,00');
    cy.get('div.account-widget-account__balance span').contains('USD');

    cy.wait(500);
    deleteAllBills();
  });

  it('should create and edit income note', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName = 'income edit test account';
    cy.get('.account-form input[placeholder="Account name"]').type(newAccName);

    cy.get('.account-form div:nth-child(2) div:nth-child(2) input').type('100');

    cy.get('button')
      .contains('Save Account')
      .click();
    cy.get('.account-widget-account__name a').should(
      'contain.text',
      newAccName
    );
    cy.get('button')
      .contains('Finish')
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

    cy.get('div.account-widget-account__balance').should('exist');
    cy.get('div.account-widget-account__balance span').contains('150,00');
    cy.get('div.account-widget-account__balance span').contains('USD');

    cy.get('span.transaction-item__info__note')
      .contains('New note')
      .should('not.exist');

    cy.get('div.transaction-item__edit button').click();

    cy.get('div.modal a')
      .contains('Income')
      .click();

    cy.get(
      'div.modal form.transaction-form div:nth-child(2) input[placeholder="Note"]'
    ).type('{selectall}{backspace}New note');

    cy.get('div.modal button')
      .contains('Save Income')
      .click();

    cy.get('span.transaction-item__info__note')
      .contains('New note')
      .should('exist');

    cy.wait(500);
    deleteAllBills();
  });

  it('should create and edit expense amount', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName = 'expense edit test account';
    cy.get('.account-form input[placeholder="Account name"]').type(newAccName);

    cy.get('.account-form div:nth-child(2) div:nth-child(2) input').type('100');

    cy.get('button')
      .contains('Save Account')
      .click();
    cy.get('.account-widget-account__name a').should(
      'contain.text',
      newAccName
    );
    cy.get('button')
      .contains('Finish')
      .click();

    cy.get('a')
      .contains('Expense')
      .click();

    cy.get('form.transaction-form div:nth-child(1) input')
      .first()
      .type('50');

    cy.get('button')
      .contains('Add Expense')
      .click();

    cy.get('div.account-widget-account__balance').should('exist');
    cy.get('div.account-widget-account__balance span').contains('50,00');
    cy.get('div.account-widget-account__balance span').contains('USD');

    cy.get('div.transaction-item__edit button').click();

    cy.get('div.modal a')
      .contains('Expense')
      .click();

    cy.get('div.modal form.transaction-form div:nth-child(1) input')
      .first()
      .type('{selectall}{backspace}100');

    cy.get('div.modal button')
      .contains('Save Expense')
      .click();

    cy.get('div.account-widget-account__balance').should('exist');
    cy.get('div.account-widget-account__balance span').contains('0,00');
    cy.get('div.account-widget-account__balance span').contains('USD');

    cy.wait(500);
    deleteAllBills();
  });

  it('should create and edit expense date', () => {
    cy.get('.account-widget').should('not.exist');
    const newAccName = 'expense edit test account';
    cy.get('.account-form input[placeholder="Account name"]').type(newAccName);

    cy.get('.account-form div:nth-child(2) div:nth-child(2) input').type('100');

    cy.get('button')
      .contains('Save Account')
      .click();
    cy.get('.account-widget-account__name a').should(
      'contain.text',
      newAccName
    );
    cy.get('button')
      .contains('Finish')
      .click();

    cy.get('a')
      .contains('Expense')
      .click();

    cy.get('form.transaction-form div:nth-child(1) input')
      .first()
      .type('50');

    cy.get('form.transaction-form input[type="date"]').type('1999-12-31');

    cy.get('button')
      .contains('Add Expense')
      .click();

    cy.get('div.transaction-item__date')
      .contains('31 Dec')
      .should('exist');
    cy.get('div.transaction-item__date')
      .contains('1 Jan')
      .should('not.exist');

    cy.get('div.transaction-item__edit button').click();

    cy.get('div.modal a')
      .contains('Expense')
      .click();

    cy.get('div.modal form.transaction-form input[type="date"]').type(
      '2000-01-01'
    );

    cy.get('div.modal button')
      .contains('Save Expense')
      .click();

    cy.get('div.transaction-item__date')
      .contains('31 Dec')
      .should('not.exist');
    cy.get('div.transaction-item__date')
      .contains('1 Jan')
      .should('exist');

    cy.wait(500);
    deleteAllBills();
  });

  it('should create and edit transfer amount', () => {
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

    cy.get('a.item')
      .contains('Transfer')
      .click();

    cy.get('form.transaction-form div:nth-child(1) input')
      .first()
      .type('200');

    cy.get('form.transaction-form input[type="date"]').type('1999-12-31');

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
      .contains('200,00')
      .should('exist');

    cy.get(
      'div.account-widget-group div:nth-child(2) div.account-widget-account__name'
    ).should('exist');
    cy.get(
      'div.account-widget-group div:nth-child(2) div.account-widget-account__name a'
    ).contains('transfer test acc 1');

    cy.get(
      'div.account-widget-group div:nth-child(2) div.account-widget-account__balance'
    ).should('exist');
    cy.get(
      'div.account-widget-group div:nth-child(2) div.account-widget-account__balance span'
    ).contains('-100,00');
    cy.get(
      'div.account-widget-group div:nth-child(2) div.account-widget-account__balance span'
    ).contains('USD');

    cy.get(
      'div.account-widget-group div:nth-child(3) div.account-widget-account__name'
    ).should('exist');
    cy.get(
      'div.account-widget-group div:nth-child(3) div.account-widget-account__name a'
    ).contains('transfer test acc 2');

    cy.get(
      'div.account-widget-group div:nth-child(3) div.account-widget-account__balance'
    ).should('exist');
    cy.get(
      'div.account-widget-group div:nth-child(3) div.account-widget-account__balance span'
    ).contains('300,00');
    cy.get(
      'div.account-widget-group div:nth-child(3) div.account-widget-account__balance span'
    ).contains('USD');

    cy.get('div.transaction-item__edit button').click();

    cy.get('div.modal a')
      .contains('Transfer')
      .click();

    cy.get('div.modal form.transaction-form div:nth-child(1) input')
      .first()
      .type('{selectall}{backspace}100');

    cy.get('div.modal button')
      .contains('Save Transfer')
      .click();

    cy.get(
      'div.account-widget-group div:nth-child(2) div.account-widget-account__balance'
    ).should('exist');
    cy.get(
      'div.account-widget-group div:nth-child(2) div.account-widget-account__balance span'
    ).contains('0,00');
    cy.get(
      'div.account-widget-group div:nth-child(2) div.account-widget-account__balance span'
    ).contains('USD');

    cy.get(
      'div.account-widget-group div:nth-child(3) div.account-widget-account__balance'
    ).should('exist');
    cy.get(
      'div.account-widget-group div:nth-child(3) div.account-widget-account__balance span'
    ).contains('200,00');
    cy.get(
      'div.account-widget-group div:nth-child(3) div.account-widget-account__balance span'
    ).contains('USD');

    cy.wait(500);
    deleteAllBills();
  });
});
