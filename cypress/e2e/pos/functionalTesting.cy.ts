/**
 **  E2E Cypress/JEST Functional Testing for POS System
 **
 **  TC026 - TC036, TC029 - TC030, TC059 - TC060
 **/

// TC026:	Button Click Test 
// !!!!!!!!!!!! RUN TEST USING JEST !!!!!!!!!!!!!

// TC027:	Input Field Validation 
describe('tc027: input field validation', () => { 

  beforeEach( () => {
    cy.visit('http://localhost:3000/admin');
  })

  // Test buttons on Inventory page
  it('passes if inventory button navigate to inventory page', () => {
    cy.contains('button', 'Inventory').click();
    cy.get('h1').should('contain', 'Items List'); // Assert page says 'Items List'
  });

  it('passes if Edit button opens modal and accepts numbers in quantity', () => {
    cy.contains('button', 'Inventory').click();
    cy.get('h1').should('contain', 'Items List'); // Assert page says 'Items List'
    cy.contains('button', 'Edit').click();
    cy.get('input[name="quantity"]').click().type('5').should('have.value', '25');
    cy.contains('button', 'Save').click();
  });

  // TC028: Invalid Input Handling
  it('tc028: passes if input field does not accept alphabetic or special characters', () => {
    cy.contains('button', 'Inventory').click();
    cy.get('h1').should('contain', 'Items List'); // Assert page says 'Items List'
    cy.contains('button', 'Edit').click();
    cy.get('input[name="quantity"]').click().type('abc!@#').should('have.value', '2');
    cy.contains('button', 'Cancel').click();
  });

});

// TC029:	Bandwidth Test 
// TC030:	Bandwidth Crash Notification 

// TC059:	Database Testing 
// TC060:	Database Testing 