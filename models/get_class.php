<?php
    require('../config.php');
    $getMaLop=$_GET['MaLop'];
    // $getSoHang=$_POST['SoHang'];
    // $getCode=$_POST['Code'];
    //$sql='select * from Lop where MaLop='.$getMaLop;
    $result = mysqli_query($conn,'select * from Lop where MaLop='.$getMaLop); 
    $row=mysqli_fetch_assoc($result);
    // if($row== null){
    //     echo 'loi'
    // }else{
    //     echo 'thanh cong'
    //     //echo $result;        
    // };
    echo 'thanh cong';
    // mysql_close($conn);
?>
<!-- json_encode($result) -->