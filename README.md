# Logic Set Trainer

## Getting started
### Requirements
 - node > v18.6.0 
 - IDE of your choice (Webstorm, IntelliJ Ultimate, VSCode...)
### Preparation
Checkout the desired branch and run `npm install`. This will install all the required packages onto your harddrive
### Running
Run `npm start` \
a new Browser tab will appear [http://localhost:3000](http://localhost:3000)


## Coding guidelines
### Typescript
For better code readability& maintainability we are using [Typescript](https://www.typescriptlang.org/) \
It adds types to javascript. However they do not exist during runtime. \
The use of **:any** is forbidden (Eslint will prevent this. See next section)
### Eslint
We are using the [Airbnb es-lint config](https://github.com/airbnb/javascript). \
Eslint is a code styling tool that will help us to maintain a clear coding style throughout the project. \
During production all warnings will be treated as errors. Fix them as soon as possible \
To get a list of all EsLint Warnings/Errors, run `npm run eslint`
### Feature Branches
We want to split our tasks into **feature branches**. \
If it makes sense from a structural point of view each feature should have its dedicated feature branch. \
A feature branch can correspond to more than one issue but should in general not exceed 5 issues at once.
### Branch Rules
master is protected and contains the latest stable build \
development contains **finished** products but may contain bugs and/or is untested \

After a new feature is complete a pull request shall be opened. \
Pull-Requests require the confirmation of another contributor. This is to prevent unwanted bugs& code issues.

### Kanban
Every feature should be documented on Kanban. Create a draft and convert it into a issue and select this repository. \
Tasks should have a clear and comprehensive description. [Kanban Board](https://github.com/users/siKruger/projects/3/views/1)


#### This is all for the Getting Started Guide. If there are any questions feel free to contact us.




## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eslint`
Fixes all files according to eslint config

## Useful Links

To check the progress, [Kanban Board](https://github.com/users/siKruger/projects/3/views/1) \
To learn React, check out the [React documentation](https://reactjs.org/). \
To check the coding style [Airbnb Config](https://github.com/airbnb/javascript).
