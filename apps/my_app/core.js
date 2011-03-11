// ==========================================================================
// Project:   MyApp
// Copyright: ©2011 Nextfinity, LLC. This document is released under the MIT License.
// ==========================================================================
/*globals MyApp */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
SC.CONTEXT_MENU_ENABLED = NO;

MyApp = SC.Application.create(
  /** @scope MyApp.prototype */ {

  NAMESPACE: 'MyApp',
  VERSION: '0.1.2',
  
  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures),  
}) ;

MyApp.CommonLayoutMixin = {  
  layout: null,
  isVisible: YES,
  
  // Default layout values
  centerX: 0, 
  centerY: 0, 
  width: 100,
  height: 18,
  
  initMixin: function() {
    this.setLayout();
  },
  
  setLayout: function() {
    this.layout = { width: this.width, height: this.height, centerX: this.centerX, centerY: this.centerY };
  },

};

MyApp.OnlyLeftClickMixin = {
  canOnlyLeftClick: YES,
  
  handleClick: function(evt) {
    if(this.canOnlyLeftClick && evt.which !== 1) return YES;
    else return NO;
  },
  mouseDown: function(evt) {
    return this.handleClick(evt) ? YES : sc_super();
  },
  mouseUp: function(evt) {
    return this.handleClick(evt) ? YES : sc_super();
  },
};