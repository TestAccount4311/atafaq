
Atafaq.controller('alertctrl', function($scope,$state,$ionicLoading,$rootScope) {
    $rootScope.showmenuheader=true;
    $rootScope.choosemenubut=3;
    $(document).ready(function(){
        $(".side-btn").click(function(){
            $(".slide-search6").slideToggle();
            $(".search-backdrop").toggle();
        });
    });
});