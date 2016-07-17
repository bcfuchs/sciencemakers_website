scimaker_public
===============

public landing page for science makers


Docker
------

First, build an image

```
   docker build -t . scimaker_base
```

Then run the image with

```
docker run -it --rm --name scimaker  -v "$PWD":/usr/local/apache2/htdocs/ scimaker_base
```

Add a port switch if you need it (-p $HOSTPORT:$CONTAINERPORT)

```
docker run -it --rm --name scimaker   -p 8080:80 -v "$PWD":/usr/local/apache2/htdocs/ scimaker_base

```

