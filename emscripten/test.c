#define AL4JS_NO_INLINE
#include "allegro.h"
#include <stdio.h>

int main(void)
{
	// Initialising allegro.js
	c_allegro_init();

	// Selecting canvas element adn setting it up for display at 640x480
	printf("handle=%d, w=%d, h=%d\n", c_canvas()->handle, c_canvas()->w, c_canvas()->h);
	c_set_gfx_mode("canvas", 640, 480);
	printf("handle=%d, w=%d, h=%d\n", c_canvas()->handle, c_canvas()->w, c_canvas()->h);

	// Clears the screen to white
	c_clear_to_color(c_canvas(), c_makecol(0, 0, 0, 255));

	printf("screen_w=%d, screen_h=%d\n", c_SCREEN_W(), c_SCREEN_H());
	// Typoes 'Hello World!' message to the centre of the screen
	c_textout_centre(c_canvas(), c_font(), "Hello World!", c_SCREEN_W()/2, c_SCREEN_H()/2, 24, 0xFFFFFFFF, 0, 0);

	return 0;
}
END_OF_MAIN()

