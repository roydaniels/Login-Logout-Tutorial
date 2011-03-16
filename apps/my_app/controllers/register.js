// ==========================================================================
// Project:   MyApp.registerController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals MyApp */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
MyApp.registerController = SC.ObjectController.create(
/** @scope MyApp.registerController.prototype */ {

  username: null,
  password: null,
  errorMessage: '',
  isRegistering: NO,
  
  openPanel: function() {
    var panel = MyApp.getPath('registerPage.panel');
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
    
    var panel = MyApp.getPath('registerPage.panel');
    if(panel) {
      panel.remove();
    }
  },
  
  register: function() {
    try {
      var username = this.get('username');
      if (username == null || username == '') {
        throw SC.Error.desc('_UsernameRequired'.loc());
      }

      var password = this.get('password');
      if (password == null || password == '') {
        throw SC.Error.desc('_PasswordRequired'.loc());
      }

      // If we have both a username and password, start the registration process
      this.set('isRegistering', YES);

      // We know the username and password are not null at this point, so attempt to login
      var hashedPassword  = MyApp.hashPassword(password);
      var sendHash        = {};
      
      sendHash.user = username;
      sendHash.pwd  = hashedPassword;
      
      MyApp.REQUEST_POST.set('address', '/register');
      MyApp.REQUEST_POST.notify(this, 'endRegister').send(sendHash);
        
      // Clear the username and password
      this.set('username', null);
      this.set('password', null);
      
      return YES;
    }
    catch (e) { // If there was an error, catch and handle it
      this.set('errorMessage', e.message);
      this.set('isRegistering', NO);
      
      // Registration was not sucessful!
      MyApp.statechart.sendEvent('registrationFailed');

      return NO;
    }
  },
  
  endRegister: function(response) {
    try {
      // Flag finish login processing to unlock screen
      this.set('isRegistering', NO);

      // Check status
      SC.Logger.info('HTTP status code: ' + response.status);
      if (!SC.ok(response)) {
        // Error
        throw SC.Error.desc(response.getPath('rawRequest.responseText'));
      } else {
        // Registration was sucessful!
        MyApp.statechart.sendEvent('allowLogin');
      }
    }
    catch (e) {
      // Registration was not sucessful!
      this.set('errorMessage', e.message);
      SC.Logger.info('Error in endRegister: ' + e.message);
      
      MyApp.statechart.sendEvent('registrationFailed');
    }
  },

}) ;
