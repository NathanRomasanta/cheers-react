/**
 **  E2E Cypress Login Testing for Inventory System
 **
 ** TC037 - 
 **/

// TC037: Valid Login - Test Case
describe('tc037: user login tests', () => {
  
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

// TC038:	Invalid Login Attempt 
describe('tc038: user invalid login', () => {
  
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

// TC039:	Logout 
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


 
// TC055:	Email Validity 
// TC056:	Email Validity
// TC057:	Password Validity 
// TC058:	Password Validity 


	
// TC061:	Login  
// TC062:	Login Functionality   
// TC063:	Logout 
// TC064:	All pages load 
// TC065:	All buttons work 
// TC066:	Test Input Fields 
// TC067:	Test Input Fields 
// TC068:	Approve stock request from POS 
// TC069:	Reject stock request from POS 
// TC070:	Approve/Reject stock request from POS 
// TC071	Approve stock request from Inventory 
// TC072	Reject Stock request from Inventory 
// TC073	Approve/Reject stock request from Inventory 
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

