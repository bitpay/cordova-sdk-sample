angular.module('starter.controllers', [])

.controller('TabsCtrl', function($scope, Cart) {
  $scope.count = function() { return Cart.all().length; };
})

.controller('CartCtrl', function($scope, $state, Cart) {
  $scope.items = Cart.all();
  $scope.total = Cart.total();

  $scope.removeAll = function() {
    Cart.removeAll();
    $state.go('tab.store');
  };

})

.controller('StoreCtrl', function($scope, Products) {
  $scope.products = Products.all();
})

.controller('StoreDetailCtrl', function($scope, $stateParams, $state, Products, Cart) {
  $scope.product = Products.get($stateParams.productId);
  $scope.isIncluded = !!Cart.get($stateParams.productId);
  console.log($scope.isIncluded, $stateParams.productId);

  $scope.addToCart = function() {
    Cart.add($scope.product);
    $state.go('tab.cart');
  };

})

.controller('InvoiceCtrl', function($scope) {

});
