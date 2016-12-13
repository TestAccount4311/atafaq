
Atafaq.controller('signupctrl', function($scope,$state,ajaxService,$ionicLoading,$rootScope) {

//AJAX call for registration of user
    $scope.signup={
        name:'',
        email:'',
        pwd:''
    }
    $scope.signuppwd=false;
    $scope.signupemail=false;
    $scope.signupname=false;
    $scope.showhidestatus='hide';
    $scope.textclick=function()
    {
        $scope.signuppwd=false;
        $scope.signupemail=false;
        $scope.signupname=false;
    }
    $scope.passshowhide=function(item)
    {
//        alert(item);
        $scope.showhidestatus=item;
    }
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    $scope.gotosignupctrl=function(signup){
            if(signup.name==''){
                $scope.signupname=true;
            }
            else if(signup.email==''){
                $scope.signupemail=true;
            }
            else if(!filter.test(signup.email)){
                $scope.signupemail='invalid';
            }
            else if(signup.pwd==''){
                $scope.signuppwd=true;
            }
            else if(signup.pwd.length<6){
                $scope.signuppwd='invalid';
            }
        else{
                $ionicLoading.show();
                ajaxService.ajaxCall({
                    name:signup.name,
                    email:signup.email,
                    pass:signup.pwd,
                    request:'signup'
                }).then(function(response) {
                    console.log(response);
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
                    else if(response.data.result=="failure")
                    {
                        $scope.signupemail='invalid';

                    }

                });
            }


    }
});