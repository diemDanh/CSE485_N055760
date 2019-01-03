<?php
    require('../config.php');
    $getMaSoDo=$_POST['MaSoDo'];
    $getSoHang=$_POST['SoHang'];
    $getMaLop=$_POST['MaLop'];
    $getUserName=$_POST['UserName'];
    $sql='INSERT INTO Lop (MaLop,MaSoDo,SoHang,UserName) VALUES ("'.$getMaLop.'",'.$getMaSoDo.','.$getSoHang.',"'.$getUserName.'")';
    $result = mysqli_query($conn,'select * from Lop where MaLop="'.$getMaLop.'"'); 
    $row=mysqli_fetch_assoc($result) ;
    if($row == null){
        if(mysqli_query($conn,$sql)){
            echo 'thanh cong';
        }else{
            echo $sql;
        }
    }else{
        echo 'da ton tai';        
    };
    // mysql_close();
?>