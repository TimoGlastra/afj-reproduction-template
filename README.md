# AFJ Reproduction Template

Simple template repository that can be used for providing reproductions of issues and bugs.

Make sure to read the StackOverflow page on creating a minimal reproducible example: https://stackoverflow.com/help/minimal-reproducible-example

## Creating a reproduction

1. Fork this repo
2. Clone the forked repo
3. Edit `index.mts` so it reproduces the issue. Add comments to the code to explain what is happening.
4. Run your program and check if the issue / bug occurs. (See [Running](#running) on how to run)

## Running

### System

1. Follow the installation guides for AFJ for your platform: https://aries.js.org/guides/getting-started/installation/nodejs
2. Install dependencies using `yarn install`
3. Run the program using `yarn start`

### Docker

1. Make sure docker is installed on your system: https://docs.docker.com/get-docker/
2. Build the image using `docker build -t afj-reproduction .`
   - If you're on an ARM mac, run `docker build -t afj-reproduction -f Dockerfile.arm .` as the build step.
3. Run the program using `docker run -it --rm afj-reproduction`

You don't have to rebuild when just changing the code in the `index.mts` file. If you`re changing dependencies, or other things about the build process, you'll need to rebuild the image.
