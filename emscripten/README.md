## A lousy C port of a lousy JS port of a C library

*Allegro have been to JS and back*

**You think you're a hardcore allegro programmer? PROVE IT!**

# How do I make a C game for allegro.js?

1 Clone this repository
2 install emscripten

First learn how allegro.js work, what every function do, *etc*.

Then open `allegro.h` it contains declarations of every functions, all are mapped to their JS equivalent.

There is several tiny differences:
* all globals are functions (because emscripten)
* because of name clash, rand and log have been renamed to rand16 and logmsg
* there is no such thing as default parameters, closures, etc. (this is C programming, for real)

