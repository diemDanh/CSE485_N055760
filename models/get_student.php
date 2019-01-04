<?php
    require('../config.php');
    $str='';
    $getMaLop=$_GET['MaLop'];
    mysqli_set_charset($conn,"utf8");
    $sql='select * from SinhVien where MaLop="'.$getMaLop.'"';
    $result = mysqli_query($conn,$sql); 
    echo '[';
    while($row =mysqli_fetch_assoc($result)){
        // $str=$str."'".json_encode($row)."',";
        echo json_encode($row);
        
    }
    // echo $sql;
    echo ']';
    mysqli_close($conn);
?>
