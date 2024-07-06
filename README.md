# Installation
Run the following command to clone the repository
```
git clone https://github.com/mourinhan8/funny-movies.git
```
Go to ```funny-movies-be``` and ```funny-movies-fe``` directory to install packages
```
cd funny-movies-be
npm install
```
```
cd funny-movies-fe
npm install
```
# Configuration
Create ```.env``` file inside ```funny-movies-be``` directory and copy the following code

```
MONGO_URL=Your mongodb URL
JWT_SECRET=a random secret key eg. thisisasecretkey
PORT=4040
```
Create ```.env``` file inside ```funny-movies-fe``` directory and copy the following code

```
VITE_APP_API_URL=http://localhost:4040/api/v1
VITE_APP_SOCKET_URL=http://localhost:4040
```
# Run the App
Go to ```funny-movies-be``` and ```funny-movies-fe``` directory and start the server
```
cd funny-movies-be
npm start
```
```
cd funny-movies-fe
npm run build
npm run server
```

# Run the test
Go to ```funny-movies-be``` and ```funny-movies-fe``` directory and run test case
```
cd funny-movies-be
npm run test-user
npm run test-others
```
```
cd funny-movies-fe
npm run build
npm run server
```
Configuration test case of ```funny-movies-be``` in path 
```
funny-movies-be/test
```
Configuration test case of ```funny-movies-fe``` in path 
```
funny-movies-fe/src/components/_tests_
```
# Live Preview
Check live preview here []()

