/**
	I'm the C header, #include me!
**/

#ifndef _ALLEGRO_JS_H
#define _ALLEGRO_JS_H
#pragma once

#ifdef __cplusplus
extern "C" {
#endif

/* CONFIGURATION ROUTINES */
extern void c_install_allegro(void);
extern void c_allegro_init(void);
extern void c_allegro_init_all(const char *canvas_id, int w, int h, int menu, int enable_keys);
#define END_OF_MAIN()

/* MOUSE ROUTINES */
extern int c_mouse_b;
extern int c_mouse_pressed;
extern int c_mouse_released;
extern int c_mouse_x;
extern int c_mouse_y;
extern int c_mouse_z;
extern int c_mouse_mx;
extern int c_mouse_my;
extern int c_mouse_mz;

extern int c_install_mouse(int menu);
extern int c_remove_mouse(void);
extern int c_show_mouse(void);
extern int c_hide_mouse(void);

/* TIMER ROUTINES */
#define SECS_TO_TIMER(secs) ( secs*1000 )
#define MSEC_TO_TIMER(msec) ( msec )
#define  BPS_TO_TIMER(bps)  (    1000./(float)bps )
#define  BPM_TO_TIMER(bpm)  ( 60*1000./(float)bpm )
typedef void (*procedure)(void);
typedef void (*bar)(float progress);
extern void c_install_timer(void);
extern long c_time(void);
extern void c_install_int(procedure p, long msec);
extern void c_install_int_ex(procedure p, long speed);
extern void c_loop(procedure p, long speed);
extern void c_loading_bar(float progress);
extern void c_ready(procedure p, bar b);
extern void c_remove_int(procedure p);
extern void c_remove_all_ints(void);

/* KEYBOARD ROUTINES */
const char KEY_A = 0x41, KEY_B = 0x42, KEY_C = 0x43, KEY_D = 0x44, KEY_E = 0x45, KEY_F = 0x46, KEY_G = 0x47,
           KEY_H = 0x48, KEY_I = 0x49, KEY_J = 0x4A, KEY_K = 0x4B, KEY_L = 0x4C, KEY_M = 0x4D, KEY_N = 0x4E,
           KEY_O = 0x4F, KEY_P = 0x50, KEY_Q = 0x51, KEY_R = 0x52, KEY_S = 0x53, KEY_T = 0x54, KEY_U = 0x55,
           KEY_V = 0x56, KEY_W = 0x57, KEY_X = 0x58, KEY_Y = 0x59, KEY_Z = 0x5A,
           KEY_0 = 0x30, KEY_1 = 0x31, KEY_2 = 0x32, KEY_3 = 0x33, KEY_4 = 0x34, KEY_5 = 0x35, KEY_6 = 0x36,
           KEY_7 = 0x37, KEY_8 = 0x38, KEY_9 = 0x39,
           KEY_0_PAD = 0x60, KEY_1_PAD = 0x61, KEY_2_PAD = 0x62, KEY_3_PAD = 0x63, KEY_4_PAD = 0x64, KEY_5_PAD = 0x65,
           KEY_6_PAD = 0x66, KEY_7_PAD = 0x67, KEY_8_PAD = 0x68, KEY_9_PAD = 0x69,
           KEY_F1 = 0x70, KEY_F2 = 0x71, KEY_F3  = 0x72, KEY_F4  = 0x73, KEY_F5  = 0x74, KEY_F6 = 0x75, KEY_F7 = 0x76,
           KEY_F8 = 0x77, KEY_F9 = 0x78, KEY_F10 = 0x79, KEY_F11 = 0x7a, KEY_F12 = 0x7b,
           KEY_ESC = 0x1B, KEY_TILDE = 0xc0, KEY_MINUS = 0xbd, KEY_EQUALS = 0xbb, KEY_BACKSPACE = 0x08, KEY_TAB = 0x09,
           KEY_OPENBRACE = 0xdb, KEY_CLOSEBRACE = 0xdd, KEY_ENTER = 0x0D, KEY_COLON = 0xba, KEY_QUOTE = 0xde,
           KEY_BACKSLASH = 0xdc, KEY_COMMA = 0xbc, KEY_STOP = 0xbe, KEY_SLASH = 0xBF, KEY_SPACE = 0x20,
           KEY_INSERT = 0x2D, KEY_DEL = 0x2E, KEY_HOME = 0x24, KEY_END = 0x23, KEY_PGUP = 0x21, KEY_PGDN = 0x22,
           KEY_LEFT = 0x25, KEY_RIGHT = 0x27, KEY_UP = 0x26, KEY_DOWN = 0x28, KEY_SLASH_PAD = 0x6F, KEY_ASTERISK = 0x6A,
           KEY_MINUS_PAD = 0x6D, KEY_PLUS_PAD = 0x6B, KEY_ENTER_PAD = 0x0D, KEY_PRTSCR = 0x2C, KEY_PAUSE = 0x13,
           KEY_EQUALS_PAD = 0x0C, KEY_LSHIFT = 0x10, KEY_RSHIFT = 0x10, KEY_LCONTROL = 0x11, KEY_RCONTROL = 0x11,
           KEY_ALT = 0x12, KEY_ALTGR = 0x12, KEY_LWIN = 0x5b, KEY_RWIN = 0x5c, KEY_MENU = 0x5d, KEY_SCRLOCK = 0x9d,
           KEY_NUMLOCK = 0x90, KEY_CAPSLOCK = 0x14;
extern int c_key[];
extern int c_pressed[];
extern int c_released[];
extern int c_install_keyboard(int enable_keys);
extern int c_remove_keyboard(void);

/* BITMAP ROUTINES */
typedef struct {
	int handle;
	int w, h;
} BITMAP_OBJECT;
extern BITMAP_OBJECT* c_create_bitmap(int width, int height);
extern BITMAP_OBJECT* c_load_bitmap(const char *filename);
extern BITMAP_OBJECT* c_load_bmp(const char *filename);

/* GRAPHICS MODES */
extern BITMAP_OBJECT *c_canvas;
extern const int c_SCREEN_W;
extern const int c_SCREEN_H;
extern int c_set_gfx_mode(const char *canvas_id, int width, int height);

/* DRAWING PRIMITIVES */
#define   PI = 3.14159265
#define  PI2 = 6.2831853
#define PI_2 = 1.570796325
#define PI_3 = 1.04719755
#define PI_4 = 0.7853981625
#define RAD(d) ( -d*PI/180.0 )
#define DEG(r) ( -r*180.0/PI )
extern int c_makecol(char r, char g, char b, char a);
extern int c_makecolf(float r, float g, float b, float a);
extern char c_getr(int colour);
extern char c_getg(int colour);
extern char c_getb(int colour);
extern char c_geta(int colour);
extern float c_getrf(int colour);
extern float c_getgf(int colour);
extern float c_getbf(int colour);
extern float c_getaf(int colour);
extern int c_getpixel(BITMAP_OBJECT *bitmap, int x, int y);
extern void c_putpixel(BITMAP_OBJECT *bitmap, int x, int y, int colour);
extern void c_clear_bitmap(BITMAP_OBJECT *bitmap);
extern void c_clear_to_color(BITMAP_OBJECT *bitmap, int colour);
extern void c_line(BITMAP_OBJECT *bitmap, int x1, int y1, int x2, int y2, int colour, int width);
extern void c_vline(BITMAP_OBJECT *bitmap, int x, int y1, int y2, int colour, int width);
extern void c_hline(BITMAP_OBJECT *bitmap, int x1, int y, int x2, int colour, int width);
extern void c_triangle(BITMAP_OBJECT *bitmap, int x1, int y1, int x2, int y2, int x3, int y3, int colour, int width);
extern void c_trianglefill(BITMAP_OBJECT *bitmap, int x1, int y1, int x2, int y2, int x3, int y3, int colour);
extern void c_polygon(BITMAP_OBJECT *bitmap, int vertices, const int *points, int colour, int width);
extern void c_polygonfill(BITMAP_OBJECT *bitmap, int vertices, const int *points, int colour);
extern void c_rect(BITMAP_OBJECT *bitmap, int x1, int y1, int x2, int y2, int colour, int width);
extern void c_rectfill(BITMAP_OBJECT *bitmap, int x1, int y1, int x2, int y2, int colour);
extern void c_circle(BITMAP_OBJECT *bitmap, int x, int y, int radius, int colour, int width);
extern void c_circlefill(BITMAP_OBJECT *bitmap, int x, int y, int radius, int colour);
extern void c_arc(BITMAP_OBJECT *bitmap, int x, int y, float ang1, float ang2, int radius, int colour, int width);
extern void c_arcfill(BITMAP_OBJECT *bitmap, int x, int y, float ang1, float ang2, int radius, int colour);

/* BLITTING AND SPRITES */
extern void c_draw_sprite(BITMAP_OBJECT *bmp, BITMAP_OBJECT *sprite, int x, int y);
extern void c_stretch_sprite(BITMAP_OBJECT *bmp, BITMAP_OBJECT *sprite, int x, int y, int w, int h);
extern void c_rotate_sprite(BITMAP_OBJECT *bmp, BITMAP_OBJECT *sprite, int x, int y, float angle);
extern void c_pivot_sprite(BITMAP_OBJECT *bmp, BITMAP_OBJECT *sprite, int x, int y, int cx, int cy, float angle);
extern void c_rotate_scaled_sprite(BITMAP_OBJECT *bmp, BITMAP_OBJECT *sprite, int x, int y, float angle, float scale);
extern void c_pivot_scaled_sprite(BITMAP_OBJECT *bmp, BITMAP_OBJECT *sprite, int x, int y, int cx, int cy, float angle, float scale);
extern void c_blit(BITMAP_OBJECT *source, BITMAP_OBJECT *dest, int sx, int sy, int dx, int dy, int w, int h);
extern void c_stretch_blit(BITMAP_OBJECT *source, BITMAP_OBJECT *dest, int sx, int sy, int sw, int sh, int dx, int dy, int dw, int dh);

/* TEXT OUTPUT */
typedef int FONT_OBJECT;
extern FONT_OBJECT *c_font;
extern FONT_OBJECT* c_load_font(char *filename);
extern FONT_OBJECT* c_create_font(char *family);
extern void c_textout(BITMAP_OBJECT *bitmap, FONT_OBJECT *font, char *string, int x, int y, int size, int colour, int outline, int width);
extern void c_textout_centre(BITMAP_OBJECT *bitmap, FONT_OBJECT *font, char *string, int x, int y, int size, int colour, int outline, int width);
extern void c_textout_right(BITMAP_OBJECT *bitmap, FONT_OBJECT *font, char *string, int x, int y, int size, int colour, int outline, int width);

/* SOUND ROUTINES */
typedef int SAMPLE_OBJECT;
extern void c_install_sound(void);
extern void c_set_volume(float volume);
extern float c_get_volume(void);
extern SAMPLE_OBJECT* c_load_sample(char *filename);
extern void c_destroy_sample(char *filename);
extern void c_play_sample(SAMPLE_OBJECT *sample, float vol, float freq, int loop);
extern void c_adjust_sample(SAMPLE_OBJECT *sample, float vol, float freq, int loop);
extern void c_stop_sample(SAMPLE_OBJECT *sample);
extern void c_pause_sample(SAMPLE_OBJECT *sample);

/* HELPER MATH FUNCTIONS */
extern unsigned short c_rand(void);
extern int c_rand32(void);
extern float c_frand(void);
#define abs(a) ( (a<0)?(-a):(a) )
extern float c_length(float x, float y);
extern float c_distance(float x1, float y1, float x2, float y2);
extern float c_distance2(float x1, float y1, float x2, float y2);
extern float c_linedist(float ex1, float ey1, float ex2, float ey2, float x, float y);
extern float c_lerp(float from, float to, float progress);
extern float c_dot(float x1, float y1, float x2, float y2);
extern int   c_sgn(float a);
extern float c_angle(float x1, float y1, float x2, float y2);
extern float c_anglediff(float a, float b);
extern float c_clamp(float value, float min, float max);
extern float c_scale(float value, float min, float max, float min2, float max2);
extern float c_scaleclamp(float value, float min, float max, float min2, float max2);

/* DEBUG FUNCTIONS */
extern int c_ALLEGRO_CONSOLE;
extern void c_enable_debug(const char *id);
extern void c_log(const char *string);
extern void c_wipe_log(void);

#ifndef AL4JS_NO_INLINE

inline void install_allegro(void) {
	c_install_allegro();
}
inline void allegro_init(void) {
	c_allegro_init();
}
inline void allegro_init_all(const char *c_id, int w, int h, int menu, int enable_keys) {
	c_allegro_init_all(c_id, w, h, menu, enable_keys);
}
#define mouse_b c_mouse_b
#define mouse_pressed c_mouse_pressed
#define mouse_released c_mouse_released
#define mouse_x c_mouse_x
#define mouse_y c_mouse_y
#define mouse_z c_mouse_z
#define mouse_mx c_mouse_mx
#define mouse_my c_mouse_my
#define mouse_mz c_mouse_mz
inline int install_mouse(int menu) {
	return c_install_mouse(menu);
}
inline int remove_mouse(void) {
	return c_remove_mouse();
}
inline int show_mouse(void) {
	return c_show_mouse();
}
inline int hide_mouse(void) {
	return c_hide_mouse();
}
inline void install_timer(void) {
	c_install_timer();
}
inline long time(void) {
	return c_time();
}
inline void install_int(procedure p, long msec) {
	c_install_int(p, msec);
}
inline void install_int_ex(procedure p, long speed) {
	c_install_int_ex(p, speed);
}
inline void loop(procedure p, long speed) {
	c_loop(p, speed);
}
inline void loading_bar(float progress) {
	c_loading_bar(progress);
}
inline void ready(procedure p, bar b) {
	c_ready(p, b);
}
inline void remove_int(procedure p) {
	c_remove_int(p);
}
inline void remove_all_ints(void) {
	c_remove_all_ints();
}
#define key c_key
#define pressed c_pressed
#define released c_released
inline int install_keyboard(int enable_keys) {
	return c_install_keyboard(enable_keys);
}
inline int remove_keyboard(void) {
	return c_remove_keyboard();
}
inline BITMAP_OBJECT* create_bitmap(int width, int height) {
	return c_create_bitmap(width, height);
}
inline BITMAP_OBJECT* load_bitmap(const char *filename) {
	return c_load_bitmap(filename);
}
inline BITMAP_OBJECT* load_bmp(const char *filename) {
	return c_load_bmp(filename);
}
#define canvas c_canvas
#define SCREEN_W c_SCREEN_W
#define SCREEN_H c_SCREEN_H
inline int set_gfx_mode(const char *canvas_id, int width, int height) {
	return c_set_gfx_mode(canvas_id, width, height);
}
inline int makecol(char r, char g, char b, char a) {
	return c_makecol(r, g, b, a);
}
inline int makecolf(float r, float g, float b, float a) {
	return c_makecolf(r, g, b, a);
}
inline char getr(int colour) {
	return c_getr(colour);
}
inline char getg(int colour) {
	return c_getg(colour);
}
inline char getb(int colour) {
	return c_getb(colour);
}
inline char geta(int colour) {
	return c_geta(colour);
}
inline float getrf(int colour) {
	return c_getrf(colour);
}
inline float getgf(int colour) {
	return c_getgf(colour);
}
inline float getbf(int colour) {
	return c_getbf(colour);
}
inline float getaf(int colour) {
	return c_getaf(colour);
}
inline int getpixel(BITMAP_OBJECT *bitmap, int x, int y) {
	return c_getpixel(bitmap, x, y);
}
inline void putpixel(BITMAP_OBJECT *bitmap, int x, int y, int colour) {
	c_putpixel(bitmap, x, y, colour);
}
inline void clear_bitmap(BITMAP_OBJECT *bitmap) {
	c_clear_bitmap(bitmap);
}
inline void clear_to_color(BITMAP_OBJECT *bitmap, int colour) {
	c_clear_to_color(bitmap, colour);
}
inline void line(BITMAP_OBJECT *bitmap, int x1, int y1, int x2, int y2, int colour, int width) {
	c_line(bitmap, x1, y1, x2, y2, colour, width);
}
inline void vline(BITMAP_OBJECT *bitmap, int x, int y1, int y2, int colour, int width) {
	c_vline(bitmap, x, y1, y2, colour, width);
}
inline void hline(BITMAP_OBJECT *bitmap, int x1, int y, int x2, int colour, int width) {
	c_hline(bitmap, x1, y, x2, colour, width);
}
inline void triangle(BITMAP_OBJECT *bitmap, int x1, int y1, int x2, int y2, int x3, int y3, int colour, int width) {
	c_triangle(bitmap, x1, y1, x2, y2, x3, y3, colour, width);
}
inline void trianglefill(BITMAP_OBJECT *bitmap, int x1, int y1, int x2, int y2, int x3, int y3, int colour) {
	c_trianglefill(bitmap, x1, y1, x2, y2, x3, y3, colour);
}
inline void polygon(BITMAP_OBJECT *bitmap, int vertices, const int *points, int colour, int width) {
	c_polygon(bitmap, vertices, points, colour, width);
}
inline void polygonfill(BITMAP_OBJECT *bitmap, int vertices, const int *points, int colour) {
	c_polygonfill(bitmap, vertices, points, colour);
}
inline void rect(BITMAP_OBJECT *bitmap, int x1, int y1, int x2, int y2, int colour, int width) {
	c_rect(bitmap, x1, y1, x2, y2, colour, width);
}
inline void rectfill(BITMAP_OBJECT *bitmap, int x1, int y1, int x2, int y2, int colour) {
	c_rectfill(bitmap, x1, y1, x2, y2, colour);
}
inline void circle(BITMAP_OBJECT *bitmap, int x, int y, int radius, int colour, int width) {
	c_circle(bitmap, x, y, radius, colour, width);
}
inline void circlefill(BITMAP_OBJECT *bitmap, int x, int y, int radius, int colour) {
	c_circlefill(bitmap, x, y, radius, colour);
}
inline void arc(BITMAP_OBJECT *bitmap, int x, int y, float ang1, float ang2, int radius, int colour, int width) {
	c_arc(bitmap, x, y, ang1, ang2, radius, colour, width);
}
inline void arcfill(BITMAP_OBJECT *bitmap, int x, int y, float ang1, float ang2, int radius, int colour) {
	c_arcfill(bitmap, x, y, ang1, ang2, radius, colour);
}
inline void draw_sprite(BITMAP_OBJECT *bmp, BITMAP_OBJECT *sprite, int x, int y) {
	c_draw_sprite(bmp, sprite, x, y);
}
inline void stretch_sprite(BITMAP_OBJECT *bmp, BITMAP_OBJECT *sprite, int x, int y, int w, int h) {
	c_stretch_sprite(bmp, sprite, x, y, w, h);
}
inline void rotate_sprite(BITMAP_OBJECT *bmp, BITMAP_OBJECT *sprite, int x, int y, float angle) {
	c_rotate_sprite(bmp, sprite, x, y, angle);
}
inline void pivot_sprite(BITMAP_OBJECT *bmp, BITMAP_OBJECT *sprite, int x, int y, int cx, int cy, float angle) {
	c_pivot_sprite(bmp, sprite, x, y, cx, cy, angle);
}
inline void rotate_scaled_sprite(BITMAP_OBJECT *bmp, BITMAP_OBJECT *sprite, int x, int y, float angle, float scale) {
	c_rotate_scaled_sprite(bmp, sprite, x, y, angle, scale);
}
inline void pivot_scaled_sprite(BITMAP_OBJECT *bmp, BITMAP_OBJECT *sprite, int x, int y, int cx, int cy, float angle, float scale) {
	c_pivot_scaled_sprite(bmp, sprite, x, y, cx, cy, angle, scale);
}
inline void blit(BITMAP_OBJECT *source, BITMAP_OBJECT *dest, int sx, int sy, int dx, int dy, int w, int h) {
	c_blit(source, dest, sx, sy, dx, dy, w, h);
}
inline void stretch_blit(BITMAP_OBJECT *source, BITMAP_OBJECT *dest, int sx, int sy, int sw, int sh, int dx, int dy, int dw, int dh) {
	c_stretch_blit(source, dest, sx, sy, sw, sh, dx, dy, dw, dh);
}
#define font c_font
inline FONT_OBJECT* load_font(char *filename) {
	return c_load_font(filename);
}
inline FONT_OBJECT* create_font(char *family) {
	return c_create_font(family);
}
inline void textout(BITMAP_OBJECT *bitmap, FONT_OBJECT *font, char *string, int x, int y, int size, int colour, int outline, int width) {
	c_textout(bitmap, font, string, x, y, size, colour, outline, width);
}
inline void textout_centre(BITMAP_OBJECT *bitmap, FONT_OBJECT *font, char *string, int x, int y, int size, int colour, int outline, int width) {
	c_textout_centre(bitmap, font, string, x, y, size, colour, outline, width);
}
inline void textout_right(BITMAP_OBJECT *bitmap, FONT_OBJECT *font, char *string, int x, int y, int size, int colour, int outline, int width) {
	c_textout_right(bitmap, font, string, x, y, size, colour, outline, width);
}
inline void install_sound(void) {
	c_install_sound();
}
inline void set_volume(float volume) {
	c_set_volume(volume);
}
inline float get_volume(void) {
	return c_get_volume();
}
inline SAMPLE_OBJECT* load_sample(char *filename) {
	return c_load_sample(filename);
}
inline void destroy_sample(char *filename) {
	c_destroy_sample(filename);
}
inline void play_sample(SAMPLE_OBJECT *sample, float vol, float freq, int loop) {
	c_play_sample(sample, vol, freq, loop);
}
inline void adjust_sample(SAMPLE_OBJECT *sample, float vol, float freq, int loop) {
	c_adjust_sample(sample, vol, freq, loop);
}
inline void stop_sample(SAMPLE_OBJECT *sample) {
	c_stop_sample(sample);
}
inline void pause_sample(SAMPLE_OBJECT *sample) {
	c_pause_sample(sample);
}
inline unsigned short rand(void) {
	return c_rand();
}
inline int rand32(void) {
	return c_rand32();
}
inline float frand(void) {
	return c_frand();
}
inline float length(float x, float y) {
	return c_length(x, y);
}
inline float distance(float x1, float y1, float x2, float y2) {
	return c_distance(x1, y1, x2, y2);
}
inline float distance2(float x1, float y1, float x2, float y2) {
	return c_distance2(x1, y1, x2, y2);
}
inline float linedist(float ex1, float ey1, float ex2, float ey2, float x, float y) {
	return c_linedist(ex1, ey1, ex2, ey2, x, y);
}
inline float lerp(float from, float to, float progress) {
	return c_lerp(from, to, progress);
}
inline float dot(float x1, float y1, float x2, float y2) {
	return c_dot(x1, y1, x2, y2);
}
inline int   sgn(float a) {
	return c_sgn(a);
}
inline float angle(float x1, float y1, float x2, float y2) {
	return c_angle(x1, y1, x2, y2);
}
inline float anglediff(float a, float b) {
	return c_anglediff(a, b);
}
inline float clamp(float value, float min, float max) {
	return c_clamp(value, min, max);
}
inline float scale(float value, float min, float max, float min2, float max2) {
	return c_scale(value, min, max, min2, max2);
}
inline float scaleclamp(float value, float min, float max, float min2, float max2) {
	return c_scaleclamp(value, min, max, min2, max2);
}
#define ALLEGRO_CONSOLE c_ALLEGRO_CONSOLE
inline void enable_debug(const char *id) {
	c_enable_debug(id);
}
inline void al_log(const char *string) { /* log() is a built-in function, renamed to al_log */
	c_log(string);
}
inline void wipe_log(void) {
	c_wipe_log();
}

#endif /* AL4JS_NO_INLINE */

#ifdef __cplusplus
}
#endif

#endif /* _ALLEGRO_JS_H */
