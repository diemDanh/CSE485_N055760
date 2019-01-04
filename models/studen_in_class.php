<?php
    require('../config.php');
    $getMaLop=$_GET['MaLop'];
    $getMaSV=$_GET['MaSV'];
    $sql='select * from SinhVien where MaSV= "'.$getMaSV.'"';
    mysqli_set_charset($conn,"utf8");
    $result = mysqli_query($conn,$sql); 
    $row=mysqli_fetch_assoc($result);
    if($row==NULL){
        echo $sql;
    }else{
        // echo 'thanh cong';
        echo json_encode($row);        
    };
    mysqli_close($conn);
?>
