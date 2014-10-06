angular.module('starter.controllers', [])

.controller('TabsCtrl', function($scope, Cart) {
  $scope.count = function() { return Cart.all().length; };
})

.controller('CartCtrl', function($scope, $state, $ionicLoading, Cart, Invoices) {
  $scope.items = Cart.all();
  $scope.total = Cart.total();

  $scope.removeAll = function() {
    Cart.removeAll();
    $state.go('tab.store');
  };

  $scope.webCheckout = function() {
    createInvoice(function(err, invoice) {
      if (err) throw err;
      $state.go('tab.cart-web', { invoiceId: invoice.data.id });
    });
  }

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
    getInvoiceFromSDK(amount, "USD", function(err, invoice) {
      $ionicLoading.hide();
      if (err) return cb(err);
      Invoices.save(invoice);
      cb(null, invoice);
    });
  }

  /**
  * Use the Bitpay SDK to create a new invoice
  */
  function getInvoiceFromSDK(price, currency, cb) {
    var Bitpay = cordova.require('com.bitpay.sdk.cordova.Bitpay');
    var bitpay = new Bitpay({
            host: 'test.bitpay.com',
            port: 443,
            token: 'KUW8nvHZpbqG8xbDvtXYVL'
        });

    var params = { price: price, currency: currency };
    bitpay.createInvoice(params, cb);
  }
})

.controller('CheckoutCtrl', function($scope, $stateParams, Invoices) {
  $scope.invoice = Invoices.get($stateParams.invoiceId);
  $scope.paymentUrl = $scope.invoice.data.paymentUrls.BIP72;

  window.I = $scope.invoice;

  console.log('Listening to:', $scope.invoice);
  $scope.invoice.on('payment', function(e){
    console.log('PAID', $scope.invoice);
  });

  $scope.openWallet = function() {
    window.open($scope.paymentUrl, '_blank');
  }
})

.controller('WebCheckoutCtrl', function($scope, $stateParams, Invoices) {
  $scope.invoice = Invoices.get($stateParams.invoiceId);
})

.controller('StoreCtrl', function($scope, Products) {
  $scope.products = Products.all();
})

.controller('StoreDetailCtrl', function($scope, $stateParams, $state, Products, Cart) {
  $scope.product = Products.get($stateParams.productId);
  $scope.isIncluded = !!Cart.get($stateParams.productId);

  $scope.addToCart = function() {
    Cart.add($scope.product);
    $state.go('tab.cart');
  };
})

.controller('InvoiceCtrl', function($scope, Invoices) {
  $scope.invoices = Invoices.all();
  console.log(Invoices.all());
});
