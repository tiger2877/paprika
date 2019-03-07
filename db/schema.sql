### Schema
DROP DATABASE IF EXISTS food_db;
CREATE DATABASE food_db;
USE food_db;

CREATE TABLE foods
(
	id int NOT NULL AUTO_INCREMENT,
	food_name varchar(255) NOT NULL,
	checkout BOOLEAN NOT NULL DEFAULT false,
	calories DECIMAL(10,2) NULL,
	PRIMARY KEY (id)
);