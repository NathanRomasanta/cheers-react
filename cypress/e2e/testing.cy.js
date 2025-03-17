
// TC001: Valid Login
describe('user valid login', () => {
  
  // Reset environment before each test case
  beforeEach(() => {
    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/');
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  // Testing user login with valid credentials   
  it('passes', () => {
    cy.get('input[name="email"]').click().type('admin2@admin.com');
    cy.get('input[name="password"]').click().type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/admin');
    });
  
    it('fails', () => {
    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/admin');  
  });
});


// TC002: Invalid Login Attempt
describe('user invalid login', () => {
  forEach( () => {
    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/');
    cy.clearCookies();
    cy.clearLocalStorage();
  })

  // Testing user login with invalid credentials
  it('passes', () => {
  cy.get('input[name="email"]').click().type('user@fakeemail.com');
  cy.get('input[name="password"]').click().type('fakepassword');
  cy.get('button[type="submit"]').click();

  // Assert error message is displayed
  cy.contains('Failed to log in. Please check your credentials.').should('be.visible');
  });
});