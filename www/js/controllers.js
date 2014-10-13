angular.module('starter.controllers', [])

.controller('TabsCtrl', function($scope, Cart) {
  $scope.count = function() { return Cart.all().length; };
})

.controller('CartCtrl', function($scope, $state, $ionicLoading, Cart, Invoices, BitPay) {
  $scope.items = Cart.all();
  $scope.total = Cart.total();
  $scope.hasWallet = BitPay.hasWallet;

  $scope.removeAll = function() {
    Cart.removeAll();
    $state.go('tab.store');
  };

  $scope.customCheckout = function() {
    createInvoice(function(err, invoice) {
      if (err) throw err;
      $state.go('tab.cart-checkout', { invoiceId: invoice.data.id });
    });
  };

  /**
  * Creates and stores an invoice
  */
  function createInvoice(cb) {
    var amount = Cart.total();
    $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Creating invoice...'
    });

    var params = { price: amount, currency: "USD" };
    BitPay.createInvoice(params, function(err, invoice) {
      $ionicLoading.hide();
      if (err) return cb(err);
      Invoices.save(invoice);
      cb(null, invoice);
    });
  }
})

.controller('CheckoutCtrl', function($scope, $interval, $stateParams, Cart, Invoices, BitPay) {
  $scope.invoice = Invoices.get($stateParams.invoiceId);
  $scope.paymentUrl = $scope.invoice.data.paymentUrls.BIP72;
  $scope.hasWallet = BitPay.hasWallet;

  $scope.invoice.openWallet();

  $scope.openWallet = function() {
    $scope.invoice.openWallet();
  };

  var timer;
  var millis = $scope.invoice.timeRemaining();
  $scope.minutesRemaining = Math.round(millis/1000/60);

  timer = $interval(function(){
    millis = $scope.invoice.timeRemaining();
    if ( millis ) {
      $scope.minutesRemaining = Math.round(millis/1000/60);
    }
  }, 25000)
  
  $scope.$on('$destroy', function() {
    $interval.cancel(timer);
  });

  $scope.invoice.on('payment', function(e) {
    Cart.removeAll();
    Invoices.save($scope.invoice);
    $scope.$digest();
  });

})

.controller('StoreCtrl', function($scope, Products) {
  $scope.products = Products.all();
})

.controller('StoreDetailCtrl', function($scope, $stateParams, $state, Products, Cart, BitPay) {
  $scope.product = Products.get($stateParams.productId);
  $scope.isIncluded = !!Cart.get($stateParams.productId);
  $scope.hasWallet = BitPay.hasWallet;

  $scope.addToCart = function() {
    Cart.add($scope.product);
    $state.go('tab.cart');
  };
})

.controller('InvoiceCtrl', function($scope, Invoices) {
  $scope.invoices = Invoices.all();
  console.log(Invoices.all());
});
