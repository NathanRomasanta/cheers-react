/**
 **  E2E Cypress Functional Testing for Inventory System
 **
 **  TC042 - TC054
 **/

// TC042:	Test Bandwidth 
// TC043:	Test Bandwidth 
// TC044:	Test read receipt 
// TC045:	All pages load 
// TC046:	All buttons work 
// TC047:	Test Input Fields
context('tc047: test input fields', () => {

    describe('validate functionality of inventory page', () => {

        it('sign in with proper credentials', () => {
            cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/');
            cy.get('input[name="email"]').click().type('barmanager@cheers.com');
            cy.get('input[name="password"]').click().type('test123');
            cy.get('button[type="submit"]').click();
        });

        beforeEach( () => {
            cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/admin');
        })
        
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

        it('tc048: passes if quantity input field only accepts numbers', () => {
            cy.contains('button', 'Inventory').click();
            cy.get('h1').should('contain', 'Items List'); // Assert page says 'Items List'
            cy.contains('button', 'Edit').click();
            cy.get('input[name="quantity"]').click().type('abc!@#').should('have.value', '2');
            cy.contains('button', 'Cancel').click();
        });

        // TODO: Write test case for validating functionality of delete button
    });

    describe('validate functionality of add inventory page', () => {
        beforeEach( () => {
            cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/admin');
            cy.contains('button', 'Add Inventory').click();
        });

        it('passes if Add Inventory button navigates to add inventory page', () => {
            cy.get('h1').should('contain', 'Add Inventory'); // Assert page says 'Add Inventory'
        });

        it('passes if text inputs for `Item Name` and `Item Quantity` accept valid input', () => {
            cy.get('input[name="itemName"]').click().type('Test Item').should('have.value', 'Test Item');
            cy.get('input[name="itemQuantity"]').click().type('5abc!@#$').should('have.value', '5');
        });

        it('passes if `Generate Item ID` button is functional', () => {
            cy.get('button[name="generateItemID"]').click();
            cy.get('label[name="itemID"]').should('not.be.empty');
        });

        it('passes if isLiquor checkbox is functional and ouncesPerBottle input renders', () => {
            cy.get('input[name="isLiquor"]').click().should('be.checked');
            cy.contains('label', 'Ounces Per Bottle').should('be.visible');
            cy.contains('input[name="ouncesPerBottle"]').should('be.visible');
        });
    });

    // TODO: Validate functionality of Orders Page

    // TODO: Validate functionality of _____ Page

    // TODO: Validate functionality of _____ Page

});

// TC048:	Test Input Fields 
// TC049:	Request Stock Orders 
// TC050:	Request Stock Orders 
// TC051:	Request Stock Orders 
// TC052:	Notification for Order fulfillment  
// TC053:	Notification for stock acceptance  
// TC054:	Notification for Stock Acceptance