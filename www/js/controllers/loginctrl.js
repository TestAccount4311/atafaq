
Atafaq.controller('loginctrl', function($scope,$state,$ionicLoading,$http,$cordovaOauth,ajaxService,$rootScope) {


    $scope.logstatus=false;
    $scope.passstatus=false
    $scope.showhidestatus='hide';
    $scope.user={
        email: '',
        pass:''
    }
    $scope.textclick=function()
    {
        $scope.logstatus=false;
        $scope.passstatus=false
    }
    $scope.passshowhide=function(item)
    {
//        alert(item);
        $scope.showhidestatus=item;
    }
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    $scope.signIn=function(item)
    {
       if(item.email=='')
        {
            $scope.logstatus=true;
        }
       else if(!filter.test(item.email))
       {
           $scope.logstatus='invalid';
       }
       else if(item.pass=='')
        {
            $scope.passstatus=true;
        }
       else if(item.pass.length<6){
           $scope.passstatus='min';
       }
       else{
           $ionicLoading.show();
           ajaxService.ajaxCall({
               email:item.email,
               pass:item.pass,
               request:'login'
           }).then(function(response) {
               console.log(response);
               $ionicLoading.hide();
               if(response.data.result=="success")
               {
                   localStorage.setItem('userDetails',JSON.stringify(response.data.details));
                   localStorage.setItem('userId',response.data.details.user_id);
                   $rootScope.userid = localStorage.getItem('userId');
                   $rootScope.logpersondetails=JSON.parse(localStorage.getItem('userDetails'));
                   $rootScope.userid=response.data.details.user_Id;

                   $state.go('app.home');
               }
               else if(response.data.result=="failure")
               {
                   $scope.logstatus='invalid';

               }
           });
       }
    }
    $scope.fblogin=function(){

        $cordovaOauth.facebook("383313745338585", ["email"]).then(function(result) {
            //alert(result.access_token);
            $rootScope.access_token = result.access_token;

            $http.get("https://graph.facebook.com/v2.2/me", {
                params:
                {
                    access_token: $rootScope.access_token,
                    fields: "id,name,email,gender,location,website,picture,relationship_status",
                    format: "json"
                }
            }).then(function(result1) {

                $ionicLoading.show();
                ajaxService.ajaxCall({
                    request:'fblogin',
                    fbid:result1.data.id,
                    name:result1.data.name,
                    email:result1.data.email,
                    picture:result1.data.picture.data.url
                }).then(function (response) {
                    $ionicLoading.hide();
                    if(response.data.result=="success")
                    {

                        localStorage.setItem('userDetails',JSON.stringify(response.data.details));
                        localStorage.setItem('userId',response.data.details.user_id);
                        $rootScope.userid = localStorage.getItem('userId');
                        $rootScope.logpersondetails=response.data.details;
                        $rootScope.userid=response.data.details.user_Id;
                        $state.go('app.home');
                    }
                });
            }, function(error) {

            });
        }, function(error) {
            alert(error);
        });
    }
    $scope.googlepluslogin=function(){
        $cordovaOauth.google("721765159729-4hn0d6l540udskh6qd3dvd4f1nbkpmkj.apps.googleusercontent.com", ["email"]).then(function(result) {
            //alert(JSON.stringify(result));
            $http.get("https://www.googleapis.com/oauth2/v1/userinfo", {
                params:
                {
                    access_token: result.access_token,
                    format: "json"
                }
            }).then(function(result1) {
                $ionicLoading.show();
                ajaxService.ajaxCall({
                    request:'googlelogin',
                    gid:result1.data.id,
                    name:result1.data.name,
                    email:result1.data.email,
                    picture:result1.data.picture
                }).then(function (response) {
                    $ionicLoading.hide();
                    if(response.data.result=="success")
                    {
                        localStorage.setItem('userDetails',JSON.stringify(response.data.details));
                        localStorage.setItem('userId',response.data.details.user_id);
                        $rootScope.userid = localStorage.getItem('userId');
                        $rootScope.logpersondetails=response.data.details;
                        $rootScope.userid=response.data.details.user_Id;
                        $state.go('app.home');
                    }

                });
            });
        }, function(error) {
            alert(error);
        });
    }
});