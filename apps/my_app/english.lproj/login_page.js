// ==========================================================================
// Project:   MyApp.loginPage
// Copyright: ©2011 Nextfinity, LLC. This document is released under the MIT License.
// ==========================================================================
/*globals MyApp */

// This page describes a part of the interface for your application.
MyApp.loginPage = SC.Page.design({

  panel: SC.PanelPane.design({
  
    defaultResponder: 'MyApp.statechart',

    layout: { width: 360, height: 160, centerX: 0, centerY: 0 },
    classNames: ['login-pane'],
    contentView: SC.View.design({
      childViews: 'username password rememberMe loginButton loadingImage errorMessage'.w(),

      username: SC.View.design({
        layout: { left: 17, right: 14, top: 17, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 107, height: 18, centerY: 0 },

          value: '_Username'.loc(),
          localize: YES,
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 200, height: 18, right: 3, centerY: 0 },
          
          hint: '_LoginNameHint'.loc(),
          isEnabledBinding: SC.Binding.from("MyApp.loginController.isLoggingIn").bool().not(),
          valueBinding: 'MyApp.loginController.username'
        })
      }),

      password: SC.View.design({
        layout: { left: 17, right: 14, top: 45, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 107, height: 18, centerY: 0 },

          value: '_Password'.loc(),
          localize: YES,
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 200, height: 18, right: 3, centerY: 0 },

          isPassword: YES,
          hint: '_PasswordHint'.loc(),
          isEnabledBinding: SC.Binding.from("MyApp.loginController.isLoggingIn").bool().not(),
          valueBinding: 'MyApp.loginController.password'
        })
      }),

      rememberMe: SC.View.design({
        layout: { left: 17, right: 14, top: 76, height: 24 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 107, height: 18, centerY: 0 },

          value: '_RememberMe'.loc(),
          localize: YES,
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.SelectButtonView.design({
          layout: { width: 228, height: 24, right: 3, centerY: 0 },

          objects: [
            {name:'For 3 Seconds', value:'3seconds'},
            {name:'Until the browser is closed', value:'closeBrowser'},
            {name:'For 1 year', value:'1year'}
            ],
          nameKey: 'name',
          valueKey: 'value',

          isEnabledBinding: SC.Binding.from("MyApp.loginController.isLoggingIn").bool().not(),
          valueBinding: 'MyApp.loginController.rememberMe'
        })
      }),

      loginButton: SC.ButtonView.design({
        layout: { height: 24, width: 80, bottom: 17, right: 17 },
        title: '_Login'.loc() + '...',
        isDefault: YES,
        isEnabledBinding: SC.Binding.from("MyApp.loginController.isLoggingIn").bool().not(),

        action: 'signin'
      }),

      loadingImage: SC.ImageView.design({
        layout: { width: 16, height: 16, bottom: 20, right: 110 },
        value: sc_static('images/loading'),
        useImageQueue: NO,
        isVisibleBinding: 'MyApp.loginController.isLoggingIn'
      }),

      errorMessage: SC.LabelView.design({
        layout: { height: 40, width: 230, right: 120, bottom: 7 },
        classNames: ['error-message'],

        valueBinding: 'MyApp.loginController.errorMessage'
      })

    }),  //contentView
    
    focus: function() {
      this.getPath('contentView.username.field').becomeFirstResponder();        
    }
    
  })

});
