# React Native & Web Monorepo

React-native + web monorepo with graph ql api from AniList

# Demo

![ezgif-5-b62e051049](https://user-images.githubusercontent.com/17568508/173612199-45950f73-f423-4bdc-b9af-d3515357a155.gif)

![ezgif-5-6f1009c56a](https://user-images.githubusercontent.com/17568508/173612289-d6a311c5-a2a2-47fb-9b96-6eedafe0f156.gif)

## Setting up Yarn 2+

1. Run `yarn set version berry` at the root of project. It will create a `.yarnrc.yml` file.
2. Add the following lines to `.yarnrc.yml` to ensure `node_modules` directories are all created in each workspace:
```yml
nodeLinker: node-modules
nmHoistingLimits: workspaces
```
3. `nmHositingLimits` tells how to hoist dependencies for each workspace. By setting it to `workspaces` all dependencies will be installed in each workspace's `node_modules` rather than being hoisted to the root folder. This means you can now you can safely the `noHoist` section in the root's `package.json`.

Check out [Yarn 2+'s "getting started" guide](https://yarnpkg.com/getting-started/install) for more info.

## Available commands

Development and build commands:

- `yarn android:metro`: Start the metro server for Android/iOS
- `yarn android:start`: Start developing the Android app
- `yarn android:studio`: Open the android app on Android Studio
- `yarn ios:metro`: Start the metro server for Android/iOS
- `yarn ios:start`: Start developing the iOS app
- `yarn ios:pods`: Install iOS cocoapods dependencies
- `yarn ios:xcode`: Open the iOS app on XCode
- `yarn web:start`: Start developing the web app
- `yarn web:build`: Create a production build of the web app
