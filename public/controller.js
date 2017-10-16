
var nodeTest = angular.module('nodeTest', ['ngLodash', 'chart.js']);
function mainController($scope, $http, lodash) {
		$http(
			{
				method: 'GET',
				url: 'https://test.bandgi.com/cnirestapi/customers/1000004/devices/13108003383649/sensorinfo',
				headers: {
			    token:'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MDgzMTkyNjYsInN1YiI6InRlc3RhZG1pbkBnbWFpbC5jb20iLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE1MDc3MTQ0NjYyNjZ9.S9EbjHLNZfDFjgCrOXwfcEBeVht-i9BV_EFwzl35ANHcuuS6PzLz54fIv6V3pZue4jKiKDK-YcUk7T5c5X4cXQ'
				}
		}).success(function(response) {
			$scope.sensorInfo = response.SensorInfo;
			$scope.scaleStartValue =  0;
      $scope.options ={
        legend: {
          display: true,

        }
      };
 			$scope.colors =[ '#4b78c6', '#32b55e', '#78b532', '#a6b297', '#b0b2ae', '#ce2745', '#e0dd82'];
			$scope.series = [];
 			$scope.data = [];
			$scope.labels =[];
			// $scope.labels = [$scope.sensorInfo.deviceSensorData[0].measurementTime, $scope.sensorInfo.deviceSensorData[1].measurementTime];
			lodash.forEach($scope.sensorInfo.DisplaySensorTypes, function(thisDisplaySensor, key){
				if(thisDisplaySensor === true){
					console.log(key);
					$scope.series.push(key);
					var values=[]
					lodash.forEach($scope.sensorInfo.deviceSensorData, function(item){
						if($scope.labels.indexOf(item.measurementTime) === -1){
							$scope.labels.push(item.measurementTime);
						}
						if(key=== 'CO'){
							key = 'carbonMonoxide';
						}
						if(key=== 'RSSI'){
							key = 'rssi';
						}
						if(item[key] === 'False'){
							values.push("0");
						}
						else{
							values.push(item[key]);
						}
					});
					$scope.data.push(values);
				}
			});
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

}
