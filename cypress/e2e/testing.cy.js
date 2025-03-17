
// TC001: Valid Login - Test Case
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
    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app');  
  });
});


// TC002: Invalid Login Attempt - Test Case
describe('user invalid login', () => {
  beforeEach( () => {
    cy.visit('https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/');
    cy.get('button[name="signout"]').click();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.url().should('include', '/login');
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

// TC003: Order Drink - Test Case


// TC004: Order Food - Test Case


// TC005: Credit Card Payment - Test Case (Suspended)


// TC006: Failed Credit Payment - Test Case (Suspended)


// TC007: Fast Cash Payment - Test Case


// TC008: Failed Fast Cash Payment - Test Case


// TC009: Cash Payment


// TC010: Failed Cash Payment


// TC011: Request Liquor Stock

// TC012: Failed Liquor Request Stock

// TC014: Request Food Stock

// TC015:	Request Multiple Items 

// TC016:	Failed Multi-Item Request 


// TC017:	Void Order at POS Level 


// TC018:	Void Order at Database Level 

// TC019:	Failed Order Void 


// TC020:	Logout Functionality 
// TC021:	Email Validation 
// TC022:	Invalid Email Input   
// TC023:	Password Validation 
// TC024:	Invalid Password Input 
// TC025:	Page Load Test 
// TC026:	Button Click Test 
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