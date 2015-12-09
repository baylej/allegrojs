#include <stdlib.h>
#include <allegro.h>

// Globally declared bitmap object
BITMAP_OBJECT *logo;

void when_ready(void) {
	// Renders the loaded image on the screen
	c_stretch_blit(logo, c_canvas(), 0, 0, logo->w, logo->h, 0, 0, c_SCREEN_W(), c_SCREEN_H());
}

int main(void)
{
	// Initialises allegro.js
	c_allegro_init();

	// Installs graphics at given canvas in 640x480 resolution
	c_set_gfx_mode("canvas", 640, 480);

	// Loads an image into the bitmap object
	logo = c_load_bmp("data/allegro.png");

	c_ready(when_ready, NULL);

	return 0;
}
END_OF_MAIN()
