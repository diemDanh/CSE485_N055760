<?php
    $ketQua= file_get_contents("php://input");
    $ketqua= json_decode($ketQua);

    $sql=$ketqua->gSQL;
    //echo $sql;
    require('../config.php');
    if(!$conn){
        die('Loi ket noi'.mysqli_connect_error());
    }else{
        mysqli_set_charset($conn,"utf8");
        if(mysqli_query($conn,$sql)){
            echo $sql;
        }else{
            echo 'Failed';
        }
        
    }
    mysql_close($conn);
?>