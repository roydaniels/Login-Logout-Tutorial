// ==========================================================================
// Project:   LifestraCore
// Copyright: ©2011 Nextfinity, LLC. All Rights Reserved
// ==========================================================================
/*globals LifestraCore */

/** @namespace

  My cool new framework.  Describe your framework.
  
  @extends SC.Object
*/
LifestraCore = SC.Object.create(
  /** @scope LifestraCore.prototype */ {

  NAMESPACE: 'LifestraCore',
  
  /**
    Formats a hash so any arrays are transformed into a comma separated list
    Use this method to format a hash before sending to the backend server.
    
    Returns the modified hash
   */
  convertArraysInHash: function(hash) {
    for(key in hash) {
      if(SC.typeOf(hash[key]) === SC.T_ARRAY) {
        if(hash[key].length > 0) hash[key] = hash[key].join(',');
        else hash[key] = null;
      }
    }
    return hash;
  },

});

// Date/Time formats.
LifestraCore.DATE_FORMAT = '%m/%d/%Y';
LifestraCore.DATE_TIME_FORMAT = LifestraCore.DATE_FORMAT + ' %I:%M %p';
LifestraCore.DATE_TIME_EXT_FORMAT = LifestraCore.DATE_TIME_FORMAT + ' %S %p';

// Request headers.
LifestraCore.HEADER_CONTENT_TYPE = 'Content-Type';
LifestraCore.HEADER_VALUE_CONTENT_TYPE = 'application/json';
LifestraCore.HEADER_ACCEPT = 'Accept';
LifestraCore.HEADER_VALUE_ACCEPT = 'application/json';

// Reusable SC.Request objects.
LifestraCore.REQUEST_GET = SC.Request.create({ type: 'GET', isJSON: YES })
  .header(LifestraCore.HEADER_CONTENT_TYPE, LifestraCore.HEADER_VALUE_CONTENT_TYPE)
  .header(LifestraCore.HEADER_ACCEPT, LifestraCore.HEADER_VALUE_ACCEPT);

LifestraCore.REQUEST_POST = SC.Request.create({ type: 'POST', isJSON: YES })
  .header(LifestraCore.HEADER_CONTENT_TYPE, LifestraCore.HEADER_VALUE_CONTENT_TYPE)
  .header(LifestraCore.HEADER_ACCEPT, LifestraCore.HEADER_VALUE_ACCEPT);

LifestraCore.REQUEST_PUT = SC.Request.create({ type: 'PUT', isJSON: YES })
  .header(LifestraCore.HEADER_CONTENT_TYPE, LifestraCore.HEADER_VALUE_CONTENT_TYPE)
  .header(LifestraCore.HEADER_ACCEPT, LifestraCore.HEADER_VALUE_ACCEPT);

LifestraCore.REQUEST_DELETE = SC.Request.create({ type: 'DELETE', isJSON: YES })
  .header(LifestraCore.HEADER_CONTENT_TYPE, LifestraCore.HEADER_VALUE_CONTENT_TYPE)
  .header(LifestraCore.HEADER_ACCEPT, LifestraCore.HEADER_VALUE_ACCEPT);

