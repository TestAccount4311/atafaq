
Atafaq.controller('settingsctrl', function($scope,uploadservice,focus,$state,$ionicLoading,$rootScope,ajaxService) {

    $scope.settingspwd=false;
    $scope.settingsemail=false;
    $scope.settingsname=false;
    $scope.settingslocation=false;
    if($rootScope.logpersondetails.phoneNo=='undefined')
    {
        $rootScope.logpersondetails.phoneNo='';
    }
    if($rootScope.logpersondetails.location=='undefined')
    {
        $rootScope.logpersondetails.location='';
    }
    $scope.textclick=function()
    {
        $scope.settingspwd=false;
        $scope.settingsemail=false;
        $scope.settingsname=false;
        $scope.settingslocation=false;
    }


    $scope.user={
        name: $rootScope.logpersondetails.userName,
        email:$rootScope.logpersondetails.email,
        phoneno:parseInt($rootScope.logpersondetails.phoneNo),
        location:$rootScope.logpersondetails.location,
        password:$rootScope.logpersondetails.password,
        image:$rootScope.logpersondetails.image
    }
    $scope.opensheet = function(pic,index){

        uploadservice.showactionsheet().then(function(url){
            uploadservice.uploadfile(url,pic).then(function(result){
                $scope.user.image = result;
//                alert(JSON.stringify(result));
            })
        });
    }
    $scope.edit=function(item)
    {
        if(item=='name'){ $scope.user.name='';focus('name');}
        if(item=='email'){$scope.user.email='';focus('email');}
        if(item=='phoneno'){$scope.user.phoneno='';focus('phoneno');}
        if(item=='location'){$scope.user.location='';focus('location');}
        if(item=='password'){$scope.user.password='';focus('password');}
    }
    $scope.checkempty=function(item,value)
    {
        if(item=='name' && value=='' ){
            $scope.user.name=$rootScope.logpersondetails.userName;
        }
        if(item=='password' && value==''){
            $scope.user.password=$rootScope.logpersondetails.password;
        }
        if(item=='email' && value==''){
            $scope.user.email=$rootScope.logpersondetails.email;
        }
        if(item=='phoneno' && value==''){
            $scope.user.phoneno=parseInt($rootScope.logpersondetails.phoneNo);
        }
        if(item=='location' && value==''){
            $scope.user.location=$rootScope.logpersondetails.location;
        }
    }
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    $scope.updateprofile = function(item)
    {
//        alert(JSON.stringify(item));
        if(!filter.test(item.email)){
            $scope.settingsemail='invalid';

        }
        else if(item.location=='undefined' || item.location=='')
        {
            $scope.settingslocation=true;
        }
        else if(item.password.length<6){
            $scope.settingspwd='invalid';
        }
        else{
            $ionicLoading.show();
            ajaxService.ajaxCall({
                name:item.name,
                email:item.email,
                phoneno:item.phoneno,
                location:item.location,
                pass:item.password,
                image:item.image,
                id:$rootScope.logpersondetails.user_Id,
                request:'updateprofile'
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
                }
                else if(response.data.result=="failure")
                {
                    $scope.signupemail='invalid';

                }

            });
        }
    }
});
