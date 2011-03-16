// ==========================================================================
// Project:   MyApp.loginController
// Copyright: ©2011 Nextfinity, LLC. This document is released under the MIT License.
// ==========================================================================
/*globals MyApp */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
MyApp.loginController = SC.ObjectController.create(
/** @scope MyApp.loginController.prototype */ {

  username: null,
  password: null,
  rememberMe: null,
  errorMessage: '',
  isLoggingIn: NO,
  
  openPanel: function() {
    var panel = MyApp.getPath('loginPage.panel');
    if(panel) {
      panel.append();
      panel.focus();
    }
  },
  
  closePanel: function() {
    // Reset properties
    this.set('username', null);
    this.set('password', null);
    this.set('errorMessage', '');
    
    var panel = MyApp.getPath('loginPage.panel');
    if(panel) {
      panel.remove();
    }
  },
  
  /**
   Start async login process

   @returns YES if async call successfully started, NO if it failed. If error, the error message
   will be placed in the 'errorMessage' property.
   */
  signin: function() {
    try {
      // Get our data from the properties using the SC 'get' methods
      // Need to do this because these properties have been bound/observed.
      var username = this.get('username');
      if (username == null || username == '') {
        throw SC.Error.desc('_UsernameRequired'.loc());
      }

      var password = this.get('password');
      if (password == null || password == '') {
        throw SC.Error.desc('_PasswordRequired'.loc());
      }

      // If we have both a username and password, tell the controller we're going to start the login process by setting this flag
      this.set('isLoggingIn', YES);

      // We know the username and password are not null at this point, so attempt to login
      var hashedPassword  = MyApp.hashPassword(password);
      var sendHash        = {};
      
      sendHash.user = username;
      sendHash.pwd  = hashedPassword;
      
      MyApp.REQUEST_POST.set('address', '/login');
      MyApp.REQUEST_POST.notify(this, 'endLogin').send(sendHash);
        
      // Clear the username and password
      this.set('username', null);
      this.set('password', null);
      this.set('errorMessage', '')
      
      return YES;
    }
    catch (e) { // If there was an error, catch and handle it
      // Set Error
      this.set('errorMessage', e.message);

      // Finish login processing
      this.set('isLoggingIn', NO);
      
      // Authentication was not sucessful!
      // Send the event authenticationFailed to the statechart 
      MyApp.statechart.sendEvent('authenticationFailed');

      return NO;
    }
  },
  
  /**
   Callback from beginLogin() after we get a response from the server to process
   the returned login info.

   @param {SC.Response} response The HTTP response
   @param {function} callback A function taking SC.Error as an input parameter. null is passed if no error.
   */
  endLogin: function(response) {
    try {
      // Flag finish login processing to unlock screen
      this.set('isLoggingIn', NO);

      // Check status
      SC.Logger.info('HTTP status code: ' + response.status);
      if (!SC.ok(response)) {
        // Error
        throw SC.Error.desc(response.getPath('rawRequest.responseText'));
      }

      // Set cookie
      var rememberMe = this.get('rememberMe');
      var authCookie = SC.Cookie.create();
      authCookie.set('name', MyApp.AUTH_COOKIE_NAME);
      authCookie.set('value', response.get('body').content);
      
      if (rememberMe == '3seconds') {
        // Cookie is saved for 3 seconds
        var d = SC.DateTime.create();
        authCookie.set('expires', d.advance({ second: 3 }));
      } else if (rememberMe == 'closeBrowser') {
        // Cookie removed when browser closed
        authCookie.set('expires', null);
      } else {
        // Cookie is saved for 1 year
        var d = SC.DateTime.create();
        authCookie.set('expires', d.advance({ year: 1 }));
      }
      // This writes the cookie to document.cookie
      authCookie.write();

      // Clear any previous error message
      this.set('errorMessage', '');

      // Authentication was sucessful!
      // Send the event authenticationSucceeded to our statechart
      MyApp.statechart.sendEvent('authenticationSucceeded');
    }
    catch (e) {
      // Authentication was not sucessful!
      this.set('errorMessage', e.message);
      SC.Logger.info('Error in endLogin: ' + e.message);
      
      MyApp.statechart.sendEvent('authenticationFailed');
    }
  },

}) ;

// Constant for the name of the app's cookie
MyApp.AUTH_COOKIE_NAME = 'MyAppLoginCookie';
