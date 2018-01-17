# chat-app

Simple chat app built with React Native and Firebase

<p align="center">
![example](https://github.com/dariyd/chat-app/blob/master/chat_demo.gif)
</p>

## Setup

1. **Clone the repo**

  ```
  $ git clone https://github.com/dariyd/chat-app.git
  $ cd chat-app
  ```
2. **Install dependencies** (npm v3+):

  ```
  $ yarn
  react-native link
  cd ios/
  pod install --repo-update

  ```
  If you have problems with building ios project, remove `node_modules` folder and run again comand `yarn` from root directiry

3. **Running on Android**:

  ```
  $ react-native run-android
  ```

4. **Running on iOS:**

  ```
  $ react-native run-ios
  ```
**or**
go to `ios` directory, open `ChatApp.xcworkspace` and Run your project (`Cmd+R`)