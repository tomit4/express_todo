## <p style="text-align:center">TO DO LIST APP</p>

---
<center><image src="./do_thing_01.jpg"></center>

<font size = "3">

#### A First Attempt at a To Do List Application
This is my first attempt at creating a To Do List Application that wasn't simply a CLI application.  In its current form, this To Do List Application isn't perfect, and will need further work as it relies on Local Storage at this time (and there has been some difficulty in getting the "DONE" functionality working on it). Eventually I plan to add a basic Login Page and Database functionality with MariaDB (and possibly KnexJS or some other ORM).

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

<font size="3">

*Please note that this project was written by a beginner, it is my best attempt at creating a simple To Do List thus far and is more of a documentation of my practice with basic HTML, CSS and Vanilla JavaScript.  This project will be updated in the near future to add more features and clean up the code.*