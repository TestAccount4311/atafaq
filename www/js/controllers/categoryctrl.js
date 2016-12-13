
Atafaq.controller('categoryctrl', function($scope,$state,$ionicLoading,$rootScope) {
    $rootScope.showmenuheader=true;
    $rootScope.choosemenubut=2;
    $(document).ready(function(){
        $(".side-btn").click(function(){
            $(".slide-search3").slideToggle();
            $(".search-backdrop").toggle();
        });
    });
});