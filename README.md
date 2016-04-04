# Hapi API for [Satellizer](https://github.com/sahat/satellizer)

> WORK IN PROGRESS

## About 

**[Satellizer][1]** is a simple to use, end-to-end, token-based authentication module 
for [AngularJS][2] with built-in support for Google, Facebook, LinkedIn, Twitter, Instagram, GitHub, 
Bitbucket, Yahoo, Twitch, Microsoft (Windows Live) OAuth providers, as well as Email
and Password sign-in. However, you are not limited to the sign-in options above, in fact
you can add any *OAuth 1.0* or *OAuth 2.0* provider by passing provider-specific information
in the app *config* block.

**[hapi][3]** is a simple to use configuration-centric framework with built-in support for input validation, caching,
authentication, and other essential facilities for building web and services applications. **hapi** enables
developers to focus on writing reusable application logic in a highly modular and prescriptive approach.


## API Endpoints 

Endpoint        | Method    | Auth. | Description
----------------|-----------|-------|-------------------
/me             | GET       | jwt   | user info    
/auth/signup    | POST      | none  | registers user account
/auth/login     | GET       | basic | login with username and password
/auth/login     | POST      | basic | login with username and password
/auth/facebook  | POST      | jwt   | login with Facebook
/auth/twitter   | POST      | jwt   | login with Twitter
/auth/google    | POST      | jwt   | login with Google

[1]: https://github.com/sahat/satellizer
[2]: http://angularjs.org
[3]: https://github.com/hapijs/hapi