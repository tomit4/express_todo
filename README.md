<center><h1>TO DO LIST APPLICATION</h1></center>

<center><image src="./do_list.jpg"></center>

<font size = "3">

#### A First Attempt at a To Do List Application
This repository contains my first attempts at creating a Full Stack To Do List Application.  Thus far, the project has been a relative success!  As the project stands right now, the application interfaces with a MariaDB SQL Database on the back end, routing through a NodeJS/ExpressJS server from a HTML/CSS/Vanilla JavaScript front end.  The upcoming features to be added are an Edit/PATCH feature, which will include a popup form on the front end.  I also plan to add a Login Feature where a user can log into MariaDB from the front end.  Obviously this is still under development, and the main objective of this project is to learn the basics of creating a very simple full stack application.  In order to utilize the application as it is now, you will need to install a few simple tools and have an instance of MariaDB installed.

#### Install NodeJS:
You'll first need NodeJS and it's package manager, NPM:

##### Windows/Apple:

[Install NodeJS/NPM](https://nodejs.org/en/download/)

##### Debian/Ubuntu Linux:

From your terminal, enter:

```sudo apt install nodejs```
```sudo apt install npm```

##### Arch Linux:

From your terminal, enter:

```sudo pacman -S nodejs```
```sudo pacman -S npm```

Depending on your particular distribution, you may need to look up further documentation on how to install NodeJS and the Node Package Manager.

#### Install MariaDB:

You'll need to spin up a MariaDB database that will persist your To Do List, so first you'll need to install MariaDB.
Installing MariaDB has multiple steps and is not as simple as inputting a single command, so the following links should be followed depending on which Operating System you are using:

##### Debian/Ubuntu Linux:

[Install MariaDB on Debian/Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-20-04)

##### Arch Linux:

[Install MariaDB on Arch Linux](https://wiki.archlinux.org/title/MariaDB)

##### Windows/Apple:

[Installation/Setup Instructions](https://mid.as/kb/00197/install-configure-mariadb-on-windows)
[Installation Media from MariaDB Official Website](https://downloads.mariadb.org/)

##### After Installation:

Once MariaDB has been installed, you'll need to create a user and a password, as well as grant that user privileges to read/write from/to the database.  A simple way of creating this is to login to MariaDB as root:

```sudo mariadb```

And create a user and password:

```CREATE USER 'myname' @ 'localhost' IDENTIFIED BY 'mypassword'```

And grant that user all privileges (note that granting all privileges could be insecure, consider deleting user once testing this app is done):

```GRANT ALL PRIVILEGES on *.* TO myname@localhost IDENTIFIED BY 'mypassword';```

Then we'll need to create a database and table:

```CREATE DATABASE tasks;```

```CREATE TABLE to_do (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, task VARCHAR(28) NOT NULL) Engine=InnoDB;```

And that should do it, we're finally ready to install the To Do List App:

#### Install To Do List App:

Next we'll need to actually download the project.  Navigate to a directory you're comfortable downloading the application to and:

##### Clone the Repository:

```git clone https://github.com/tomit4/express_todo.git```

And install all needed dependencies:

##### Install Dependencies:

Navigate to your express_todo directory, and from your terminal, enter:

```npm install```

This will automatically install all dependencies necessary to run and test the application.

##### Create a .env-local file:

For security purposes, creating a .env-local file will pass sensitive login information to the server, first create the file:

```touch .env-local```

And enter the following (put in your own username and password):

<font size="2">

PORT=3000
DB_HOST=localhost
DB_USER=myname
DB_PASS=mypassword
DB_NAME=tasks


<font size="3">
##### Start the Server:

To start the Server, simply navigate to your express_todo directory, and from your terminal, enter:

```npm run todo```

Open up your favorite browser, and in the address bar type:

```localhost:3000```

And that's it!  Enjoy creating To Do List Items that will persist to a MariaDB Database!

<font size="2">

*Please note that this project was written by a beginner, it is my best attempt at creating a simple To Do List thus far and is more of a documentation of my practice with basic HTML, CSS and Vanilla JavaScript.  This project will be updated in the near future to add more features and clean up the code.*