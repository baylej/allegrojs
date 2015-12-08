#include "allegro.h"

int main(void)
{
	// Initialising allegro.js
	c_allegro_init();

	// Selecting canvas element adn setting it up for display at 640x480
	c_set_gfx_mode("canvas", 640, 480);

	// Clears the screen to white
	c_clear_to_color(c_canvas(), c_makecol(255, 255, 255, 255));

	// Typoes 'Hello World!' message to the centre of the screen
	c_textout_centre(c_canvas(), c_font(), "Hello World!", c_SCREEN_W()/2, c_SCREEN_H()/2, 24, c_makecol(0, 0, 0, 255), 0, 0);

	return 0;
}
END_OF_MAIN()

