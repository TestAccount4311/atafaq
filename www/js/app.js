// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var Atafaq = angular.module('starter', ['ionic','ngCordovaOauth', 'ngCordova']);

Atafaq.run(function ($ionicPlatform, $state, $rootScope, $ionicBackdrop,$cordovaClipboard, $cordovaSocialSharing, $timeout, $ionicPopup, $cordovaGeolocation) {

    if (localStorage.getItem('userId') == '' ||
        localStorage.getItem('userId') == 'null' ||
        localStorage.getItem('userId') == null ||
        localStorage.getItem('userId') == '(null)' ||
        localStorage.getItem('userId') == undefined) {
        $state.go('login');
    } else {

        $rootScope.userid = localStorage.getItem('userId');
        $rootScope.logpersondetails = JSON.parse(localStorage.getItem('userDetails'));
        $rootScope.userLoggedStatus = 1;
        $state.go('app.home');
    }

    // USER LOGOUT EVENT
    $rootScope.logout = function () {
        $rootScope.userid = '';
        $rootScope.logpersondetails = '';
        localStorage.setItem('userId', '');
        localStorage.setItem('userDetails', '');
        $state.go('login');
    };
    $rootScope.latitude = '';
    $rootScope.longitude = '';
    $rootScope.$on('GeoLocation', function () {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                $rootScope.latitude = position.coords.latitude;
                $rootScope.longitude = position.coords.longitude;
                alert($rootScope.latitude);
                localStorage.setItem('latitude', position.coords.latitude);
                localStorage.setItem('longitude', position.coords.longitude);
            }, function (err) {

            });
    });
//alert("ha");
//
//    cordova.plugins.locationAccuracy.request(function (success){
//        console.log("Successfully requested accuracy: "+success.message);
//        alert(success.message);
//        $rootScope.$broadcast('GeoLocation');
//    }, function (error){
//        console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
//        if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
//            if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
//                cordova.plugins.diagnostic.switchToLocationSettings();
//                 $rootScope.$broadcast('GeoLocation');
//                alert("hai get");
//            }
//        }
//    }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    $rootScope.postimages = [];
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        $rootScope.gotomyoffer = function () {
            $state.go('photo');
        };
        $rootScope.back = function () {
            history.back();
        };
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    // invitation from header and side menu

    $rootScope.showInvitation = function () {
        $ionicBackdrop.retain();
        $rootScope.myPopup = $ionicPopup.show({
            templateUrl: 'templates/invitePopup.html',
            cssClass: 'animated fadeInDown',
            scope: $rootScope
        });

        $rootScope.myPopup.then(function (res) {

        });
    };

    $rootScope.closeInvitePopup = function () {
        $rootScope.myPopup.close(); //close the popup after 3 seconds for some reason
        $ionicBackdrop.release();
    };

    $rootScope.inviteViaMessage=function(message,number){
        $cordovaSocialSharing
            .shareViaSMS(message, number)
            .then(function(result) {
                // Success!
            }, function(err) {
                // An error occurred. Show a message to the user
            });
    }
    $rootScope.inviteViaMail=function(message, subject, toArr, ccArr, bccArr, file){
        $cordovaSocialSharing
            .shareViaEmail(message, subject, toArr, ccArr, bccArr, file)
            .then(function(result) {
                // Success!
            }, function(err) {
                // An error occurred. Show a message to the user
            });
    }

    $rootScope.inviteViaSocialShare=function(message, subject, file, link){
        $cordovaSocialSharing
            .share(message, subject, file, link) // Share via native share sheet
            .then(function(result) {
                // Success!
            }, function(err) {
                // An error occured. Show a message to the user
            });
    }




});

Atafaq
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginctrl'
            })
            .state('loginfnc', {
                url: '/loginfnc',
                templateUrl: 'templates/loginfnc.html',
                controller: 'loginctrl'
            })
            .state('forgotpass', {
                url: '/forgotpass',
                templateUrl: 'templates/forgotpass.html'
                // controller: 'loginctrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'templates/signup.html',
                controller: 'signupctrl'
            })
            .state('location', {
                url: '/location',
                templateUrl: 'templates/location.html',
                controller: 'locationctrl'
            })
            .state('offerinner', {
                url: '/offerinner',
                templateUrl: 'templates/offerinner.html',
                controller: 'offerinnerctrl'
            })
            .state('photo', {
                url: '/photo',
                templateUrl: 'templates/photo.html',
                controller: 'postphotoctrl'
            })
            .state('photoupload', {
                url: '/photoupload',
                templateUrl: 'templates/photoupload.html',
                controller: 'postphotoctrl'
            })
            .state('details', {
                url: '/details',
                templateUrl: 'templates/details.html',
                controller: 'postphotoctrl'
            })
            .state('price', {
                url: '/price',
                templateUrl: 'templates/price.html',
                controller: 'postphotoctrl'
            })
            .state('finish', {
                url: '/finish',
                templateUrl: 'templates/finish.html',
                controller: 'postphotoctrl'
            })
            // .state('mkoffervideo', {
            //   url: '/mkoffervideo',
            //       templateUrl: 'templates/mkoffervideo.html'
            //       //controller: 'makeofferctrl'
            // })
            // .state('chat', {
            //   url: '/chat',
            //       templateUrl: 'templates/chat.html'
            //       //controller: 'makeofferctrl'
            // })
            // .state('makeoffer', {
            //   url: '/makeoffer',
            //       templateUrl: 'templates/makeoffer.html'
            //       //controller: 'makeofferctrl'
            // })
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html',
                        controller: 'homectrl'
                    }
                }
            })
            .state('app.mkoffervideo', {
                url: '/mkoffervideo',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/mkoffervideo.html',
                        controller: 'mkoffervideoctrl'
                    }
                }
            })
            .state('chat', {
                url: '/chat',
                templateUrl: 'templates/chat.html',
                controller: 'chatctrl'

            })
            .state('app.category', {
                url: '/category',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/category.html',
                        controller: 'categoryctrl'
                    }
                }
            })
            .state('app.myoffers', {
                url: '/myoffers',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/myoffers.html',
                        controller: 'myoffersctrl'
                    }
                }
            })
            .state('app.alert', {
                url: '/alert',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/alert.html',
                        controller: 'alertctrl'
                    }
                }
            })
            .state('app.makeoffer', {
                url: '/makeoffer',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/makeoffer.html',
                        controller: 'makeofferctrl'
                    }
                }
            })
            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html'
                    }
                }
            })

            .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                }
            })
            .state('app.playlists', {
                url: '/playlists',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlists.html',
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

            .state('app.single', {
                url: '/playlists/:playlistId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlist.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'templates/settings.html',
                controller: 'settingsctrl'
            })
            .state('report', {
                url: '/report',
                templateUrl: 'templates/report.html'
//          controller: 'postfinishctrl'
            })
            .state('userdetails', {
                url: '/userdetails',
                templateUrl: 'templates/userdetails.html',
                controller: 'userdetailsctrl'
            });

        //my
        // .state('app.photo', {
        //   url: '/photo',
        //   views: {
        //     'menuContent': {
        //       templateUrl: 'templates/photo.html',
        //       controller: 'postphotoctrl'
        //     }
        //   }
        // })

        // profile tab
        //   .state('app.post', {
        //       url: "/post",
        //       nativeTransitions: null,
        //       views: {
        //           'menuContent': {
        //               templateUrl: "templates/post.html"
        //               // controller:'homectrl'
        //           }
        //       }
        //   })
        // .state('app.post.photo', {
        //     url: '/photo',
        //     nativeTransitions: null,
        //     views: {
        //         'tab-photo': {
        //             templateUrl: 'templates/photo.html',
        //             controller:'postphotoctrl'
        //         }
        //     }
        // })
        // .state('app.post.details', {
        //     url: '/details',
        //     nativeTransitions: null,
        //     views: {
        //         'tab-details': {
        //             templateUrl: 'templates/details.html',
        //             controller:'postdetailsctrl'
        //         }
        //     }
        // })
        // .state('app.post.price', {
        //     url: '/price',
        //     nativeTransitions: null,
        //     views: {
        //         'tab-price': {
        //             templateUrl: 'templates/price.html',
        //             controller:'postpricectrl'
        //         }
        //     }
        // })
        // .state('app.post.finish', {
        //     url: '/finish',
        //     nativeTransitions: null,
        //     views: {
        //         'tab-finish': {
        //             templateUrl: 'templates/finish.html',
        //             controller:'postfinishctrl'
        //         }
        //     }
        // });
        // if none of the above states are matched, use this as the fallback
//  $urlRouterProvider.otherwise('/login');
        $ionicConfigProvider.views.maxCache(0);
    })
    .directive('googleplace', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, model) {
                var options = {
                    types: []
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0],
                    options);

                google.maps.event.addListener(scope.gPlace, 'place_changed',
                    function () {
                        scope.$apply(function () {
                            model.$setViewValue(element.val());
                        });
                    });
            }
        };
    });
