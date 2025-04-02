/**
 **  E2E Cypress Functional Testing for Inventory System
 **
 **  TC042 - TC054, TC065 - 
 **/

// TC042:	Test Bandwidth 
    /** Manual Testing - Passed **/

// TC043:	Test Bandwidth
   /** Suspended **/

// TC044:	Test read receipt 
    /** Suspended **/


// TC046: All buttons work, TC047:Test Input Fields, TC048: Test Input Fields
// TC065: All buttons work, TC066: Test Input Fields, TC067: Test Input Fields
context('tc046 - tc048 // tc065 - tc067', () => {

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

    describe('validate functionality of add POS item page', () => {
        beforeEach( () => {
            cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/admin');
            cy.contains('button', 'Add POS Item').click();
        });

        it('passes if Add POS Item button navigates to add POS item page', () => {
            cy.get('h1').should('contain', 'Add POS Item'); // Assert page says 'Add POS Item'
        });

        it('passes if it selects a category from the dropdown', () => {
            cy.get('select[name="category"]').click().select('Beer').should('have.value', 'beer');
        });

        it('passes if navigates to add item to POS system page', () => {
            cy.get('select[name="category"]').click().select('Beer').should('have.value', 'beer');
            cy.contains('h2', 'Add Item to POS System').should('be.visible');
            cy.contains('input', 'Item Name').click().type('Test Item').should('have.value', 'Test Item');
            cy.contains('input', 'Price').click().type('5.99').should('have.value', '5.99');
            cy.contains('input', 'Oz').click().type('12').should('have.value', '12');
        });
    });

    describe('validate functionality of orders page', () => {
        beforeEach( () => {
            cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/admin');
            cy.contains('button', 'Orders').click();
        });

        it('passes if Filter dropdown is functional and navigates to orders page', () => {
            cy.get('h1').should('contain', 'Orders'); // Assert page says 'Orders'
            cy.contains('dropdown', 'Filter by Status').click().select('Pending').should('have.value', 'pending');
            cy.should('contain', 'No Orders Found for this Status'); // Assert page says 'No Orders Found for this Status'
        });
    });

    describe('validate functionality of Create New Users page', () => {
        beforeEach( () => {
            cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/admin');
            cy.contains('button', 'Create New Users').click();
        });

        it('passes if Create New Users button navigates to create new users page', () => {
            cy.get('h1').should('contain', 'Create New Users'); // Assert page says 'Create New Users'
        });

        it('passes if all text inputs accept valid input', () => {
            cy.contains('input', 'First Name').click().type('Test First Name').should('have.value', 'Test First Name');
            cy.contains('input', 'Last Name').click().type('Test Last Name').should('have.value', 'Test Last Name');
            cy.contains('input', 'Email').click().type('testemail@email.com').should('have.value', 'testemail@email.com');
            cy.contains('input', 'Temporary Password').click().type('testpassword').should('have.value', 'testpassword');
        });
    });
});

// TC049:	Request Stock Orders - Inventory users are able to submit orders for suppliers stock
    /** Suspended **/

// TC050:	Request Stock Orders - Input fields are validated for stock orders
    /** Suspended **/

// TC051:	Request Stock Orders - Notification for failed stock orders appears
    /** Suspended **/

// TC052:	Notification for Order fulfillment 
    /** Suspended **/

// TC053:	Notification for stock acceptance  
    /** Suspended **/

// TC054:	Notification for Stock Acceptance
    /** Suspended **/