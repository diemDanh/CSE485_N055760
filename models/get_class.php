<?php
    require('../config.php');
    $getMaLop=$_GET['MaLop'];
    // $getSoHang=$_POST['SoHang'];
    // $getCode=$_POST['Code'];
    $sql='select * from Lop where MaLop="'.$getMaLop.'"';
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
