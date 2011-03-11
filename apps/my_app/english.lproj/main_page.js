// ==========================================================================
// Project:   MyApp - mainPage
// Copyright: ©2011 Nextfinity, LLC. This document is released under the MIT License.
// ==========================================================================
/*globals MyApp */

// This page describes the main user interface for your application.  
MyApp.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    
    defaultResponder: 'MyApp.statechart',
    
    childViews: 'labelView logoutButtonView'.w(),
    
    labelView: SC.LabelView.design(MyApp.CommonLayoutMixin,{
      centerY: -20,
      textAlign: SC.ALIGN_CENTER,
      value: "You are logged in!"
    }),
    
    logoutButtonView: SC.ButtonView.design(MyApp.CommonLayoutMixin, MyApp.OnlyLeftClickMixin, {
      width: 150,
      height: 24,
      centerY: 20,
      title: 'Logout',
      action: 'signout',
    }),
  }),

});
