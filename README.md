# OTM-Web-Frontend V2

The new Web Frontend for opentopomap.org

## Installation of the Development Environment

This web frontend is based on the node.js environment and uses Webpack 5 as packing engine.

For development and build, an actual version of node.js has to be installed. In order to set up the development environment clone this repo, navigate to the repo folder and install the dependencies using the npm command

```bash
$ npm install
```

## Starting the Development Mode

Start the development environment using the npm command

```bash
$ npm start
```

This launches the Webpack server with file watch and live view in the default Browser.

## Building the Distribution Version

For building the distribution version (that will be created in the folder *./dist*) first edit the destination URL flag of the productive environment in the *webpack.config.js* file. Set *EnvTestThomasWorbs* to false. This causes the root URL tp be set to *https://opentopomap.org/*.

```javascript
// our environment
EnvTestThomasWorbs = false;
```

Then enter the npm command

```bash
$ npm run build
```

## The Files and Directories in the Ditribution Folder *./dist*

#### *index.php*

The main entrypoint php file.

#### *`<hash>`.js*

Single packed and compressed JavaScript source including all JS and CSS code including 3rd party packages.

#### *`<hash>`.js.LICENSE.txt*

License information of some 3rd party packages.

#### *favicon.ico*

The website's icon file.

#### Folder *./i*

Contains all images required by the webapp (svg and png).

#### Folder *./l*

The localization language JSON files from the repo folder *./localization* (explained later in this documentation).
