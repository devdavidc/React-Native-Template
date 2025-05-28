# Welcome to your Expo template 👋

## Mongodb start

To configure the mongodb Docker container run this command:

```bash
docker run -d --name mongo-container \                                                 
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=<your_user> \
  -e MONGO_INITDB_ROOT_PASSWORD=<your_password> \
  -v $(pwd)/mongo-data:/data/db \
  -v $(pwd)/mongo-keyfile:/etc/mongo-keyfile:ro \
  mongo --auth --replSet rs0 --keyFile /etc/mongo-keyfile
```
Then run this one
```bash
docker exec -it mongo-container mongosh -u <your_user> -p <your_password> --authenticationDatabase admin
```
Now you should be able to connect to the mongodb server from your machine.

> Remember to use your IP adress if you're using your phone to run the app.

## Get started

This is an [Expo](https://expo.dev) template already configured with NativeWind ready to start and style any project using [TailwindCSS](https://tailwindcss.com/).

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

3. Configure your own color variables in the [tailwind.config.js](./tailwind.config.js) file.

   ```javascript
      extend: {
            colors:{
            primary: '<your_primary_color>',
            secondary: '<your_secondary_color>',
            light: {
               100: '<your_color>',
               200: '<your_color>',
               300: '<your_color>',
               // ...
            },
            dark: {
               100: '<your_color>',
               200: '<your_color>',
               300: '<your_color>',
               // ...
            },
   ```

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
___

David Carreño Macías
