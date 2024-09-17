-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2023 at 08:10 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce2`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `price` decimal(10,2) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `footsize` int(11) DEFAULT 40
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`price`, `user_id`, `product_id`, `quantity`, `footsize`) VALUES
(0.00, 14, 16, 4, 39),
(0.00, 14, 18, 2, 37);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(10) NOT NULL,
  `category_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Category 1'),
(2, 'Category 2'),
(3, 'Category 3'),
(4, 'Category 4'),
(5, 'Category 5');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `comment_id` int(11) NOT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`user_id`, `product_id`, `comment`, `comment_id`, `time`) VALUES
(9, 16, 'hello ', 14, '2023-11-12 06:10:11'),
(9, 16, 'good', 15, '2023-11-12 06:30:57'),
(9, 16, 'good', 16, '2023-11-12 06:31:04'),
(9, 17, 'good', 17, '2023-11-12 06:53:56'),
(9, 17, 'good', 18, '2023-11-12 06:54:03'),
(9, 17, 'good', 19, '2023-11-12 06:54:06'),
(20, 17, 'hi', 20, '2023-11-12 07:55:20');

-- --------------------------------------------------------

--
-- Table structure for table `footsize`
--

CREATE TABLE `footsize` (
  `footsize_id` int(11) NOT NULL,
  `footsize` decimal(5,2) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_date` date NOT NULL DEFAULT current_timestamp(),
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_date`, `order_id`, `user_id`, `total_price`) VALUES
('2023-01-04', 5, 5, 24.00),
('2023-11-12', 9, 9, 160.00),
('2023-11-12', 10, 9, 192.00),
('2023-11-12', 11, 9, 80.00),
('2023-11-12', 12, 9, 192.00),
('2023-11-12', 13, 9, 656.00),
('2023-11-12', 14, 9, 32.00),
('2023-11-12', 15, 20, 240.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `order_details_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `price_after_discount` decimal(10,2) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `gender` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `image`, `name`, `description`, `price`, `price_after_discount`, `category_id`, `gender`, `created_at`) VALUES
(16, 'menshoes2.jpg', 'BUMA', 'buma shoes', 100.00, 80.00, 2, 'Male', '2023-11-12 12:45:46'),
(17, 'menshoes3.jpg', 'BUMA', 'buma NIKE shoes', 70.00, 60.00, 2, 'Male', '2023-11-12 13:19:18'),
(18, 'womenshoes3.jpg', 'BUMA', 'buma NIKE shoes', 19.99, 16.49, 2, 'Female', '2023-11-12 13:19:50'),
(19, 'white.avif', 'NIKE JORDAN', 'nike  shoes', 19.99, 16.49, 2, 'Female', '2023-11-12 13:20:02'),
(20, 'menshoes10.jpg', 'NIKE JORDAN', 'adidas NIKE shoes', 100.00, 80.00, 2, 'Male', '2023-11-12 13:20:29'),
(21, 'menshoes9.jpg', 'NIKE JORDAN', 'adidas NIKE shoes', 80.00, 60.00, 2, 'Male', '2023-11-12 13:20:23'),
(22, 'womenshoes4.jpg', 'NIKE JORDAN', 'adidas NIKE shoes', 60.00, 40.00, 2, 'Female', '2023-11-12 14:56:01'),
(29, 'womenshoes5.jpg', 'BUMA				', '	buma shoes', 100.00, 80.00, 2, 'Female', '2023-11-12 18:47:38');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role` varchar(100) DEFAULT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role`, `role_id`) VALUES
('Admin', 1),
('User', 2),
('Guest', 3),
('Manager', 4),
('Employee', 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `image` varchar(100) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(11) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT 2,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`image`, `id`, `username`, `password`, `email`, `role_id`, `created_at`) VALUES
('user5.jpg', 5, 'isra', '123456', 'isr@gmail.com', 2, '2023-11-12 08:14:49'),
(NULL, 9, 'testuser', 'testpasswor', 'testuser@example.com', 2, '2023-11-11 09:49:34'),
(NULL, 10, 'abod ', 'abod12345', 'userahmad@example.com', 2, '2023-11-11 09:52:43'),
(NULL, 12, 'newusername', 'newpassword', 'newemail@example.com', 2, '2023-11-11 17:53:21'),
(NULL, 13, 'abdalrahman', 'Abod12345', 'abdalhababseh@outlook.com', 1, '2023-11-12 08:37:11'),
(NULL, 14, 'shimaa', '1234567', 'shimaa@gmail.com', 2, '2023-11-12 13:40:47'),
('path/to/userimage1.jpg', 15, 'your_username', 'your_passwo', 'your_email@example.com', 2, '2023-11-12 08:22:39'),
('path/to/userge1.jpg', 17, 'yourame', 'youword', 'your_email@emple.com', 2, '2023-11-12 08:23:12'),
(NULL, 18, 'israkk', '123456', 'israaamer28112811@gmail.com', 2, '2023-11-12 08:24:53'),
('path/to/userimage.jpg', 19, 'isrraaa', '1234433', 'new-email@example.com', 2, '2023-11-12 12:47:44'),
(NULL, 20, 'browm', 'abod1234', 'testser@example.com', 2, '2023-11-12 15:54:30'),
(NULL, 21, 'assaS', '123456', 'israa2SS8@gmail.com', 2, '2023-11-12 17:50:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `higg` (`product_id`),
  ADD KEY `hi` (`user_id`);

--
-- Indexes for table `footsize`
--
ALTER TABLE `footsize`
  ADD PRIMARY KEY (`footsize_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`order_details_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `footsize`
--
ALTER TABLE `footsize`
  MODIFY `footsize_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `order_details_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `hi` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `higg` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `footsize`
--
ALTER TABLE `footsize`
  ADD CONSTRAINT `footsize_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
