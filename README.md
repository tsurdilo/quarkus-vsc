# QUARKUS VSC Extension

Quarkus (https://quarkus.io/) extension for VSC.

## Features

1. Allows to generate a new Quarkus Project. You can choose between generating a new project with default settings, or configure your projects settings before generating.
2. Allows you to add new Quarkus extensions to an already existing/generated Quarkus project.

## Commands

After installing this extension you will have two new commands available:

1. **Quarkus: Generate Quarkus Project**
2. **Quarkus: Add new Quarkus Extension**

These commands can be accessed via the Command Panellete. To open the Command Pallette
use F5 for Windows or ⇧⌘P on OSX).

## Requirements

Must maven Maven installed.

## Building from source

If you do not want to get this extension from the Marketplace or would like to build and test
the latest changes/updates locally follow these steps:

1. Clone the extension git repository

```
git clone https://github.com/tsurdilo/quarkus-vsc.git
cd quarkus-vsc
```

2. Build and package the extension with vsce:

```
vsce package
```

To install vsce run:

```
npm install -g vsce
```

3. vsce will create a quarkus-vsc-$VERSION$.vsix file which you have to install to your ide, for this run:

```
code --install-extension quarkus-vsc-$VERSION$.vsix
```

to uninstall the extension run:

```
code --uninstall-extension quarkus-vsc-$VERSION$.vsix
```

## Contributing

This extension is open-source and free to use to anyone.
All/any contributions are very welcome and much needed in order to make this extension much better.
Best way to contribute is to create Pull Request(s) on the github project.
