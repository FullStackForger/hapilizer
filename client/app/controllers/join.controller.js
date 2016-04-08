angular.module('MyApp').controller('JoinController', JoinController);

JoinController.$inject = ['$scope', '$location', 'auth', 'toastr'];
function JoinController($scope, $location, auth, toastr) {

	$scope.login = function() {
		auth.login($scope.user)
			.then(function() {
				toastr.success('You have successfully signed in!');
				$location.path('/');
			})
			.catch(function(error) {
				toastr.error(error.data.message, error.status);
			});
	};
}