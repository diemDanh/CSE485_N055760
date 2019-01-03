<?php
    require('../config.php');
    $getMaSV=$_GET['MaSV'];
    $data='';
    $sql='select * from SinhVien where MaSV="'.$getMaSV.'"';
    $result = mysqli_query($conn,$sql); 
    $row=mysqli_fetch_assoc($result);
    if($row==NULL){
        // echo $sql;
    }else{
        // echo 'thanh cong';
        echo json_encode($row);        
    };
    mysqli_close($conn);
?>
