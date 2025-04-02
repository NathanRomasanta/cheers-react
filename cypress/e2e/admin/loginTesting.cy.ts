/**
 **  Admin Login Testing Page
 **
 **  TC074 - TC077
 **/

// TC074: Valid Login - Test Case, TC076: Password Validity - Correct Password
describe('tc074: email - validation // tc061: login - correct credentials', () => {
  
    // Reset environment before each test case
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
  
    // Testing user login with valid credentials   
    it('passes if user signs in with valid credentials', () => {
      cy.get('input[name="email"]').should('be.visible').click().type('superadmin@admin.com');
      cy.get('input[name="password"]').should('be.visible').click().type('test123');
      cy.get('button[type="submit"]').click();
      });
    
    it('fails if the system redirects back to login page after valid credentials', () => {
      cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/');  
      });
  });
  
  // TC075:	Invalid Login Attempt, TC077: Password Validity - incorrect password
  describe('tc038: user invalid login, tc058: password validity - incorrect password, tc062: login functionality - incorrect credentials', () => {
    
    // Reset environment before each test case
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

  
  // Testing user login with invalid credentials
  it('passes if error message is displayed about invalid credentials', () => {
    cy.get('input[name="email"]').click().type('user@fakeemail.com');
    cy.get('input[name="password"]').click().type('fakepassword');
    cy.get('button[type="submit"]').click();
  
  // Assert error message is displayed
    cy.contains('Failed to log in. Please check your credentials.').should('be.visible');
  
  });
  
  // TC039:	Logout, TC063: Logout Functionality
  describe('tc039: user logout functionality', () => {
    it('passes if user is correctly signed out and returned back to login page', () => {
      cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/');
  
      // Sign in with valid credentials
      cy.get('input[name="email"]').click().type('superadmin@admin.com');
      cy.get('input[name="password"]').click().type('test123');
      cy.get('button[type="submit"]').click();
  
      // Locates signout button and clicks it
      cy.get('button[name="signout"]').should('be.visible').click();
  
      // Asserts that user is redirected to login page
      cy.url().should('include', '/login') || 
      cy.contains('Sign in').should('be.visible');
    });
  });
  
   
  // TC055:	Email Validity - Test valid emails
  describe('tc055: email validity: valid emails', () => {
    beforeEach( () => {
      cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/');
    });
      
    // Sign in with valid credentials
    it('passes if user signs in with valid credentials', () => {
      cy.get('input[name="email"]').click().type('superadmin@admin.com');
      cy.get('input[name="password"]').click().type('test123');
      cy.get('button[type="submit"]').click();
  
      // Asserts that user is redirected to admin page
      cy.url().should('include', '/admin');
    });
  });

});
  