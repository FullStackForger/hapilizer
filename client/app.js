var dependencies = [
	'ngResource', 'ngMessages', 'ngAnimate',
	'toastr', 'ui.router',
	'satellizer', 'socialLogin',
	'hapilizer'
];

angular.module('MyApp', dependencies)
  .config(function(socialProvider) {
    //socialProvider.setGoogleKey("YOUR GOOGLE CLIENT ID");
    //socialProvider.setLinkedInKey("YOUR LINKEDIN CLIENT ID");
    socialProvider.setFbKey({appId: "1717363278549346", apiVersion: "API VERSION"})
  })
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'partials/home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('register', {
        url: '/register',
        templateUrl: 'partials/register.html',
        controller: 'RegisterCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
	    .state('join', {
		    url: '/join',
		    templateUrl: 'partials/join.tpl.html',
		    controller: 'JoinController',
		    resolve: {
			    skipIfLoggedIn: skipIfLoggedIn
		    }
	    })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutController'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'partials/profile.html',
        controller: 'ProfileController',
        resolve: {
          loginRequired: loginRequired
        }
      });

    $urlRouterProvider.otherwise('/');

    $authProvider.facebook({
      clientId: '657854390977827'
    });

    $authProvider.google({
      clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
    });

    $authProvider.linkedin({
      clientId: '77cw786yignpzj'
    });

    $authProvider.twitter({
      url: '/auth/twitter'
    });


    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth, auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated() || auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }
  });
