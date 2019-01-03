angular.module('MyApp', ['angular-js-xlsx'])
.controller('myController', function($scope,$http) {
	$scope.read = function (workbook) {
		var sql="INSERT INTO sinhVien (MSV, fName,lName,class) VALUES ";
		var headerNames = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];
		var data = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);

		console.log(headerNames);
		console.log(data);

		for (var row in data)
		{   
			if(row!=0) sql+=',';
			sql+='('+data[row]['msv']+",'"+data[row]['fName']+"','"+data[row]['lName']+"','"+data[row]['classes']+"')"
		}
		sql+=';';
		// console.log(sql);
		
		var data={
			gSQL:sql
		};
		var url='import_excel.php';
		var config={ 
			headers:{
				'Content-Type': 'application/json' 
			}
		};
		$http.post(url,{gSQL:sql},config).then(function(data){
			console.log(data);
		},function(data){
			console.log('Loi'+data);
		});
		$scope.error = function (e) {
			console.log(e);
		}
	}
});
