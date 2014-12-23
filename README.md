#PAT Ticketing System Prototype

By: Iskandar Setiadi (freedomofkeima) / 13511073

## Development Environment

- Linux / UNIX based Operating System

- Node JS Web Server with additional Express JS & Angular JS support

- Bower and npm as package management for JS

- Redis as Cache Layer

- MongoDB as Database Layer (not implemented -> not required at this point)


## System Architecture

![System Architecture](https://raw.githubusercontent.com/freedomofkeima/PAT_UAS_Prototype/master/architecture.png)

##How to Run 

Please access src/ directory for all of these operations.

###Install Node JS & npm

Please access ```http://nodejs.org/download``` and install the latest Node JS (Current version: v0.10.34)


###Install Redis

Download, extract, and compile Redis with:

	wget http://download.redis.io/releases/redis-2.8.19.tar.gz
	tar xzf redis-2.8.19.tar.gz
	cd redis-2.8.19
	make

Run Redis with:

	src/redis-server

For complete info, please access ```http://redis.io/download```.


###Install Bower

	[sudo] npm install -g bower


###Run application

We can use ```npm``` and ```bower``` to manage all dependencies. Install the required dependencies by:

	npm install
	bower install

To prevent Node JS from closing (error etc), start the application server with:

	node_modules/forever/bin/forever start app.js

Alternatively, you can start the application server with:

	node app.js

Finally, you can access the result at ```http://localhost:3000```


---

Reference(s):

- http://briantford.com/blog/angular-express

Last updated: 23 December 2014
