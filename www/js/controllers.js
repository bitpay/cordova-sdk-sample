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
      window.location = 'http://test.bitpay.com'; // TODO: Use SDK for Web Intent
    });
  }

  $scope.customCheckout = function() {
    createInvoice(function(err, invoice) {
      if (err) throw err;
      $state.go('tab.cart-checkout', { invoiceId: invoice.id });
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
  function getInvoiceFromSDK(amount, currency, cb) {
    // var bitpay = new BitPay();
    // bitpay.createInvoice(amount, currency, cb);

    // Mocking the response
    var onSuccess = function() {
      var invoice = {
        id: 12,
        status: 'new',
        amount: amount,
        currency: currency,
        bitcoins: 0.34,
        merchant: "Fake Music Store Inc.",
        address: 'myNUd9RyL6VcLNdiTkYPDz9pQK6fo2JqYy',
        url: 'http://test.bitpay.com'
      };

      cb(null, invoice);
    }

    setTimeout(onSuccess, 2000);
  }
})

.controller('CheckoutCtrl', function($scope, $stateParams, Invoices) {
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
