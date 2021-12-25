describe('display currency exchange table', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays currency exchange table when creating new account with additional currencies', () => {
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
  });

  it("doesn't display currency exchange table when creating new account without additional currencies", () => {
    cy.get('a[value="PLN"] i.delete.icon').click();
    cy.get('a[value="EUR"] i.delete.icon').click();

    cy.get('div.exchange-rate-table').should('not.exist');
  });
});
