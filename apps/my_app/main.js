// ==========================================================================
// Project:   MyApp
// Copyright: ©2011 Nextfinity, LLC. This document is released under the MIT License.
// ==========================================================================
/*globals MyApp */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
MyApp.main = function main() {

  MyApp.statechart.initStatechart();

} ;

function main() { MyApp.main(); }
