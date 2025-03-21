
// TC001: Valid Login - Test Case
describe('user valid login', () => {
  
  // Reset environment before each test case
  beforeEach(() => {
    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/');
  });

  // Testing user login with valid credentials   
  it('passes if user signs in with valid credentials', () => {
    cy.get('input[name="email"]').should('be.visible').click().type('admin2@admin.com');
    cy.get('input[name="password"]').should('be.visible').click().type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/admin');
    });
  
    it('fails if the system redirects back to login page after valid credentials', () => {
    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/login');  
  });
});


// TC002: Invalid Login Attempt - Test Case
describe('user invalid login', () => {
  beforeEach( () => {
    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/');
    cy.get('button[name="signout"]').should('be.visible').click();
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
  })

  // Testing user login with invalid credentials
  it('passes if error message is displayed about invalid credentials', () => {
  cy.get('input[name="email"]').click().type('user@fakeemail.com');
  cy.get('input[name="password"]').click().type('fakepassword');
  cy.get('button[type="submit"]').click();

  // Assert error message is displayed
  cy.contains('Failed to log in. Please check your credentials.').should('be.visible');
  });
});


// TC003: Order Drink - Test Case
/** FLUTTER TEST **/

// TC004: Order Food - Test Case
/** FLUTTER TEST **/

// TC005: Credit Card Payment - Test Case (Suspended)
/** FLUTTER TEST **/

// TC006: Failed Credit Payment - Test Case (Suspended)
/** FLUTTER TEST **/

// TC007: Fast Cash Payment - Test Case
/** FLUTTER TEST **/

// TC008: Failed Fast Cash Payment - Test Case
/** FLUTTER TEST **/

// TC009: Cash Payment
/** FLUTTER TEST **/

// TC010: Failed Cash Payment
/** FLUTTER TEST **/

// TC011: Request Liquor Stock
/** FLUTTER TEST **/

// TC012: Failed Liquor Request Stock
/** FLUTTER TEST **/

// TC014: Request Food Stock
/** FLUTTER TEST **/

// TC015:	Request Multiple Items 
/** FLUTTER TEST **/

// TC016:	Failed Multi-Item Request 
/** FLUTTER TEST **/

// TC017:	Void Order at POS Level 
/** FLUTTER TEST **/

// TC018:	Void Order at Database Level 


// TC019:	Failed Order Void 


// TC020:	Logout Functionality 
describe('user logout functionality', () => {
  it('logs the user out and redirects to login page', () => {
    cy.get('button[name="signout"]')
      .should('be.visible')
      .click();

    cy.get('input[name="email]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');

    cy.getAllLocalStorage().should('not.exist');
  });
});

// TC021:	Email Validation 
describe('email format validation', () => {
  
  beforeEach( () => {
    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/');
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.url()
      .should('include', '/login');
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
})


// TC022:	Invalid Email Input 
describe('check invalid email format', () => {
  beforeEach( () => {
    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/');
    cy.clearCookies();
    cy.clearLocalStorage();
  });

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
  

// TC023:	Password Validation && TC024 Invalid Password Input
describe('password validation', () => {
    
    beforeEach( () => {
      cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/');
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.url().should('include', '/login');
    });
  
    // Testing password input with valid format
    it("passes if password matches with associated email", () => {
      cy.get('input[name="email"]')
        .click()
        .type('admin2@admin.com');

      cy.get('input[name="password"]')
        .click()
        .type('admin123')
        .blur(); // Triggers validation
      
      cy.get('button[type="submit"]').click();

      // Passes if redirected to admin page
      cy.url().should('include', '/admin');

    });
    it("passes if error message occurs when password does not match associated email", () => {
      cy.get('input[name="email"]')
      .click()
      .type('admin2@gmail.com');
      
      cy.get('input[name="password"]')
      .type('wrongpassword')
      .blur(); // Triggers validation

      cy.get('button[type="submit"]').click();

      // Assert error message is displayed
      cy.contains('Failed to log in. Please check your credentials.').should('be.visible');
    });
})

// TC025:	Page Load Test 
describe('page load test', () => {
  beforeEach( () => {
    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/admin'); // Start at admin dashboard page
  });


  // Test if you can navigate to Inventory page
  it('Navigates to Inventory', () => {
    cy.get('[data-test="sidebar-inventory"]').click(); // Click on Inventory
    
    // Assert that the "Documents" section is visible
    cy.contains('h2', 'Documents').should('be.visible');
    cy.contains('Project Report').should('be.visible');
    cy.contains('Meeting Notes').should('be.visible');
  });

  // Navigate to Add Inventory page
  it('Navigates to Add Inventory', () => {
    cy.get('[data-testid="Add Inventory"]').click(); // Click on Add Inventory
    cy.get('[data-testid="mobile-menu"]').should('be.visible'); // Assert mobile menu is visible
    cy.get('h1').should('contain', 'Add Inventory'); // Assert add inventory page is loaded
  });

  // Test you can navigate to Orders page
  it('Navigates to Orders', () => {
    cy.get('[data-testid="Orders"]').click(); // Click on Orders
    cy.get('[data-testid="mobile-menu"]').should('be.visible'); // Assert mobile menu is visible
    cy.get('h1').should('contain', 'Orders'); // Assert orders page is loaded
  });

  // Test you can navigate to Cashout page
  it('Navigates to Cashout', () => {
    cy.get('[data-testid="Cashout"]').click(); // Click on Cashout
    cy.get('[data-testid="mobile-menu"]').should('be.visible'); // Assert mobile menu is visible
    cy.get('h1').should('contain', 'Cashout'); // Assert cashout page is loaded
  });

  // Test you can navigate to Messages page
  it('Navigates to Messages', () => {
    cy.get('[data-testid="Messages"]').click(); // Click on Messages
    cy.get('[data-testid="mobile-menu"]').should('be.visible'); // Assert mobile menu is visible
    cy.get('h1').should('contain', 'Messages'); // Assert messages page is loaded
  });

  // Test you can navigate to Settings page
  it('Navigates to Settings', () => {
    cy.get('[data-testid="Settings"]').click(); // Click on Settings
    cy.get('[data-testid="mobile-menu"]').should('be.visible'); // Assert mobile menu is visible
    cy.get('h1').should('contain', 'Settings'); // Assert settings page is loaded
  });
  
});


// TC026:	Button Click Test 
describe('button click test', () => {
  it('passes if all buttons are functional and clickable', () => {
    
    // Test buttons on inventory page.

  });
});

// TC027:	Input Field Validation 
// TC028:	Invalid Input Handling  
// TC029:	Bandwidth Test 
// TC030:	Bandwidth Crash Notification 
// TC031:	Order Fulfillment Notification  
// TC032:	Empty Order Prevention 
// TC033:	Database Connection Failure 
// TC034:	Database Data Retrieval 
// TC035: Item Editing 
// TC036:	Item Editing Save Validation 

// TC037:	Login 
// TC038:	Invalid Login Attempt 
// TC039:	Logout 
// TC040:	Valid Order Fulfillment 
// TC041:	Failed Order Fulfillment 
// TC042:	Test Bandwidth 
// TC043:	Test Bandwidth 
// TC044:	Test read receipt 
// TC045:	All pages load 
// TC046:	All buttons work 
// TC047:	Test Input Fields  
// TC048:	Test Input Fields 
// TC049:	Request Stock Orders 
// TC050:	Request Stock Orders 
// TC051:	Request Stock Orders 
// TC052:	Notification for Order fulfillment  
// TC053:	Notification for stock acceptance  
// TC054:	Notification for Stock Acceptance 
// TC055:	Email Validity 
// TC056:	Email Validity
// TC057:	Password Validity 
// TC058:	Password Validity 
// TC059:	Database Testing 
// TC060:	Database Testing 
	
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

