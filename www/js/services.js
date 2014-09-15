angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Products', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var products = [
    { id: 0, name: 'Clasic Guitar', price: 99.95 },
    { id: 1, name: 'Electric Guitar', price: 400 },
    { id: 2, name: 'Violin', price: 700.5 },
    { id: 3, name: 'Bass', price: 12.99 },
    { id: 4, name: 'Drum set', price: 120 },
    { id: 5, name: 'Guitar pick', price: 1.99 }
  ];

  return {
    all: function() {
      return products;
    },
    get: function(productId) {
      // Simple index lookup
      return products[productId];
    }
  }
})

.factory('Cart', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var items = [
  ];

  return {
    all: function() {
      return items;
    },
    add: function(product) {
      // Simple index lookup
      return items.push(product);
    },
    removeAll: function() {
      items = [];
    },
    get: function(productId) {
      for(i in items) {
        if (items[i].id == productId) return items[i];
      }
      return null;
    },
    total: function() {
      return items.reduce(function(t, item) { return t + item.price; }, 0);
    }
  }
});

