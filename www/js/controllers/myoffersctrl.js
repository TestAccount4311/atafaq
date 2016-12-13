
Atafaq.controller('myoffersctrl', function($scope,$state,$ionicLoading,$rootScope) {
    $rootScope.showmenuheader=true;
    $rootScope.choosemenubut=2;
    $(document).ready(function(){
        $(".side-btn").click(function(){
            $(".slide-search4").slideToggle();
            $(".search-backdrop").toggle();
        });
    });
});