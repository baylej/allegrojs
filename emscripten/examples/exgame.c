#include <stdlib.h>
#include <stdio.h>
#include "allegro.h"

//bitmap objects
BITMAP_OBJECT *man, *apple, *bg;

// munching soudn evffect
SAMPLE_OBJECT *munch;

// apple position
float apple_x=200, apple_y=200;

// player position
float player_x=100, player_y=100;

// score
int score = 0;


// rendering function
void draw(void)
{
	// draw background
	c_draw_sprite(c_canvas(), bg, 0, 0);

	// draw player
	c_draw_sprite(c_canvas(), man, player_x, player_y);

	// draw the apple
	c_draw_sprite(c_canvas(), apple, apple_x, apple_y);

	// print out current score
	char str[25];
	snprintf(str, 25, "Score: %d", score);
	c_textout(c_canvas(), c_font(), str, 10, 20, 24, c_makecol(255,255,255,255), 0, 0);
}

// update gaem logic
void update(void)
{
	// check for keypresses and move the player accordingly
	if (c_key()[KEY_UP]) player_y-=4;
	if (c_key()[KEY_DOWN]) player_y+=4;
	if (c_key()[KEY_LEFT]) player_x-=4;
	if (c_key()[KEY_RIGHT]) player_x+=4;

	// if player is touching the apple...
	if (c_distance(player_x, player_y, apple_x, apple_y)<20)
	{
		// play muching sound
		c_play_sample(munch, 1., 1., 0);

		// move apple to a new spot, making it look like it's
		// a breand new apple
		apple_x = c_rand()%(c_SCREEN_W()-32);
		apple_y = c_rand()%(c_SCREEN_H()-32);

		// increase score
		score++;

		// log success to console
		c_log("Apple eaten!");
	}
}

void in_loop(void) {
	update();
	draw();
}

void when_ready(void) {
	c_loop(in_loop, BPS_TO_TIMER(60));
}

int main(void)
{
	c_enable_debug("output");
	c_allegro_init_all("canvas", 640, 480, 0, NULL);
	man = c_load_bmp("data/man.png");
	apple = c_load_bmp("data/apple.png");
	bg = c_load_bmp("data/grass.jpg");
	munch = c_load_sample("data/munch.mp3");

	c_ready(when_ready, NULL);

	return 0;
}
END_OF_MAIN()
