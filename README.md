# Modern-E-commerce-website

## Why Bun.js?

- Faster startup: Bun can often start up 2-3x faster than Node.js due to its lightweight design and efficient resource management. This can be significant for development workflow and server response times.
- Improved performance: In benchmarks, Bun often shows performance gains over Node.js, especially for CPU-intensive tasks and JavaScriptCore-optimized code.
- Bun.js installs dependencies locally within a node_modules folder for each project, naturally isolating them.
  This ensures dependencies for different projects don't conflict.
- Ultimately, the decision of whether to use Bun.js depends on your specific needs and priorities:
- If you prioritize performance, modern JavaScript features, and integrated tooling, Bun can be a compelling option.
- If you need a stable and mature platform with a vast ecosystem, Node.js might be a safer choice.

## Basic commands (under scripts in package.json)

- Start the server with live updates using Bun.js
- `bun run dev`
- Start the server using Bun.js
- `bun run start`
- Start Index.ts in debug mode
- `bun run debug`
- Start SASS CSS live updates
- `bun run sass`

## Commands to manage package installation

- Install all dependencies, devDependencies, optionalDependencies.
- `bun install`

- To add a particular package
- `bun add`

- To add a package as a dev dependency
- `bun add --dev`

- Updates dependencies to the latest version compatible with the version range specified in package.json
- `bun update`

## To use live server on WSL

- run command:
- `sudo apt install wslu`

## Yarn Lockfiles

- install autognerated yarn lockfiles for bun.js
- This is for visual viewing only, converts binary file to JSON only for viewing, similar to nodejs but faster in binary form.
- `bun install --yarn`

## URL TO test getall

- URL:
  $UBUNTUIP:$PORT/api/getall

## Running from a Docker container

- make sure DB_HOST in .env
- is `DB_HOST='db'`

- Run Command to build container and run application:
- `docker-compose up -d --build`

- May also need to enable WSL integration in Docker desktop under settings > Resources > WSL Integration.

## TO enable mySQL queries within docker container

- Enable in settings on docker desktop (if using WSL2): "Expose daemon on tcp://localhost:2375 without TLS", this will expose the mysql port to docker container
- Enabling the option "Expose daemon on tcp://localhost:2375 without TLS" in Docker Desktop for WSL exposes the Docker daemon, which is the core process that manages Docker containers, to listen on a specific port (tcp://localhost:2375) without Transport Layer Security (TLS) encryption.
- Note: there is security risks asscoiated when exposing your port.

- run command to enter mysql client within the msql docker container:
- `docker exec -it <container_name> mysql -u <username> -p`
- enter password when prompted
- note that all queries under the init.sql file are run when building the docker container intially, as seen from docker-compose.yml


## using online docs

(https://www.sabbirz.com/blog/install-phpmyadmin-on-wsl-ubuntu) to install phpmyadmin + apache for wsl

- user: 'root'
- password: 'password'

- Enable WSL and install Ubuntu 22.04:
  - `wsl --install`
  - `wsl --set-default-version 2`
  - `wsl --set-default Ubuntu-22.04`
- Update system packages:
  - `sudo apt update`
- Check if Apache is installed:
  - `dpkg -l | grep apache2`
- Install Apache web server:
  - `sudo apt install apache2`
- Verify Apache installation:
  - `sudo systemctl status apache2`
- Start Apache if not running:
  - `sudo service apache2 start`
- Test Apache:
  - Open: `http://localhost`
- Check if MySQL is installed:
  - `mysql -v`
- Install MySQL if not installed:
  - `sudo apt update`
  - `sudo apt install mysql-server`
- Start and enable MySQL:
  - `sudo systemctl start mysql`
  - `sudo systemctl enable mysql`
- Check MySQL root password:
  - `sudo mysql -u root`
- Set MySQL root password:
  - `sudo mysql -u root`
  - `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_new_password'; FLUSH PRIVILEGES; EXIT;`
- Test MySQL password:
  - `mysql -u root -p`
- Install phpMyAdmin:
  - `sudo apt install phpmyadmin`
- Select Apache2 during phpMyAdmin installation:
  - Press `SPACE`, `TAB`, `ENTER` to choose `apache2`
- Configure phpMyAdmin database:
  - Select `Yes`, press `ENTER`
- Enter MySQL root password during phpMyAdmin installation
- Set phpMyAdmin application password during installation
- Check MySQL status:
  - `sudo systemctl status mysql`
- Install PHP extensions:
  - `sudo apt install php-mbstring php-zip php-gd php-json php-curl`
- Enable PHP mbstring extension:
  - `sudo phpenmod mbstring`
- Configure Apache for phpMyAdmin:
  - `sudo ln -s /etc/phpmyadmin/apache.conf /etc/apache2/conf-enabled/phpmyadmin.conf`
- Restart Apache:
  - `sudo service apache2 restart`
- Access phpMyAdmin:
  - Open: `http://localhost/phpmyadmin`
- Troubleshoot phpMyAdmin if code displays as text:
  - `sudo apt install libapache2-mod-php`
  - `sudo a2enmod php`
  - `sudo systemctl restart apache2`
- Start the server:
  - `sudo service apache2 start`
  - `sudo service mysql start`

This list follows the document’s steps exactly, tailored for WSL Ubuntu 22.04, using the LAMP stack setup (separate installations of Apache, MySQL, PHP, and phpMyAdmin). Each step is a new line, and the server start commands (`sudo service apache2 start` and `sudo service mysql start`) are included at the end to ensure both Apache and MySQL are running.



## how to use wsl mysql db
use $UBUNTUIP:$PORT/api/getall
- this is because mysqldb is installed on wsl therefore you must use WSL IP 