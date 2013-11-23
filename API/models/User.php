<?php

/*

CREATE TABLE users (
  id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255),
  is_admin BOOL DEFAULT 0,
  facebook_id VARCHAR(255),
  oauth_token VARCHAR(255),
  name VARCHAR(255),
  mail VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  gender VARCHAR(255),
  birthday VARCHAR(255),
  location VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME
);

*/

class User extends ActiveRecord\Model {
    
}