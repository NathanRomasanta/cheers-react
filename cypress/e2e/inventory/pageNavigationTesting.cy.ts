/** 
 **  E2E Page Navigation Testing for Inventory System
 **
 **  TC045 : All Pages Load 
 **/

 describe('tc:045: all pages load', () => {
    
    beforeEach( () => {
        cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/admin');
    });

    // Cashout Screen Navigation
    it('passes if Cashout button navigates to Cashout page', () => {
        cy.contains('button', 'Cashout').click();
        cy.get('h1').should('contain', 'Please select a Barista and Date to view data'); // Assert page says 'Please select a Barista and Date to view data'
    });

    // Inventory Screen Navigation
    it('passes if Inventory button navigates to Inventory page', () => {
        cy.contains('button', 'Inventory').click();
        cy.get('h1').should('contain', 'Items List'); // Assert page says 'Items List'
    });

    // Add Inventory Screen Navigation
    it('passes if Add Inventory button navigates to Add Inventory page', () => {
        cy.contains('button', 'Add Inventory').click();
        cy.get('h1').should('contain', 'Add Inventory'); // Assert page says 'Add Inventory'
    });

    // Add POS Item Screen Navigation
    it('passes if Add POS Item button navigates to Add POS Item page', () => {
        cy.contains('button', 'Add POS Item').click();
        cy.get('h1').should('contain', 'Create New POS Item'); // Assert page says 'Add POS Item'
    });

    // Orders Screen Navigation
    it('passes if Orders button navigates to Orders page', () => {
        cy.contains('button', 'Orders').click();
        cy.get('h1').should('contain', 'Orders'); // Assert page says 'Orders'
    });

    // Create New Users Screen Navigation
    it('passes if Create New Users button navigates to Create New Users page', () => {
        cy.contains('button', 'Create New Users').click();
        cy.get('h1').should('contain', 'Create New Users'); // Assert page says 'Create New Users'
    });

    // Messages Screen Navigation
    it('passes if Messages button navigates to Messages page', () => {
        cy.contains('button', 'Messages').click();
        cy.should('contain', 'Messages'); // Assert page says 'Messages'
    });

    // Settings Screen Navigation
    it('passes if Settings button navigates to Settings page', () => {
        cy.contains('button', 'Settings').click();
        cy.should('contain', 'Settings'); // Assert page says 'Settings'
    });

});