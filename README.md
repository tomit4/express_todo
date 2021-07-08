<center>TO DO LIST APP</center>
---
<center><image src="./do_thing_01.jpg"></center>

<font size = "3">

#### A First Attempt at a To Do List Application...I need help...
If you are reading this, then you have stumbled upon my first attempt at making a To Do List Application using NodeJS, Express, and basic HTML/CSS.  This application also reads/writes data to a MariaDB Database (albeit imperfectly at the time of this writing).  In order to experience the unintended behavior of this application, you'll need to install a few dependencies as well as create a user, database, and table per the specifications of the files herein.

If you wish simply to see the code I have referenced in my search for help, please see the index.js, listworks.js, and mylist.js files to inspect specifically the fetch api code where I believe I have an error related to asynchronicity.

As it stands now, the code only saves some of the list items submitted to the MariaDB database, and while I believe it has to do with asynchronicity, as a new coder, I am unsure as to how to resolve the matter.  Here are some pics of the strange behavior I am getting now:

The first image shows the items to be submitted:
<center><image src="./maria_error01.jpg"></center>
The second image shows the items that were submitted to MariaDB:
<center><image src="./maria_error02.jpg"></center>

Any help or insight one can give, please contact me via the post that led you here.

Below are more basic README instructions for the application itself (incomplete).

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

#### Install To Do List App:

Next we'll need to actually download the project:

##### Clone the Repository:

```git clone https://github.com/tomit4/express_todo.git```

And install all needed dependencies:

##### Install Dependencies:

Navigate to your express_todo directory, and from your terminal, enter:

```npm install```

This will automatically install all dependencies necessary to run and test the application.

##### Start the Server:

To start the Server, simply navigate to your express_todo directory, and from your terminal, enter:

```nodemon app.js```

Open up your favorite browser, and in the address bar type:

```localhost:3000```

<font size="3">

*Please note that this project was written by a beginner, it is my best attempt at creating a simple To Do List thus far and is more of a documentation of my practice with basic HTML, CSS and Vanilla JavaScript.  This project will be updated in the near future to add more features and clean up the code.*