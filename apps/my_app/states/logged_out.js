// ==========================================================================
// Project:   MyApp
// Copyright: ©2011 Nextfinity, LLC. This document is released under the MIT License.
// ==========================================================================
MyApp.LoggedOutState = SC.State.extend({

  initialSubstate: 'ready',
  
  enterState: function() {
    MyApp.loginController.openPanel();
    MyApp.loginController.set('rememberMe', '1year');
  },
  
  exitState: function() {
    MyApp.loginController.closePanel();
  },

  // State to manage sign up or sign in
  ready: SC.State.design({
    
    signin: function() {
      MyApp.statechart.gotoState('authentication');
    }     
  }),

  // System state to manage user authentication
  authentication: SC.State.design({
    
    enterState: function() {
      MyApp.loginController.signin();
    },

    authenticationSucceeded: function() {
      MyApp.statechart.gotoState('loggedIn');
    },
          
    authenticationFailed: function() {
      MyApp.statechart.gotoState('loggedOut.ready');
    }
    
  }),
  
});