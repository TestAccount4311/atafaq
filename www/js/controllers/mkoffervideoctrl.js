
Atafaq.controller('mkoffervideoctrl', function($scope,$state,$ionicLoading,$rootScope) {
    $rootScope.showmenuheader=true;
    $rootScope.showmenuheader2=false;
    $(document).ready(function(){
        $(".side-btn").click(function(){
            $(".slide-search5").slideToggle();
            $(".search-backdrop").toggle();
        });
    });
});