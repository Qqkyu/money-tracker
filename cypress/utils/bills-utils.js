export function deleteAllBills() {
  cy.visit('http://localhost:3000/settings');
  cy.wait(1000);
  cy.get('button')
    .contains('Delete data')
    .click();
  cy.get('button')
    .contains('Confirm')
    .click();
  cy.wait(1000);
}
