# Hapi API for [Satellizer](https://github.com/sahat/satellizer)

Hapilizer is Hapi plugin providing API endpoints for Satellizer, token-based
authentication module for Angular.

## Motivation

Satellizer is amazing Anuglar authentication module with over 120 contributors
and over 2000 commits. I has server implementations for different languages.
Node server example has been written for ExpressJS. I needed variation of it
for Hapi and Hapilizer is exactly that.

## Satellizer

> **[Satellizer][1]** is a simple to use, end-to-end, token-based authentication
module for [AngularJS][2] with built-in support for Google, Facebook,
LinkedIn, Twitter, Instagram, GitHub, Bitbucket, Yahoo, Twitch, Microsoft
(Windows Live) OAuth providers, as well as Email and Password sign-in. However,
you are not limited to the sign-in options above, in fact you can add any
*OAuth 1.0* or *OAuth 2.0* provider by passing provider-specific information
in the app *config* block.

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

Example client is a copy of satellizer example made for angular 1.0.

## Resources

### Social Login API - providers documentation
  - [Twitter for websites: Sign in with Twitter](https://dev.twitter.com/web/sign-in)
  - [Sign in with Google](https://developers.google.com/identity/sign-in/web/)
  - [Sign in with Facebook](https://developers.facebook.com/docs/facebook-login/web)
    - [Expiration and Extension of Access Tokens](https://developers.facebook.com/docs/facebook-login/access-tokens/expiration-and-extension)
    - [Access Tokens](https://developers.facebook.com/docs/facebook-login/access-tokens)
  - [Sign in with LinkedIn]()

### Other interesting Angular authentication plugins
 - [angularjs-social-login][4] - social login with Google, FB, LinkedIN.
 - [angular-social-login][5] - social login with Google & Facebook for PhoneGap/Cordova.
 - [satellizer][1] - end-to-end, token-based authentication module for AngularJS with built-in support for Google, Facebook, LinkedIn, Twitter, Instagram, GitHub, Bitbucket, Yahoo, Twitch, Microsoft (Windows Live) OAuth providers, as well as Email and Password sign-in.

### Great Node libraries
 - [hapi][3] - configuration-centric framework with built-in support for input validation, caching,
   authentication, and other essential facilities for building web and services applications.
 - [moment][6] - Parse, validate, manipulate, and display dates
 - [jsonwebtoken][7] - JSON Web Token implementation (symmetric and asymmetric)
 - [bcrypt][8] - Lib to help you hash passwords.
 - [mongoose][9] - Mongoose MongoDB ODM
 - [hapi-app-spa][10] - hapi plugin for single page application
 - [forger][11] - Async utilities and helpers for node


[1]: https://github.com/sahat/satellizer
[2]: http://angularjs.org
[3]: https://github.com/hapijs/hapi
[4]: https://github.com/indieforger/angularjs-social-login
[5]: https://github.com/Paldom/angular-social-login
[6]: https://www.npmjs.com/package/moment
[7]: https://www.npmjs.com/package/jsonwebtoken
[8]: https://www.npmjs.com/package/bcrypt
[9]: https://www.npmjs.com/package/mongoose
[10]: https://www.npmjs.com/package/hapi-app-spa
[11]: https://www.npmjs.com/package/forger
