// ==========================================================================
// Project:   LifestraCore
// Copyright: ©2011 Nextfinity, LLC
//            All Rights reserved.
// License:   This file and its contents are the intellectual property of 
//            Nextfinity, LLC and may not be used, copied, or distributed 
//            in any way without consent from Nextfinity, LLC.
// ==========================================================================

/**
  @mixin
  
  The ValidateGroup mixin should be added to the parent object of a collection of fields
  that need to be validated. It will search this view's childView array to get all
  fields that apply the ValidateField mixin. Only these fields will be validated.
  
  To validate all fields within a ValidateGroup you should call the validateGroup() method.  

  @extends SC.Object
*/

LifestraCore.ValidateGroup = {
  
  /**
    An array of all the fields to validate

    @property {Array}
  */
  validateFields: null,
  
  
  
  initMixin: function() {
  },
  
};