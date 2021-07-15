<center><image src="./do_list.jpg"></center>

<font size = "3">
<h4 style=color:#206557ff>A First Attempt at a To Do List Application<h4>
####
<p style=color:#206557ff>This repository contains my first attempts at creating a Full Stack To Do List Application.  As the project stands right now, the application interfaces with a MariaDB SQL Database on the back end, routing through a NodeJS/ExpressJS server from a HTML/CSS/Vanilla JavaScript front end.  It currently exemplifies full CRUD (Create, READ, UPDATE, and DELETE) functionality.  There are still some bugs and unexpected behavior to be addressed.</p>
<p style=color:#206557ff>There are also additional features such as timestamps and login credentials I would like to implement in the near future.  All in all though, the project is a good reference point on how to utilize JavaScript's fetch API to interact with a NodeJS/ExpressJS backend alongside the MariaDB module.</p>

<p style=color:#206557ff>In order to utilize the application as it is now, you will need to install a few simple tools and have an instance of MariaDB installed.</p>

<h4 style=color:#206557ff>Install NodeJS<h4>
####
<p style=color:#206557ff>You'll first need NodeJS and it's package manager, NPM:</p>

<h5 style=color:#206557ff>Windows/Apple</h5>
#####
<a style=color:#00ae8cff href="https://nodejs.org/en/download/">Install NodeJS/NPM</a>

<h5 style=color:#206557ff>Debian/Ubuntu Linux:</h5>
#####
<p style=color:#206557ff>From your terminal, enter:</p>

```sudo apt install nodejs```
```sudo apt install npm```

<h5 style=color:#206557ff>Arch Linux</h5>
#####
<p style=color:#206557ff>From your terminal, enter:</p>

```sudo pacman -S nodejs```
```sudo pacman -S npm```

<p style=color:#206557ff>Depending on your particular distribution, you may need to look up further documentation on how to install NodeJS and the Node Package Manager.</p>

<h4 style=color:#206557ff>Install MariaDB:</h4>
#####
<p style=color:#206557ff>You'll need to spin up a MariaDB database that will persist your To Do List, so first you'll need to install MariaDB.
Installing MariaDB has multiple steps and is not as simple as inputting a single command, so the following links should be followed depending on which Operating System you are using:</p>

<h5 style=color:#206557ff>Debian/Ubuntu Linux</h5>
#####
<a style=color:#00ae8cff href="https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-20-04">Install MariaDB on Debian/Ubuntu</a>

<h5 style=color:#206557ff>Arch Linux</h5>
#####
<a style=color:#00ae8cff href="https://wiki.archlinux.org/title/MariaDB">Install MariaDB on Arch Linux</a>

<h5 style=color:#206557ff>Windows/Apple:</h5>
#####
<a style=color:#00ae8cff href="https://mid.as/kb/00197/install-configure-mariadb-on-windows">Installation/Setup Instructions</a>
<a style=color:#00ae8cff href="https://downloads.mariadb.org/">MariaDB Official Website</a>

<h5 style=color:#206557ff>After Installation:</h5>
#####
<p style=color:#206557ff>Once MariaDB has been installed, you'll need to create a user and a password, as well as grant that user privileges to read/write from/to the database.  A simple way of creating this is to login to MariaDB as root:</p>

```sudo mariadb```

<p style=color:#206557ff>And create a user and password:</p>

```CREATE USER 'myname' @ 'localhost' IDENTIFIED BY 'mypassword'```

<p style=color:#206557ff>And grant that user all privileges (note that granting all privileges could be insecure, consider deleting user once testing this app is done):</p>
```GRANT ALL PRIVILEGES on *.* TO myname@localhost IDENTIFIED BY 'mypassword';```

<p style=color:#206557ff>Then we'll need to create a database and table:</p>

```CREATE DATABASE tasks;```

```CREATE TABLE to_do (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, task VARCHAR(28) NOT NULL) Engine=InnoDB;```

<p style=color:#206557ff>And that should do it, we're finally ready to install the To Do List App:</p>

<h4 style=color:#206557ff>Install To Do List App:</h4>

####
<p style=color:#206557ff>Next we'll need to actually download the project.  Navigate to a directory you're comfortable downloading the application to and:</p>

<h5 style=color:#206557ff>Clone the Repository:</h5>

#####
```git clone https://github.com/tomit4/express_todo.git```

<p style=color:#206557ff>And install all needed dependencies:</p>

<h5 style=color:#206557ff>Install Dependencies:</h5>

#####
<p style=color:#206557ff>Navigate to your express_todo directory, and from your terminal, enter:</p>
```npm install```

<p style=color:#206557ff>This will automatically install all dependencies necessary to run and test the application.</p>

<h5 style=color:#206557ff>Create a .env-local file:</h5>

#####
<p style=color:#206557ff>For security purposes, creating a .env-local file will pass sensitive login information to the server, first create the file:</p>

```touch .env-local```

<p style=color:#206557ff>And enter the following, (put in your own username and password):</p>



```PORT=3000```

```DB_HOST=localhost```

```DB_USER=myname```

```DB_PASS=mypassword```

```DB_NAME=tasks```

<h5 style=color:#206557ff>Start the Server:</h5>

#####
<p style=color:#206557ff>To start the Server, simply navigate to your express_todo directory, and from your terminal, enter:</p>

```npm run todo```

<p style=color:#206557ff>Open up your favorite browser, and in the address bar type:</p>

```localhost:3000```

<p style=color:#206557ff>And that's it!  Enjoy creating To Do List Items that will persist to a MariaDB Database!</p>

<font size="2">

*Please note that this project was written by a beginner, it is my best attempt at creating a simple To Do List thus far and is more of a documentation of my practice with basic HTML, CSS and Vanilla JavaScript.  This project will be updated in the near future to add more features and clean up the code.*