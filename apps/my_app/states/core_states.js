// ==========================================================================
// Project:   MyApp
// Copyright: ©2011 Nextfinity, LLC. This document is released under the MIT License.
// ==========================================================================
/**
 * A mixin that defines all of the state transitions.
 */
sc_require('core');
sc_require('states/logged_out');
sc_require('states/logged_in');

// Overall statechart for the application
MyApp.mixin( /** @scope Tasks */ {
  
  statechart: SC.Statechart.create({

    // Set tracing on to debug statecharts if you like
    trace: NO,
  
    rootState: SC.State.design({
      
      enterState: function() {
        SC.Module.loadModule('logged_in', this, 'loggedInLoaded');
      },
      
      loggedInLoaded: function() {
        if(MyApp.loginController.get('isAuthenticated')) MyApp.statechart.gotoState('loggedIn');
      },
      
      initialSubstate: 'setup',
      
      setup: SC.State.design({
        enterState: function() {
          if(!MyApp.loginController.trySigninWithCookie()) MyApp.statechart.gotoState('loggedOut');
        },
        
        authenticationSucceeded: function() {
          // Check to see if your required module has loaded. If so, then continue. 
          // If not then we'll wait until our callback for loadModule is called to continue.
          if(SC.Module.isModuleReady('logged_in')) MyApp.statechart.gotoState('loggedIn');
        },
        authenticationFailed: function() {
          MyApp.statechart.gotoState('loggedOut.logIn.ready');
        }
      }),
      
      //initialSubstate: 'loggedOut',

      // State when user hasn't logged in yet
      loggedOut: SC.State.plugin('MyApp.LoggedOutState'),
    
      // State after user logs in and the application is ready to use
      loggedIn: SC.State.plugin('MyApp.LoggedInState'),

    })  
  })

});