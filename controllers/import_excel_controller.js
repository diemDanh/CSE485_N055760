angular.module('app', ['ui.grid'])

  .controller('MainCtrl', function ($scope, $http) {
    var vm = this;
    $scope.sql = 'demo';
    vm.gridOptions = {};
    vm.reset = reset;
    vm.autofill=autofill;
    vm.importExcel = importExcel;
    function reset() {
      vm.gridOptions.data = [];
      vm.gridOptions.columnDefs = [];
    }
    function autofill() {

      var url = '../models/auto_fill.php';
      var config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      $http.post(url, { MaL: $scope.MaLop }, config).then(function (data) {
        // console.log();
        var index=0;
          var jsonData = data['data'];
          // console.log(jsonData);
          var ArrayVt = [];
          var MaSoDo = jsonData['MaSoDo'];
          var SoDo = Array.from(MaSoDo);
          var SoHang = jsonData['SoHang'];
          SoDo.forEach(function (sl) {
            for (let i = 0; i < sl; i++) {
              index++;
              for (let hang = 0; hang < SoHang; hang++) {
                var vt = 'day' + index + '-' + hang;
                if(vt!=null)ArrayVt.push(vt);
              }
              
              if ($scope.MaLop == null) alert('ban chua nhap ma lop')
              else {
                var sql = "INSERT INTO SinhVien (MaSV,Ho,Ten,MaLop,MaViTri) VALUES ";
                var table = vm.gridOptions.data;
                var y=0
                for (var row in table) {                  
                  if (row != 0) sql += ',';
                  sql += '(' + table[row]['msv'] + ",'" + table[row]['ho'] + "','" + table[row]['ten'] + "','" + $scope.MaLop + "','"+ArrayVt[y]+"')"
                  y++;console.log(y);
                }
                sql += ';';

                var data = {
                  gSQL: sql
                };
                var url = '../models/import_excel.php';
                var config = {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                };
                $http.post(url, { gSQL: sql }, config).then(function (data) {
                  console.log(data);
                }, function (data) {
                  console.log('Loi' + data);
                });
                $scope.error = function (e) {
                  console.log(e);
                }
              }
            }
          });

      }, function (data) {
        console.log('Loi' + data);
      });
      $scope.error = function (e) {
        console.log(e);
      }
      
    }

    function importExcel() {
      //tao sql
      if ($scope.MaLop == null) alert('ban chua nhap ma lop')
      else {
        var sql = "INSERT INTO SinhVien (MaSV,Ho,Ten,MaLop) VALUES ";
        var table = vm.gridOptions.data;
        for (var row in table) {
          if (row != 0) sql += ',';
          sql += '(' + table[row]['msv'] + ",'" + table[row]['ho'] + "','" + table[row]['ten'] + "','" + $scope.MaLop + "')"
        }
        sql += ';';

        var data = {
          gSQL: sql
        };
        var url = '../models/import_excel.php';
        var config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        $http.post(url, { gSQL: sql }, config).then(function (data) {
          console.log(data);
        }, function (data) {
          console.log('Loi' + data);
        });
        $scope.error = function (e) {
          console.log(e);
        }
      }

    }
  })

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

              var workbook = XLSX.read(data, { type: 'binary' });

              var headerNames = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];

              var data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

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