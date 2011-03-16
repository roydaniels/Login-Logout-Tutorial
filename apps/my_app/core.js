// ==========================================================================
// Project:   MyApp
// Copyright: ©2011 Nextfinity, LLC. This document is released under the MIT License.
// ==========================================================================
/*globals MyApp */

/** @namespace  
  @extends SC.Object
*/
SC.CONTEXT_MENU_ENABLED = NO;

MyApp = SC.Application.create({
  hashPassword: function(password) {
    return (password ? SHA256(password) : '');
  },
}) ;

MyApp.REQUEST_POST = SC.Request.create({ type: 'POST', isJSON: YES })
  .header(MyApp.HEADER_CONTENT_TYPE, MyApp.HEADER_VALUE_CONTENT_TYPE)
  .header(MyApp.HEADER_ACCEPT, MyApp.HEADER_VALUE_ACCEPT);

MyApp.HEADER_CONTENT_TYPE = 'Content-Type';
MyApp.HEADER_VALUE_CONTENT_TYPE = 'application/json';
MyApp.HEADER_ACCEPT = 'Accept';
MyApp.HEADER_VALUE_ACCEPT = 'application/json';

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