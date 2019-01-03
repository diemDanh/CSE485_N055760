<?php
    $conn=mysqli_connect('localhost','root','','website');
    // if(!$conn){
    //     die('Loi ket noi'.mysqli_connect_error());
    // }else{
    //     echo 'thanh cong';
        
    // }
    //$result = mysqli_query($conn,$sql);
    // used to get mysql database connection
    // class Database{
    
    //     // specify your own database credentials
    //     private $host = "localhost";
    //     private $db_name = "php_login_system";
    //     private $username = "root";
    //     private $password = "123456";
    //     public $conn;
    
    //     // get the database connection
    //     public function getConnection(){
    
    //         $this->conn = null;
    
    //         try{
    //             $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
    //         }catch(PDOException $exception){
    //             echo "Connection error: " . $exception->getMessage();
    //         }
    
    //         return $this->conn;
    //     }
    // }
    // mysql_close($conn);
?>