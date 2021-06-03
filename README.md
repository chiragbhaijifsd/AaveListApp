# AaveListApp

A `react-native` list app that show the list of characters and character's detail.

### How it works

![](https://github.com/chiragbhaijifsd/AaveListApp/blob/main/src/assets/gifs/list-app-demo.gif)

### System requirements

- Node
- npm OR yarn
- CocoaPods
- XCode
- AndroidStudio

For setting up the whole environment for react-native apps, check out [this](https://reactnative.dev/docs/environment-setup).

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/chiragbhaijifsd/AaveListApp.git
$ cd AaveListApp
$ yarn
$ yarn codegen
```

### Run Apps

Run iOS

```sh
$ npx pod-install ios
$ yarn ios
```

Run Android

- Open android emulator
- Run the following command

```sh
$ yarn android
```

`Note`: In case of any error while running the anroid verison of the app, build the app from the Android Studio and then run it on the emulator.

### Structure

```
src/
├── app
│   ├── components
│   │   ├── AppContainer.tsx
│   │   └── GraphQL.tsx
│   └── navigation
│       ├── enums
│       │   ├── CharactersScreen.ts
│       │   └── Navigator.ts
│       ├── navigators
│       │   ├── AppNavigator.tsx
│       │   └── CharactersNavigator.tsx
│       ├── params
│       │   ├── AppNavigatorParamsList.tsx
│       │   └── CharactersNavigatorParamsList.ts
│       └── types
│           └── ParamsListOption.ts
├── assets
│   ├── gifs
│   │   └── list-app-demo.gif
│   └── svgs
│       └── back-black.svg
├── common
│   └── utilities
│       ├── firstName.ts
│       └── index.ts
├── constants
│   ├── Environment.ts
│   ├── Layout.ts
│   └── SvgImageAssets.ts
├── features
│   └── characters
│       ├── apis
│       │   ├── useCharacterQuery.ts
│       │   └── useCharactersQuery.ts
│       ├── components
│       │   ├── CharacterListItem.tsx
│       │   ├── EpisodeCharactersListItem.tsx
│       │   ├── EpisodeListItem.tsx
│       │   └── LocationCard.tsx
│       ├── injection-keys
│       │   ├── characterRepositoryInjectionKey.ts
│       │   └── index.ts
│       ├── repositories
│       │   └── CharacterRepository.ts
│       └── screens
│           ├── CharacterDetail.tsx
│           ├── CharactersList.tsx
│           └── index.ts
└── services
    ├── di
    │   ├── Dependencies.ts
    │   ├── DependencyContext.ts
    │   ├── IDependencies.ts
    │   ├── InjectionKey.ts
    │   ├── InjectionKeyScope.ts
    │   └── index.ts
    └── graphql
        ├── characters
        │   ├── CharacterFragment.ts
        │   ├── CharacterLocationFragment.ts
        │   ├── CharacterQuery.ts
        │   ├── CharactersQuery.ts
        │   └── EpisodeFragment.ts
        ├── index.d.ts
        └── whitelist.json

24 directories, 41 files
```

- `src/app`: It contains app level implemenations which should be used at once in whole application lifecycle like AppContainer, GraphQL and navigation.
- `src/assets`: It contains all type raw assets like svgs, gifs.
- `src/common`: It contains several subdirectories like components, utilities, enums etc. These files are common for all.
- `src/constants`: It contains global level constants which are used throughout the application.
- `src/features`: It contains a complete feature and whole stuffs around that like specfic components, apis (Queries), screens(List and Detail), repositories(CharacterRepository).
- `src/services`: It contains services which are used throughout the application like di (Dependency Injection) and graphql.

### Development

- `Project Structure`: Used module wise directory structure as this makes code more readable.
- `GraphQL`: It uses graphql endpoints. ApolloClient added to support graphql implementation. graphql-codegen is used to generate graphql schema.
- `Functional component`: It uses a functional component as it has better readability and performance than Class components.
- `DI`: Custom Dependency injection implementation is added that supports repositories implementation where we can put the utilities/logics respective to the feature.
- `Navigation flow`: Used react-navigation to create a single navigator for the app.
- `Styling`: Used stylesheet to avoid the inline styles as those are getting created in every re-render.
- `Orientation`: Used portrait orientation.

### Improvements

- Unit test cases for utility functions.
- UI improvements.
