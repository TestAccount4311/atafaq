
Atafaq.controller('homectrl', function($scope,$state,$ionicLoading,$rootScope) {
    $rootScope.showmenuheader=true;
    $rootScope.showmenuheader2=false;
    $rootScope.ownershow=1;
    $(document).ready(function(){
        $(".side-btn").click(function(){
            $(".slide-search").slideToggle();
            $(".search-backdrop").toggle();
        });
    });
});