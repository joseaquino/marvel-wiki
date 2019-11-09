# Marvel Wiki App

This application is an interactive explorer into the different characters, comics and stories
that exist inside the Marvel universe. It allows you to view details of each character and comic
and be able to even bookmark your favourite ones to keep them stored separately.

The application uses the public Mavel API for all the requests of information related to a character,
comic or story.

It is built using the Next.js framework to be able to have Server Side Rendering (SSR) of the application
and improve the performace delivery of it.

## How run the application

1. Download the repo locally
   ```shell
   git clone https://github.com/joseaquino/marvel-wiki.git
   ```
2. Edit the Dockerfile and add your own Marvel private key in the environment variable `ENV MARVEL_PRIVATE_KEY=`
   otherwise the app will not be able to make requests from the server.
3. Edit the file in path `/services/marvelAPI.js` and change the variable constant `MARVEL_PUBLIC_KEY` to equal
   to your Marvel public key, this will allow the app to make new requests from the browser.
4. Build the Docker image by running this command:
   ```shell
   docker build -t marvel-wiki-app:v1 .
   ```
   - `-t` assigns the given flag as a tag to the image, we recommend separating words with a dash only.
   -  Also there is a dot at the end of the command that is easy to miss.
5. Run the Docker image with the next command:
    ```shell
    docker run --name marvel-wiki --rm -p 3000:3000 -d marvel-wiki-app:v1
    ```
    Notes:
    - `--name` assigns the given name to the docker image
    - `--rm` indicates Docker to remove the image when stopped (optional)
    - `-p` connects the local port `3000` to the exposed por `3000`, the first port number can be of your choosing
    - `-d` detaches the console from the running process this way the terminal doesn locks (optional)
    - `marvel-wiki:v1` the tag of the image from which we want to run from
6. Open the browser at `localhost:3000` or the port of your choosing.

> **Observations:**  
> Make sure to have approved your URL in the Marvel API settings so requests are allowed from it.

## App folder structure

This is a breakdown of the function of each folder in the proyect and what you can find in them.

```
marvel-wiki
└─ assets     // Stores images, styles, fonts and other public resorces 
│             // that will be pre-processed, like image optimization
│
└ components // Location for all reusable React components that are used
│            // throught the app
│
└ pages      // All files of routes that will be server by the Next.js server
│
└ services   // All data handling functions and React custom hooks
│
└ static     // Files which get statically served by the Next.js server
```