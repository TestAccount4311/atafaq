Atafaq.controller('postphotoctrl', function($scope, $state, $rootScope,$cordovaCamera,uploadservice, $cordovaGeolocation,$ionicTabsDelegate, $log)  {
//    $rootScope.postimages=[{img:'img/lampoimg.jpg'},{img:'img/lampoimg.jpg'},{img:'img/lampoimg.jpg'},{img:'img/lampoimg.jpg'},{img:'img/lampoimg.jpg'},{img:'img/lampoimg.jpg'}];
    $scope.opensheet = function(index,pic){
       $scope.postimages2=false;

       if(index==0)
       {
           var options = {
               destinationType: Camera.DestinationType.FILE_URI,
               sourceType: Camera.PictureSourceType.CAMERA
           };
           $cordovaCamera.getPicture(options).then(function (imageURI) {
               uploadservice.uploadfile(imageURI).then(function(result){
                   function objectimage(image){
                       this.img= image;
                   }
                   $rootScope.postimages[0]=new objectimage(result);

               })
           }, function (err) {
               $ionicPopup.alert({
                   title: "Failed to upload!"
               });
           });
       }
        else if(index==1){
           var options = {
               destinationType: Camera.DestinationType.FILE_URI,
               sourceType: Camera.PictureSourceType.PHOTOLIBRARY
           };
           $cordovaCamera.getPicture(options).then(function (imageURI) {
               if (imageURI.substring(0, 21) == "content://com.android") {
                   var photo_split = imageURI.split("%3A");
                   imageURI = "content://media/external/images/media/" + photo_split[1];
               }
               window.resolveLocalFileSystemURL(imageURI, function (fileEntry) {
//                   return callback(fileEntry.nativeURL);
                   uploadservice.uploadfile(fileEntry.nativeURL).then(function(result){
                       function objectimage(image){
                           this.img= image;
                       }
                       $rootScope.postimages[0]=new objectimage(result);
                   })
               });
           }, function (err) {
               $ionicPopup.alert({
                   title: "Failed to upload!"
               });
           });
       }


    }
    $scope.openpostimage=function(pic)
    {
        uploadservice.showactionsheet().then(function(url){
            uploadservice.uploadfile(url,pic).then(function(result){
                function objectimage(image){
                    this.img= image;
                }
                $rootScope.postimages.push(new objectimage(result));

            })
        });
    }
$scope.deleteimage=function()
{
    $rootScope.postimages.splice(0, 1);
}


    $rootScope.category=['Choose Your Category','Babys & Kids','Furniture','Clothing & Shoes','Cosmetics','Home Appliances','Watches','Toys']

    $rootScope.post={
        title:'',
        category:$scope.category[0],
        description:'',
        usedrange:0,
        currency:'',
        firmprice:'',
        facebook:'',
        location:''
    }
    $scope.textclick=function()
    {
        $scope.posttitle=false;
        $scope.postcat=false;
        $scope.postprice=false;
    }
    $scope.posttitle=false;
    $scope.postimages2=false;
    $scope.postcat=false;
    $scope.postprice=false;
    $scope.postimage=function(post)
    {

        if($rootScope.postimages.length==0)
        {
             $scope.postimages2=true;
        }
        else if(post.title=='')
        {
            $scope.posttitle=true;
        }
        else{
            $state.go('details');
        }
    }


//    details

    $scope.gotoprice=function(post)
    {
        if(post.category=='Choose Your Category')
        {
            $scope.postcat=true;
        }
        else{
            $state.go('price');
        }
    }
    $scope.gotofinish=function(post)
    {
        if(post.currency=='')
        {
            $scope.postprice=true;
        }
        else{
            $state.go('finish');
        }
    }
$scope.gotolocation=function()
{
    $state.go('location');
//    var posOptions = {timeout: 10000, enableHighAccuracy: true};
//    $cordovaGeolocation
//        .getCurrentPosition(posOptions)
//        .then(function (position) {
//            $rootScope.lat  = position.coords.latitude;
//            $rootScope.long = position.coords.longitude;
////            var GEOCODING ='http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true';
//            var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';
//            $.getJSON(GEOCODING).done(function(location) {
//                console.log(location);
//                $rootScope.post.location=location.results[3].address_components[1].long_name;
//                console.log($rootScope.post.location);
//            })
//
//        }, function(err) {
//
//        })
}
});