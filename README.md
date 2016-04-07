# Hapi API for [Satellizer](https://github.com/sahat/satellizer)

> WORK IN PROGRESS

## Motivation 

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

(implemented)

Endpoint        | Method    | Auth. | Description
----------------|-----------|-------|-------------------
/user/me        | GET       | jwt   | user info    
/user/profile   | GET       | jwt   | user info    
/auth/register  | POST      | -     | registers user account
/auth/login     | GET       | basic | login with username and password
/auth/login     | POST      | basic | login with username and password

(coming next)

Endpoint        | Method    | Auth. | Description
----------------|-----------|-------|-------------------
/auth/facebook  | POST      | post  | login with Facebook
/auth/twitter   | POST      | post  | login with Twitter
/auth/google    | POST      | post  | login with Google


## Client

Currently client is a copy of satellizer example made for angular 1.0.
It is not yet integrated with hapilizer API. (hopefully will be in couple of days)


[1]: https://github.com/sahat/satellizer
[2]: http://angularjs.org
[3]: https://github.com/hapijs/hapi