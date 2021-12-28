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

    cy.get('a.item')
      .contains('Transfer')
      .should('not.exist');

    cy.wait(500);
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
    ).contains('50,00');
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
    ).contains('150,00');
    cy.get(
      'div.account-widget-group div:nth-child(3) div.account-widget-account__balance span'
    ).contains('USD');

    cy.wait(500);
    deleteAllBills();
  });

  it('can create new transfer with provided amount and custom date', () => {
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

    cy.wait(500);
    deleteAllBills();
  });

  it('can switch accounts when creating transfer', () => {
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

    cy.get('form.transaction-form i.dropdown.icon')
      .first()
      .click();
    cy.get('form.transaction-form div.visible.dropdown div')
      .contains('transfer test acc 2')
      .click();

    cy.get('form.transaction-form i.dropdown.icon')
      .last()
      .click();
    cy.get('form.transaction-form div.visible.dropdown div')
      .contains('transfer test acc 1')
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
    ).contains('150,00');
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
    ).contains('50,00');
    cy.get(
      'div.account-widget-group div:nth-child(3) div.account-widget-account__balance span'
    ).contains('USD');

    cy.wait(500);
    deleteAllBills();
  });

  it('can create new transfer with provided amount and note', () => {
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
      .type('50');

    cy.get('div.transaction-form-grid__field input[placeholder="Note"]').type(
      'transfer with note test'
    );

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

    cy.get('span.transaction-item__info__note').should('exist');
    cy.get('span.transaction-item__info__note')
      .contains('transfer with note test')
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
    ).contains('50,00');
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
    ).contains('150,00');
    cy.get(
      'div.account-widget-group div:nth-child(3) div.account-widget-account__balance span'
    ).contains('USD');

    cy.wait(500);
    deleteAllBills();
  });
});
