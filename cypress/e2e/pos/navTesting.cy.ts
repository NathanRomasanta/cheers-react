/**
 **  E2E Cypress Tests for Navigating POS System
 **
 **  TC025, TC064
 **/

// TC025:	Page Load Test 
describe('tc025/tc064: page load test', () => {
  
  beforeEach(() => {

    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/');

    // Checks if user is signed in and signs out if true
    cy.get('body').then(($body) => {
      if ($body.find('button[name="signout"]').length > 0) {
        // If button is found, sign out
        cy.get('button[name="signout"]').should('be.visible').click();
      }
    });
  });

  // Test if you can navigate to Inventory Page
  it('tests each button navigates to page', () => {
  
    // Sign in with valid credentials
    cy.get('input[name="email"]')
      .click()
      .type('admin2@admin.com');
    
    cy.get('input[name="password"]')
      .type('admin123')
      .blur(); // Triggers validation
    
    cy.get('button[type="submit"]').click();
    
    // Test each menu item's navigation
    const menuItems = [
      { id: 'Dashboard', path: '/dashboard/documents' },
      { id: 'Inventory', path: '/dashboard/settings' },
      { id: 'Add Inventory', path: '/dashboard/settings' },
      { id: 'Add POS Item', path: '/dashboard/settings' },
      { id: 'Orders', path: '/dashboard/settings' },
      { id: 'Cashout', path: '/dashboard/settings' },
      { id: 'Messages', path: '/dashboard/messages' },
      { id: 'Settings', path: '/dashboard/settings' },
    ];
  
    menuItems.forEach(({ id, path }) => {
      it(`navigates to ${path} when ${id} is clicked`, () => {
        // Click the menu item
        cy.contains(id).should('be.visible').click();
  
        // Verify URL has changed to the correct path
        cy.url().should('include', path);
      });
    });  
  });

});