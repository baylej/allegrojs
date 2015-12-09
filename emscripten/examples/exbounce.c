#include <stdlib.h>
#include <allegro.h>

// bitmap objects
BITMAP_OBJECT *logo, *ball;

// sample object
SAMPLE_OBJECT *bounce;

// size and speed of the ball
const int size=64, speed=5;

// positon of the ball
float cx=100, cy=100;

// velocity of the ball
float vx=speed, vy=speed;

// drawing function
void draw(void)
{
	// draw allegro logo background
	c_stretch_blit(logo, c_canvas(), 0, 0, logo->w, logo->h, 0, 0, c_SCREEN_W(), c_SCREEN_H());

	// draws the ball resized to size*size, centered
	// stretch it a bit vertically according to velocity
	c_stretch_sprite(c_canvas(), ball, cx-size/2., cy-size/2., size, size+abs(vy));
}

// update game logic
void update(void)
{
	// did the ball bounce off the wall this turn?
	int bounced = 0;

	// if the ball is going to collide with screen bounds
	// after applying velocity, if so, reverse velocity
	// and remember that it bonced
	if (cx+vx>c_SCREEN_W()-size/2.) {vx=-speed;bounced=1;}
	if (cy+vy>c_SCREEN_H()-size/2.) {vy=-speed*3;bounced=1;}
	if (cx+vx<size/2.) {vx=speed;bounced=1;}
	if (cy+vy<size/2.) {vy=speed;bounced=1;}

	// move the ball
	cx+=vx;
	cy+=vy;

	// if it bounced, play a sound
	if (bounced) c_play_sample(bounce, 1., 1., 0);

	// add gravity
	vy+=.3;
}

void in_loop(void) {
	// clear screen
	c_clear_to_color(c_canvas(), c_makecol(255, 255, 255, 255));

	// update game logic
	update();

	// render everything
	draw();
}

void when_ready(void) {
	c_loop(in_loop, BPS_TO_TIMER(60));
}

// entry point of our example
int main(void)
{
	// enable debugging to console element
	c_enable_debug("output");

	// init all subsystems, put allegro in canvas with id="canvas_id"
	// make the dimesnions 640x480
	c_allegro_init_all("canvas", 640, 480, 0, NULL);

	// load ball image
	ball = c_load_bmp("data/planet.png");

	// load background image
	logo = c_load_bmp("data/allegro.png");

	// load the bounce sound
	bounce = c_load_sample("data/bounce.mp3");

	// make sure everything has loaded
	c_ready(when_ready, NULL);

	// the end
	return 0;
}
END_OF_MAIN()

