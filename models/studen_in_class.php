<?php
    require('../config.php');
    $getMaLop=$_GET['MaLop'];
    $sql='select * from SinhVien where MaLop="'.$getMaLop.'"';
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
