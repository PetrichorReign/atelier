# Atelier

This project demonstrates using Rails 5 API server and ActionCable websockets for real-time updates 
alongside create-react-app.

## Setup
* Clone project from git
  
  ```console
  git clone https://github.com/PetrichorReign/atelier.git
  ```

* Install Node.js and npm 
  * Node.js versions 7.7.1 used for development
  
  ```console
  brew install node   
  ```
* Install dependencies
  
  ```console
  cd atelier
  bundle
  cd client
  npm install
  ```
* Setup database

```console
cd atelier
rails db:migrate db:seed
```

* Install Redis 
  * Redis version 3.0.4 used for development                          

  ```console
  brew install redis
  ```

* Run Atelier
  * Run redis server 
  
  ```console
  redis-server /usr/local/etc/redis.conf
  ```
  * Run project
  
  ```console
  cd atelier
  bundle exec rake start
  ```
* Run test
  * Run rails specs
  
  ```console
  cd atelier
  rspec
  ```
  * Run javascript tests
 
  ```console
  cd atelier/client
  npm test
  ```
