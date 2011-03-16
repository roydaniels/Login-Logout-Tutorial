#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'
require 'dm-core'
require 'dm-migrations'
require 'json'

# connect DataMapper to a local SQLite file. 
# The SQLite database file can be found at /tmp/my_app.db
DataMapper.setup(:default, ENV['DATABASE_URL'] || 
    "sqlite3://#{File.join(File.dirname(__FILE__), '/tmp', 'my_app.db')}")

#######################################################################
#    Model Definitions
#######################################################################

class User
  include DataMapper::Resource
  
  property :id,             Serial
  property :username,       Text
  property :password_hash,  Text
  property :password_salt,  Text
  property :authToken,      Text
  
  def guid
    "user/#{self.id}"
  end
  
  def self.create_user(json)
    salt      = [Array.new(6){rand(256).chr}.join].pack("m").chomp
    password  = encrypted_password(json['pwd'], salt)
    
    ret = { 
      :username => json['user'], :password_hash => password, :password_salt => salt
    }
    ret 
  end
  
  def self.encrypted_password(hashed_password, salt) 
    string_to_hash = hashed_password + "My app is the best ever!" + salt 
    Digest::SHA256.hexdigest(string_to_hash)
  end
  
  def self.authenticate(username, password)
    if username && password
      user = User.first(:username => username)
      if user
        expected_password = encrypted_password(password, user.password_salt)
        if user.password_hash != expected_password
          user = nil 
        end
      end
    elsif password
      user = User.first(:authToken => password)
    else
      user = nil
    end
    
    user
  end
  
end
#######################################################################
#    End Model Definitions
#######################################################################

# instructs DataMapper to setup your database as needed
DataMapper.auto_upgrade!

# set the port number
set :port, 6789

post '/register' do
  ret   = Array.new
  data  = JSON.parse(request.body.read)
  halt(401, 'Could not parse') if data.nil?
  
  # See if the username already exists
  halt(401, 'User already exists') if User.first(:username => data['user'])
  
  opts = User.create_user(data) rescue nil
  halt(401, 'Invalid Format') if opts.nil?
  
  user = User.new(opts)
  halt(500, 'Could not register new user') unless user.save
  
  # Return guids of new records
  content_type 'application/json'
  response.status = 201  
  { 'content' => 'success' }.to_json
end

post '/login' do
  data      = JSON.parse(request.body.read)
  username  = data['user']
  password  = data['pwd']
  
  # If there is not an email or password/authKey then something is wrong
  halt(401, 'Invalid') if username.nil? && password.nil?
  
  user = User.authenticate(username, password)
  
  # Return new authToken
  content_type 'application/json'
  if user
    token         = Time.now.to_s + "My user is gettin' a new token" + user.password_salt
    hashed_token  = Digest::SHA512.hexdigest(token)
    
    user.authToken = hashed_token
    user.save
    
    response.status = 200
    { 'content' => hashed_token }.to_json
  else
    halt(401, 'Invalid login')
  end
end
