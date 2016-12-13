Atafaq

/*******************************************************
 COMMON AJAX SERVICE
 ********************************************************/
.factory('ajaxService', function($http) {
    return {
        ajaxCall: function(datas) {
            // alert(JSON.stringify(datas))
            // alert(datas.request);

            return $http({
                method: 'POST',
//        url: 'http://localhost/karmarang/api/'+datas.request,
                url: 'http://www.sicsglobal.com/HybridApp/Atafaq/Atafaq API/apis.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: datas
            }).success(function(data) {
                return data;
            });
        }
    }
})
.factory('uploadservice',function($ionicActionSheet,$cordovaCamera,$ionicPopup,$q,$ionicLoading,$cordovaFileTransfer,$rootScope){

//    function loadingshow(){
//        $ionicLoading.show({
//            template: '<div align="center" ><img src="img/gif-loader.gif" width="30" height="30"></div>'
//        });
//    }


    function capturephoto(callback){
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA
        };
        $cordovaCamera.getPicture(options).then(function (imageURI) {
            return callback(imageURI);
        }, function (err) {
            $ionicPopup.alert({
                title: "Failed to upload!"
            });
        });
    }


    function captureFromGallery(callback){
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
                return callback(fileEntry.nativeURL);
            });
        }, function (err) {
            $ionicPopup.alert({
                title: "Failed to upload!"
            });
        });
    }

    function actionsheet(){
        var q=$q.defer();
        $ionicActionSheet.show({
            titleText: "Atafaq",
            buttons: [
                {text: "Take A Picture"},
                {text: "Upload From Gallery"}
            ],
            cancel: function () {
                //console.log('CANCELLED');
            },
            buttonClicked: function (index) {
                if (index == 0) {
                    capturephoto(function(url){
                        q.resolve(url);
                    });
                }
                else if (index == 1) {
                    captureFromGallery(function(url){
                        q.resolve(url)
                    });
                }
                //console.log('BUTTON CLICKED', index);
                return true;
            },
            destructiveButtonClicked: function () {
                //console.log('DESTRUCT');
                return true;
            }
        });
        return q.promise;
    }

    function uploadfile(uri,pic){
        var q = $q.defer();
        $ionicLoading.show();
        var server = 'http://www.sicsglobal.com/HybridApp/Atafaq/Atafaq API/upload.php';
        var options = new FileUploadOptions();
        options.fileKey = 'Image_File';
        options.fileName = uri.substr(uri.lastIndexOf('/') + 1);
        options.mimeType = 'image/jpeg';
        options.chunkedMode = false;
        $cordovaFileTransfer.upload(server, uri, options, true)
            .then(function (r) {
                $ionicLoading.hide();
                q.resolve(r.response);

            }, function (err) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: "Failed to upload!"
                });
            }, function (progress) {
                //alert(JSON.stringify(progress));
            });
        return q.promise;
    };



    return {
        showactionsheet : actionsheet,
        uploadfile : uploadfile
    }

})
.directive('eventFocus', function(focus) {
    return function(scope, elem, attr) {
        elem.on(attr.eventFocus, function() {
            focus(attr.eventFocusId);
        });

        // Removes bound events in the element itself
        // when the scope is destroyed
        scope.$on('$destroy', function() {
            element.off(attr.eventFocus);
        });
    };
})
    .factory('focus', function($timeout, $window) {
        return function(id) {
            // timeout makes sure that is invoked after any other event has been triggered.
            // e.g. click events that need to run before the focus or
            // inputs elements that are in a disabled state but are enabled when those events
            // are triggered.
            $timeout(function() {
                var element = $window.document.getElementById(id);
                if(element)
                    element.focus();
            });
        };
    });

