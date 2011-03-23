# ===========================================================================
# Project:   MyApp
# Copyright: ©2011 Nextfinity, LLC. This document is released under the MIT License.
# ===========================================================================

# Add initial buildfile information here

config :my_app,
  :required => [:sproutcore, "sproutcore/statechart", 'sproutcore/ace'],
  :deferred_modules   => ['logged_in']   

proxy "/login", :to => "localhost:6789"
proxy "/register", :to => "localhost:6789"