// ==========================================================================
// Project:   MyApp
// Copyright: ©2011 Nextfinity, LLC. This document is released under the MIT License.
// ==========================================================================
MyApp.LoggedOutState = SC.State.extend({

  initialSubstate: 'ready',
  
  // State to manage register or sign in
  ready: SC.State.design({
    enterState: function() {
      MyApp.loginController.openPanel();
      MyApp.loginController.set('rememberMe', '1year');
    },
    
    signin: function() {
      MyApp.statechart.gotoState('authentication');
    },     
    
    signup: function() {
      MyApp.loginController.closePanel();
      MyApp.statechart.gotoState('registration');
    },
  }),

  // System state to manage user authentication
  authentication: SC.State.design({
    
    enterState: function() {
      MyApp.loginController.signin();
    },

    authenticationSucceeded: function() {
      MyApp.loginController.closePanel();
      MyApp.statechart.gotoState('loggedIn');
    },
          
    authenticationFailed: function() {
      MyApp.statechart.gotoState('loggedOut.ready');
    }
    
  }),
  
  // System state to manage user registration
  registration: SC.State.design({
    
    enterState: function() {
      MyApp.registerController.openPanel();
    },
    
    exitState: function() {
      MyApp.registerController.closePanel();
    },
    
    startRegistration: function() {
      MyApp.registerController.register();
    },

    allowLogin: function() {
      // Allow the user to login
      MyApp.statechart.gotoState('loggedOut.ready');
    },
          
    registrationFailed: function() {
      // Stay in this state and try to register again...
      // Maybe you will want to do something else here?
    }
    
  }),
  
});