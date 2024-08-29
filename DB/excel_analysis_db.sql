-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2024 at 10:01 AM
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
-- Database: `excel_analysis_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `excel`
--

CREATE TABLE `excel` (
  `File_ID` int(11) NOT NULL,
  `File_Path` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `excel`
--

INSERT INTO `excel` (`File_ID`, `File_Path`) VALUES
(1, './uploads/file3'),
(2, '0'),
(3, 'uploads'),
(4, 'uploads'),
(6, 'UPLOADS 55'),
(8, 'uploads');

-- --------------------------------------------------------

--
-- Table structure for table `exp`
--

CREATE TABLE `exp` (
  `Exp_ID` int(11) NOT NULL,
  `Exp_Name` varchar(250) NOT NULL,
  `File_ID` int(11) NOT NULL,
  `Target_Gas_ID` int(11) NOT NULL,
  `Start_Exp` datetime NOT NULL,
  `End_Exp` datetime NOT NULL,
  `Gas_Slope` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exp`
--

INSERT INTO `exp` (`Exp_ID`, `Exp_Name`, `File_ID`, `Target_Gas_ID`, `Start_Exp`, `End_Exp`, `Gas_Slope`) VALUES
(3, 'test 3', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 123),
(4, 'test 4', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 123),
(5, 'test 5', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 123);

-- --------------------------------------------------------

--
-- Table structure for table `gas`
--

CREATE TABLE `gas` (
  `Gas_ID` int(11) NOT NULL,
  `Gas_Name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gas`
--

INSERT INTO `gas` (`Gas_ID`, `Gas_Name`) VALUES
(1, 'h2o');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `excel`
--
ALTER TABLE `excel`
  ADD PRIMARY KEY (`File_ID`),
  ADD UNIQUE KEY `File_ID` (`File_ID`);

--
-- Indexes for table `exp`
--
ALTER TABLE `exp`
  ADD PRIMARY KEY (`Exp_ID`),
  ADD UNIQUE KEY `Exp_ID` (`Exp_ID`),
  ADD KEY `Exp_fk2` (`File_ID`),
  ADD KEY `Exp_fk3` (`Target_Gas_ID`);

--
-- Indexes for table `gas`
--
ALTER TABLE `gas`
  ADD PRIMARY KEY (`Gas_ID`),
  ADD UNIQUE KEY `Gas_ID` (`Gas_ID`),
  ADD UNIQUE KEY `Gas_Name` (`Gas_Name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `excel`
--
ALTER TABLE `excel`
  MODIFY `File_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `exp`
--
ALTER TABLE `exp`
  MODIFY `Exp_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `gas`
--
ALTER TABLE `gas`
  MODIFY `Gas_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `exp`
--
ALTER TABLE `exp`
  ADD CONSTRAINT `Exp_fk2` FOREIGN KEY (`File_ID`) REFERENCES `excel` (`File_ID`),
  ADD CONSTRAINT `Exp_fk3` FOREIGN KEY (`Target_Gas_ID`) REFERENCES `gas` (`Gas_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
