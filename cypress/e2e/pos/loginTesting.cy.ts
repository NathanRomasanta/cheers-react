/** 
 ** E2E Cypress Testing for POS Login
 ** 
 ** TC001 - TC002, TC020 - TC024
 **/


// TC001: Valid Login - Test Case


// TC002: Invalid Login Attempt - Test Case


// TC020:	Logout Functionality 
describe('tc020: user logout functionality', () => {
  
  // Reset environment before each test case
  // Contains logout functionality
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

  it('signs the user in with valid credentials', () => {
    cy.get('input[name="email"]')
      .click()
      .type("superadmin@admin.com");
    
    cy.get('input[name="password"]')
      .click()
      .type("test123");
    
    cy.get('button[type="submit"]').click();
  });
});

// TC021:	Email Validation 
describe('tc021: email format validation', () => {
  
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

  // Testing email input with valid format
  it("passes if email contains '@' symbol", () => {
    cy.get('input[name="email"]')
      .click()
      .type('validemail@domain.com')
      .invoke('val') // Get inputs value
      .should('contain', '@'); // Assert value contains '@' symbol
  });
  it("fails if email does not contain '@ symbol'", () => {
    cy.get('input[name="email"]')
    .type('invalidemail.com')
    .invoke('val') // Get inputs value
    .should('not.contain', '@'); // Assert value does not contain '@' symbol
  });
});


// TC022:	Invalid Email Input 
describe('tc022: check invalid email format', () => {
  
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

  afterEach( () => {
    cy.get('body').then(($body) => {
      if ($body.find('button[name="signout"]').length > 0) {
        // If button is found, sign out
        cy.get('button[name="signout"]').should('be.visible').click();
      }
    })
  })

  // Testing email input with invalid format
  it("passes if message warns that email does not contain '@' symbol in it", () => {
    cy.get('input[name="email"]')
      .click()
      .type('invalidemail.com')
      .blur(); // Triggers validation
    
      // Assert that error message is displayed
      cy.get('input[name="email"]')
      .should('be.visible'); // Ensures error message is visible
  });

  it('fails if it does not display message', () => {
    cy.get('input[name="email"]')
      .type('valid@email.com') // Valid email format
      .blur(); // Triggers validation

    // Assert that no error message is displayed
    cy.get('[data-testid="email-error-message"]').should('not.exist');
  });
});
  

// TC023:	Password Validation
describe('tc023: password validation', () => {
    
  // Reset environment before each test case
  beforeEach(() => {

    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app//login');

    // Checks if user is signed in and signs out if true
    cy.get('body').then(($body) => {
      if ($body.find('button[name="signout"]').length > 0) {
        // If button is found, sign out
        cy.get('button[name="signout"]').should('be.visible').click();
      }
    });

  });
  
  // Testing password input with valid format
  it("passes if password matches with associated email", () => {
    cy.get('input[name="email"]')
      .click()
      .type('superadmin@admin.com');

    cy.get('input[name="password"]')
      .click()
      .type('test123')
      .blur(); // Triggers validation
      
    cy.get('button[type="submit"]').click();

    // Passes if redirected to admin page
    cy.url().should('include', '/admin');
  });

});

// TC024: Invalid Password Input
describe('tc024: invalid password input', () => {

  beforeEach( () => {

    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app//login');

    if (cy.url().should('include', '/admin')) {
      cy.get('button[name="signout"]').click();
    }

  });
  
  // Test when password does not match associated email
  it('passes if error message occurs when password does not match associated email', () => {
    cy.get('input[name="email"]')
      .click()
      .type('superadmin@admin.com');
    
    cy.get('input[name="password"]')
      .type('wrongpassword')
      .blur(); // Triggers validation
    
    cy.get('button[type="submit"]').click();

    // Assert error message is displayed
    cy.contains('Failed to log in. Please check your credentials.').should('be.visible');
  });
});
