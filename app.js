
        var checkOffApp= angular.module('checkOffApp', []);
        checkOffApp.controller("toBuyController",function($scope,buyBoughtServer){
            var toBuy = this;
            toBuy.items = [
                            {
                                name:'Raj',
                                quantity: 3
                            },
                            {
                                name: 'Sita',
                                quantity: 2
                            },
                            {
                                name: 'Veena',
                                quantity: 5
                            },
                            {
                                name: 'Rita',
                                quantity:4
                            },
                            {
                                name: 'Dharsini',
                                quantity: 3
                            },
                            {
                                name: 'Suja',
                                quantity: 4
                            }
                          ];
            toBuy.moveItem = function(itemIndex) {
                buyBoughtServer.moveItem(itemIndex, toBuy.items);
            }



        });
        checkOffApp.controller("alreadyBoughtController",function($scope,buyBoughtServer){
            var alreadyBought = this;  
            alreadyBought.items = buyBoughtServer.items;  

        });

        checkOffApp.service('buyBoughtServer', function(){
            var buyBought = this;
            buyBought.items = [];
            buyBought.moveItem = function (itemIndex, arrayOfitems) {
                var item = {
                    name: '',
                    quantity: ''
                }
                item.name = arrayOfitems[itemIndex].name;
                item.quantity = arrayOfitems[itemIndex].quantity;
                arrayOfitems.splice(itemIndex, 1);
                buyBought.items.push(item);
            };
        });
     
    
