-- Table pour les œuvres d'art
CREATE TABLE `artwork` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(45) NULL,
  `latitude` DECIMAL(9,6) NOT NULL,
  `longitude` DECIMAL(9,6) NOT NULL,
  `first_post_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

-- Table pour les utilisateurs
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `pseudo` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `inscription_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `is_admin` TINYINT NOT NULL,
  UNIQUE INDEX `pseudo_UNIQUE` (`pseudo`),
  UNIQUE INDEX `email_UNIQUE` (`email`)
) ENGINE = InnoDB;

-- Table pour les photos
CREATE TABLE `photos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `photo_src` VARCHAR(200) NULL,
  `post_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `validation_status` TINYINT NOT NULL,
  `users_id` INT NOT NULL,
  `artwork_id` INT NOT NULL,
  INDEX `fk_photos_users_idx` (`users_id`),
  INDEX `fk_photos_artwork1_idx` (`artwork_id`),
  CONSTRAINT `fk_photos_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_photos_artwork1`
    FOREIGN KEY (`artwork_id`)
    REFERENCES `artwork` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;
