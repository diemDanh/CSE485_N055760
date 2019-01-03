CREATE DATABASE website;

CREATE TABLE users (
	username VARCHAR(50) PRIMARY KEY NOT NULL,
	pass VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	fullname VARCHAR(50) NOT NULL,
	createdate DATETIME NOT NULL,
	is_block TINYINT(4) NOT NULL DEFAULT '0',
	permision TINYINT(4) NOT NULL DEFAULT '0',
	UNIQUE (email)
);



CREATE TABLE adminSystem (
	adminName VARCHAR(50) PRIMARY KEY NOT NULL,
	adminPass VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	createdate DATETIME NOT NULL,
	is_block TINYINT(4) NOT NULL DEFAULT '0',
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
    MaViTri char(100),
    SoNgayNghi int);

CREATE TABLE NgayNghi(
	MaSV char (50) REFERENCES SinhVien(MaSV),
	Ngay DATA,
	note CHAR(255) DEFAULT '',
	PRIMARY KEY (MaSV,Ngay)
);
GO
CREATE TRIGGER updatesl ON NgayNghi AFTER INSERT AS
BEGIN
	UPDATE SinhVien
	set SoNgayNghi=SoNgayNghi+1
	WHERE SinhVien.MaSv=INSTEAD.MaSV
END
CREATE TABLE HeSo(
	truNghi int DEFAULT (-1),
	cong int
);

