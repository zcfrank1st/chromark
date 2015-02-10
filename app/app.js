angular
  .module('app',[])
  .filter('m2c', function() {
  return function(c) {
    var content = c || '';
    return marked(content);
  };
  })
  .config(function($sceProvider) {
    enableTab('tab')
    $sceProvider.enabled(false);
  })
  .controller('appController', function ($scope) {
    $scope.open = function () {

    };

    $scope.save = function () {

    };

    $scope.new = function () {

    };
  });