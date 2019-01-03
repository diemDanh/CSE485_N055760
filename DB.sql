CREATE DATABASE website;

CREATE TABLE users (
	username VARCHAR(50) PRIMARY KEY NOT NULL,
	pass VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	fullname VARCHAR(50) NOT NULL,
	createdate DATETIME NOT NULL,
	permision TINYINT(4) NOT NULL DEFAULT '0',
	UNIQUE (email)
);

CREATE table Lop(
    MaLop char (50) PRIMARY KEY not null,
    MaSoDo int(10) not null,
    SoHang int(10) not null,
    UserName varchar(50) NOT NULL REFERENCES users(username)
    );

CREATE table SinhVien(
    MaSV char (50) PRIMARY key,
    MaLop char (50),
    FOREIGN KEY (MaLop) REFERENCES Lop(MaLop),
    Ho char (100) not null,
    Ten char(100) not null,
    MaViTri char(100) DEFAULT '',
    SoNgayNghi int DEFAULT '0',
	CONSTRAINT UC_SinhVien UNIQUE (MaLop,MaViTri)
	);

CREATE TABLE NgayNghi(
	MaSV char (50) REFERENCES SinhVien(MaSV),
	Ngay DATETIME,
	note CHAR(255) DEFAULT '',
	PRIMARY KEY (MaSV,Ngay)
);
CREATE TABLE HeSo(
	truNghi TINYINT(4) DEFAULT '-1',
	cong TINYINT(4)
);

CREATE TRIGGER updatesl AFTER INSERT ON ngaynghi
FOR EACH ROW 
	UPDATE SinhVien
	set SoNgayNghi=SoNgayNghi+1
	WHERE SinhVien.MaSv=INSTEAD.MaSV


