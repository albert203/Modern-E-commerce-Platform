# AnimatedLogin

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
- ```bun run dev``` 
- Start the server using Bun.js
- ```bun run start```  
- Start Index.ts in debug mode
- ```bun run debug```
- Start SASS CSS live updates
- ```bun run sass```

## Commands to manage package installation

- Install all dependencies, devDependencies, optionalDependencies.
- ```bun install```

- To add a particular package
- ```bun add```

- To add a package as a dev dependency
- ```bun add --dev```

- Updates dependencies to the latest version  compatible with the version range specified in  package.json
- ```bun update```

## To use live server on WSL

- run command: 
- ```sudo apt install wslu```

## Yarn Lockfiles 

- install autognerated yarn lockfiles for bun.js
- This is for visual viewing only, converts binary file to JSON only for viewing, similar to nodejs but faster in binary form. 
- ```bun install --yarn```

## URL TO test getall

- URL:
$UBUNTUIP:$PORT/api/getall

## Running from a Docker container
- Run Command to build container and run application: 
- ```docker-compose up -d --build```

- May also need to enable WSL integration in Docker desktop under settings > Resources > WSL Integration. 

## TO enable mySQL queries within docker container

- Enable in settings on docker desktop (if using WSL2): "Expose daemon on tcp://localhost:2375 without TLS", this will expose the mysql port to docker container
- Enabling the option "Expose daemon on tcp://localhost:2375 without TLS" in Docker Desktop for WSL exposes the Docker daemon, which is the core process that manages Docker containers, to listen on a specific port (tcp://localhost:2375) without Transport Layer Security (TLS) encryption.
- Note: there is security risks asscoiated when exposing your port. 

- run command to enter mysql client within the msql docker container: 
- ```docker exec -it <container_name> mysql -u <username> -p```
- enter password when prompted
- note that all queries under the init.sql file are run when building the docker container intially, as seen from docker-compose.yml