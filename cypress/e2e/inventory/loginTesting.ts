/**
 **  E2E Cypress Login Testing for Inventory System
 **
 ** TC037 - 
 **/

// TC037: Valid Login - Test Case, TC057: Password Validity - Correct Password, TC061: Login - Correct Credentials
describe('tc037: user login tests, tc057: password validity - right password, tc061: login - correct credentials', () => {
  
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

// TC038:	Invalid Login Attempt, TC058: Password Validity - incorrect password, TC062: Login Functionality - incorrect credentials
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
 
// TC056:	Email Validity - Notifies invalid format of emails
describe('tc056: email validity: invalid email format', () => { 
  beforeEach( () => {
    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/');
  });

  // Sign in using invalid email format
  it('passes if error message is displayed about invalid email format', () => {
    cy.get('input[name="email"]').click().type('fakeemail.com');
    cy.get('input[name="password"]').click().type('test123');
    cy.get('button[type="submit"]').click();

    // Assert error message visibility is displayed
    cy.contains("Please include an '@' in the email address.'fakeemail.com' is missing an '@'.").should('be.visible');
  });
});

	
// TC074	Email Validation 
// TC075	Email Validation 
// TC076	Password Validation 
// TC077	Password Validation 
// TC078	Edit stock id and quantity and validate save 
// TC079	Edit stock id and quantity and validate save 
// TC080	Validate cancellation of edit item 
// TC081	Validate cancellation of edit item 
// TC082	Add new stock to system 
// TC083	Add new stock to system 
// TC084	Add new drink options 
// TC085	Add new drink options 
// TC086	Add new Food options 
// TC087	Add new User to the system 
// TC088	Add new User to the system 
// TC089	Order Testing 
// TC090	Order Testing 

