// angular.module('MyApp', ['angular-js-xlsx'])
// .controller('myController', function($scope,$http) {
// 	$scope.read = function (workbook) {
// 		var sql="INSERT INTO sinhVien (MSV, fName,lName,class) VALUES ";
// 		var headerNames = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];
// 		var data = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);

// 		console.log(headerNames);
// 		console.log(data);

// 		for (var row in data)
// 		{   
// 			if(row!=0) sql+=',';
// 			sql+='('+data[row]['msv']+",'"+data[row]['fName']+"','"+data[row]['lName']+"','"+data[row]['classes']+"')"
// 		}
// 		sql+=';';
// 		// console.log(sql);
		
// 		var data={
// 			gSQL:sql
// 		};
// 		var url='import_excel.php';
// 		var config={ 
// 			headers:{
// 				'Content-Type': 'application/json' 
// 			}
// 		};
// 		$http.post(url,{gSQL:sql},config).then(function(data){
// 			console.log(data);
// 		},function(data){
// 			console.log('Loi'+data);
// 		});
// 		$scope.error = function (e) {
// 			console.log(e);
// 		}
// 	}
// });
angular.module('app', ['ui.grid'])

.controller('MainCtrl', ['$scope', function ($scope) {
  var vm = this;  
  vm.gridOptions = {};  
  vm.reset = reset;  
  function reset() {
    vm.gridOptions.data = [];
    vm.gridOptions.columnDefs = [];
  }
}])

.directive("fileread", [function () {
  return {
    scope: {
      opts: '='
    },
    link: function ($scope, $elm, $attrs) {
      $elm.on('change', function (changeEvent) {
        var reader = new FileReader();
        
        reader.onload = function (evt) {
          $scope.$apply(function () {
            var data = evt.target.result;
            
            var workbook = XLSX.read(data, {type: 'binary'});
            
            var headerNames = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];
            
			var data = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);

			function importExcel(){
				var sql="INSERT INTO SinhVien (MaSV,Ho,Ten,MaLop,MaViTri,SoNgayNghi) VALUES ";
				//tao sql
				for (var row in data)
				{   
					if(row!=0) sql+=',';
					sql+='('+data[row]['msv']+",'"+data[row]['fName']+"','"+data[row]['lName']+"','"+data[row]['classes']+"')"
				}
				sql+=';';
				console.log(sql);
				
				// var data={
				// 	gSQL:sql
				// };
				// var url='import_excel.php';
				// var config={ 
				// 	headers:{
				// 		'Content-Type': 'application/json' 
				// 	}
				// };
				// $http.post(url,{gSQL:sql},config).then(function(data){
				// 	console.log(data);
				// },function(data){
				// 	console.log('Loi'+data);
				// });
				// $scope.error = function (e) {
				// 	console.log(e);
				// }
			}
			
            
            $scope.opts.columnDefs = [];
            headerNames.forEach(function (h) {
              $scope.opts.columnDefs.push({ field: h });
            });
            
            $scope.opts.data = data;
            
            $elm.val(null);
          });
        };
        
        reader.readAsBinaryString(changeEvent.target.files[0]);
      });
    }
  }
}]);