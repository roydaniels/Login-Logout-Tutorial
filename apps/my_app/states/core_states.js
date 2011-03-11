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

      initialSubstate: 'loggedOut',

      // State when user hasn't logged in yet
      loggedOut: SC.State.plugin('MyApp.LoggedOutState'),
    
      // State after user logs in and the application is ready to use
      loggedIn: SC.State.plugin('MyApp.LoggedInState'),

    })  
  })

});