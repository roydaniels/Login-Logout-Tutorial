// ==========================================================================
// Project:   MyApp
// Copyright: ©2011 Nextfinity, LLC. This document is released under the MIT License.
// ==========================================================================
MyApp.LoggedInState = SC.State.extend({

  enterState: function() {
    MyApp.getPath('mainPage.mainPane').append();
  },
  
  exitState: function() {
    MyApp.getPath('mainPage.mainPane').remove();
  },
  
  signout: function() {
    // Find our cookie
    var authCookie = SC.Cookie.find(MyApp.AUTH_COOKIE_NAME);
    if (authCookie != null) {
      authCookie.destroy(); // Remove our cookie to logout
    }
    // Reset some controller properties
    MyApp.loginController.set('username', '');
    MyApp.loginController.set('password', '');

    // Go back to the login screen
    MyApp.statechart.gotoState('loggedOut.ready');
  }
  
});