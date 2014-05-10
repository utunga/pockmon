(function() {
   'use strict';

    angular.module('pocketMon.services', ['pocketMon.service.login', 'pocketMon.service.firebase', 'pocketMon.service.changeEmail'])

  	// add/remove/get transactions
	.factory('transactionService', ['$rootScope', '$firebase', 'firebaseRef', '$timeout', '$log', function($rootScope, $firebase, firebaseRef, $timeout, $log) {
		var fbTransacts ;
		return {
			_init: function() {
				fbTransacts = firebaseRef('transactions')
				return this;
			},

			setTestMode: function() {
				fbTransacts = firebaseRef('test', 'transactions')
			},

			test_clearAllData: function() {
				fbTransacts.set(null);
			},

			addTransaction: function(transaction) {
				console.log(transaction);

				if (!(transaction.accountId))
					throw "Can't save a transaction without an accountId";
				//retrieve appropriate ledger
				var ledger = $firebase(fbTransacts.child(transaction.accountId))
				ledger.$add(transaction);
			},

			forAccount: function(accountId) {
				var result = [];
				var ledger = fbTransacts.child(accountId)
				ledger.once("child_added", function(snapshot) {
					var trans = snapshot.val();
					result.push(snapshot.val());
				});
			
				//FIXME1 how can we be sure the above has returned 
				// should use a promise in some way here
				return result;
			},

			balanceForAccount: function(accountId) {
				//FIXME should use some sort of js map function reallly
				var balance = 0;
				var ledger = fbTransacts.child(accountId)
				ledger.on("child_added", function(snapshot) {
					var transaction = snapshot.val();
					balance = balance + transaction.amt;
				});
				return balance;
			}
		}._init();
	}])

  	// add/remove/get kids
	.factory('kidService', ['$rootScope', '$firebase', 'firebaseRef', function($rootScope, $firebase, firebaseRef) {
		var transactions;
		var ref ;
	}]);

})();



