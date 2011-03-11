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

  username: '',
  password: '',
  rememberMe: '',
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

      // Simulate a HTTP call to check our data.
      // If the credentials not admin/admin, then get a bad url so we get 404 error
      
      // TODO: Add a call to an actual service here... Can anyone say Login/Logout Example App Part 2!?!
      var url = '/';
      if (username != 'admin' || password != 'admin') {
        throw SC.Error.desc('_InvalidCredentials'.loc());
      }

      SC.Request.getUrl(url)
        .notify(this, 'endLogin')
        .send();

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
        throw SC.Error.desc('_ServerResponseError'.loc());
      }

      // Set cookie
      var rememberMe = this.get('rememberMe');
      var authCookie = SC.Cookie.create();
      authCookie.set('name', MyApp.AUTH_COOKIE_NAME);
      authCookie.set('value', 'the token passed back in the response');
      
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
      this.set('errorMessage', e.message);
      SC.Logger.info('Error in endLogin: ' + e.message);
    }
  }

}) ;

// Constant for the name of the app's cookie
MyApp.AUTH_COOKIE_NAME = 'MyAppLoginCookie';
