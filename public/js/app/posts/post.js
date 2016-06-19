
    function AppCtrl($scope, $http) {
    console.log("Hello world from controller");

    var refresh = function(){
    $http.get('/contactlist').success(function(response){
        console.log("I got the data I requested");
        $scope.contactlist = response;
        $scope.contact="";
    });
};

refresh();
    $scope.addContact = function(){
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact).success(function(response){
            console.log(response);
            refresh();
        });
    };
   
}
function AppCtrl1($scope, $http) {
    console.log("Hello world from controller");
   
    $http.get('/contactlist').success(function(response){
        console.log("I got the data I requested");
        $scope.contactlist = response;
        
    });
   
}
function AppCtrl2($scope, $http) {
    console.log("Hello world from controller");

    var refresh = function(){
    $http.get('/tweets').success(function(response){
        console.log("I got the data I requested");
        $scope.tweets = response;
        //$scope.tweet="";
    });
};

refresh();
    $scope.addpost = function(){
        console.log($scope.tweet);
        $http.post('/tweets', $scope.tweet).success(function(response){
            console.log(response);
            refresh();
        });
    };
   
}


