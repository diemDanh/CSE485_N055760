<?php
    $ketQua= file_get_contents("php://input");
    $ketqua= json_decode($ketQua);
    
    $sql='select * from Lop where MaLop="'.$ketqua->MaL.'"';
    //echo $sql;
    require('../config.php');
    mysqli_set_charset($conn,"utf8");
    if(!$conn){
        die('Loi ket noi'.mysqli_connect_error());
    }else{
        mysqli_set_charset($conn,"utf8");
        $result = mysqli_query($conn,$sql);
        $row =mysqli_fetch_assoc($result);
        
        echo json_encode($row);
        // if($data){
        //     echo json_encode($data);
        // }else{
        //     echo 'Failed';
        // }
        
    }
    // mysql_close($conn);
?>