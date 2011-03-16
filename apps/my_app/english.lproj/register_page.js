// ==========================================================================
// Project:   MyApp.registerPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals MyApp */

// This page describes a part of the interface for your application.
MyApp.registerPage = SC.Page.design({

  panel: SC.PanelPane.design({
  
    defaultResponder: 'MyApp.statechart',

    layout: { width: 360, height: 201, centerX: 0, centerY: 0 },
    classNames: ['register-pane'],
    contentView: SC.View.design({
      childViews: 'title username password registerButton cancelButton errorMessage'.w(),

      title: SC.LabelView.design({
        layout: { left: 10, right: 10, top: 17, height: 26 },
        value: '_RegisterTitle'.loc(),
        localized: YES,
        textAlign: SC.ALIGN_CENTER,
      }),
      
      username: SC.View.design({
        layout: { left: 17, right: 14, top: 53, height: 26 },
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
          isEnabledBinding: SC.Binding.from("MyApp.registerController.isRegistering").bool().not(),
          valueBinding: 'MyApp.registerController.username'
        })
      }),

      password: SC.View.design({
        layout: { left: 17, right: 14, top: 81, height: 26 },
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
          isEnabledBinding: SC.Binding.from("MyApp.registerController.isRegistering").bool().not(),
          valueBinding: 'MyApp.registerController.password'
        })
      }),

      registerButton: SC.ButtonView.design({
        layout: { height: 24, width: 80, bottom: 51, right: 17 },
        title: '_SignUp'.loc() + '...',
        isDefault: YES,
        isEnabledBinding: SC.Binding.from("MyApp.registerController.isRegistering").bool().not(),

        action: 'startRegistration'
      }),
      
      cancelButton: SC.ButtonView.design({
        layout: { height: 24, width: 80, bottom: 17, right: 17 },
        title: '_Cancel'.loc(),
        isDefault: NO,
        isEnabledBinding: SC.Binding.from("MyApp.loginController.isLoggingIn").bool().not(),

        action: 'allowLogin'
      }),

      errorMessage: SC.LabelView.design({
        layout: { height: 40, width: 230, right: 120, bottom: 7 },
        classNames: ['error-message'],

        valueBinding: 'MyApp.registerController.errorMessage'
      })

    }),  //contentView
    
    focus: function() {
      this.getPath('contentView.username.field').becomeFirstResponder();        
    }
    
  })

});
