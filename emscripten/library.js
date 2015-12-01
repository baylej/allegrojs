/**
	include allegro.js or alleg.js before including this file!

	I'm an emscripten library, the “glue” code between C and JS
**/

mergeInto(LibraryManager.library, {
	// HANDLERS
	// index 0 is reserved for default values
	_bitmaps: [null],
	_samples: [null],
	_fonts: [null],

	// GLOBALS
	c_mouse_b: mouse_b,
	c_mouse_pressed: mouse_pressed,
	c_mouse_released: mouse_released,
	c_mouse_x: mouse_x,
	c_mouse_y: mouse_y,
	c_mouse_z: mouse_z,
	c_mouse_mx: mouse_mx,
	c_mouse_my: mouse_my,
	c_mouse_mz: mouse_mz,
	c_key: key,
	c_pressed: pressed,
	c_released: released,
	c_canvas: {handle:0, w:SCREEN_W, h:SCREEN_H},
	c_SCREEN_W: SCREEN_W,
	c_SCREEN_H: SCREEN_H,
	c_font: 0,
	c_ALLEGRO_CONSOLE: ALLEGRO_CONSOLE,

	// FUNCTIONS
	c_install_allegro: install_allegro,
	c_allegro_init: allegro_init,
	c_allegro_init_all: function(id, w, h, menu, enable_keys) {
		allegro_init_all(id, w, h, menu, enable_keys);
		c_SCREEN_W = SCREEN_W;
		c_SCREEN_H = SCREEN_H;
		c_canvas.w = SCREEN_W;
		c_canvas.h = SCREEN_H;
		_bitmaps[0] = canvas;
	},

	c_install_mouse: install_mouse,
	c_remove_mouse: remove_mouse,
	c_show_mouse: show_mouse,
	c_hide_mouse: hide_mouse,

	c_install_timer: install_timer,
	c_time: time,
	c_install_int: install_int,
	c_install_int_ex: install_int_ex,
	c_loop: function(p, speed) {
		loop(
			function(){
				c_mouse_b = mouse_b;
				c_mouse_pressed = mouse_pressed;
				c_mouse_released = mouse_released;
				c_mouse_x = mouse_x;
				c_mouse_y = mouse_y;
				c_mouse_z = mouse_z;
				c_mouse_mx = mouse_mx;
				c_mouse_my = mouse_my;
				c_mouse_mz = mouse_mz;
				c_key = key;
				p();
			},
			speed
		);
	},
	c_loading_bar: loading_bar,
	c_ready: ready,
	c_remove_int: remove_int,
	c_remove_all_ints: remove_all_ints,

	c_install_keyboard: install_keyboard,
	c_remove_keyboard: remove_keyboard,

	c_create_bitmap: function(width, height) {
		return {handle:_bitmaps.push(create_bitmap(width, height)) - 1, w:width, h:height}; 
	},
	c_load_bitmap: function(filename) {
		var handle_ind = _bitmaps.push(load_bitmap(filename)) - 1;
		return {handle: handle_ind, w:_bitmaps[handle_ind].w, h:_bitmaps[handle_ind].h};
	},
	c_load_bmp: function(filename) {
		var handle_ind = _bitmaps.push(load_bmp(filename)) - 1;
		return {handle: handle_ind, w:_bitmaps[handle_ind].w, h:_bitmaps[handle_ind].h};
	},

	c_set_gfx_mode: function(canvas_id, w, h) {
		set_gfx_mode(canvas_id, w, h);
		c_SCREEN_W = SCREEN_W;
		c_SCREEN_H = SCREEN_H;
		c_canvas.w = SCREEN_W;
		c_canvas.h = SCREEN_H;
		_bitmaps[0] = canvas;
	},

	c_makecol: makecol,
	c_makecolf: makecolf,
	c_getr: getr,
	c_getg: getg,
	c_getb: getb,
	c_geta: geta,
	c_getrf: getrf,
	c_getgf: getgf,
	c_getbf: getbf,
	c_getaf: getaf,
	c_getpixel: function(bitmap, x, y) {
		return getpixel(_bitmaps[bitmap.handle], x, y);
	},
	c_putpixel: function(bitmap, x, y, colour) {
		putpixel(_bitmaps[bitmap.handle], x, y, colour);
	},
	c_clear_bitmap: function(bitmap) {
		clear_bitmap(_bitmaps[bitmap.handle]);
	},
	c_clear_to_color: function(bitmap, colour) {
		clear_to_color(_bitmaps[bitmap.handle], colour);
	},
	c_line: function(bitmap, x1, y1, x2, y2, colour, width) {
		line(_bitmaps[bitmap.handle], x1, y1, x2, y2, colour, width);
	},
	c_vline: function(bitmap, x, y1, y2, colour, width) {
		vline(_bitmaps[bitmap.handle], x, y1, y2, colour, width);
	},
	c_hline: function(bitmap, x1, y, x2, colour, width) {
		hline(_bitmaps[bitmap.handle], x1, y, x2, colour, width);
	},
	c_triangle: function(bitmap, x1, y1, x2, y2, x3, y3, colour, width) {
		triangle(_bitmaps[bitmap.handle], x1, y1, x2, y2, x3, y3, colour, width);
	},
	c_trianglefill: function(bitmap, x1, y1, x2, y2, x3, y3, colour) {
		trianglefill(_bitmaps[bitmap.handle], x1, y1, x2, y2, x3, y3, colour);
	},
	c_polygon: function(bitmap, vertices, points, colour, width) {
		polygon(_bitmaps[bitmap.handle], vertices, points, colour, width);
	},
	c_polygonfill: function(bitmap, vertices, points, colour) {
		polygonfill(_bitmaps[bitmap.handle], vertices, points, colour);
	},
	c_rect: function(bitmap, x1, y1, x2, y2, colour, width) {
		rect(_bitmaps[bitmap.handle], x1, y1, x2, y2, colour, width);
	},
	c_rectfill: function(bitmap, x1, y1, x2, y2, colour) {
		rectfill(_bitmaps[bitmap.handle], x1, y1, x2, y2, colour);
	},
	c_circle: function(bitmap, x, y, radius, colour, width) {
		circle(_bitmaps[bitmap.handle], x, y, radius, colour, width);
	},
	c_circlefill: function(bitmap, x, y, radius, colour) {
		circlefill(_bitmaps[bitmap.handle], x, y, radius, colour);
	},
	c_arc: function(bitmap, x, y, ang1, ang2, radius, colour, width) {
		arc(_bitmaps[bitmap.handle], x, y, ang1, ang2, radius, colour, width);
	},
	c_arcfill: function(bitmap, x, y, ang1, ang2, radius, colour) {
		arcfill(_bitmaps[bitmap.handle], x, y, ang1, ang2, radius, colour);
	},

	c_draw_sprite: function(bmp, sprite, x, y) {
		draw_sprite(_bitmaps[bmp.handle], _bitmaps[sprite.handle], x, y);
	},
	c_stretch_sprite: function(bmp, sprite, x, y, w, h) {
		stretch_sprite(_bitmaps[bmp.handle], _bitmaps[sprite.handle], x, y, w, h);
	},
	c_rotate_sprite: function(bmp, sprite, x, y, angle) {
		rotate_sprite(_bitmaps[bmp.handle], _bitmaps[sprite.handle], x, y, angle);
	},
	c_pivot_sprite: function(bmp, sprite, x, y, cx, cy, angle) {
		pivot_sprite(_bitmaps[bmp.handle], _bitmaps[sprite.handle], x, y, cx, cy, angle);
	},
	c_rotate_scaled_sprite: function(bmp, sprite, x, y, angle, scale) {
		rotate_scaled_sprite(_bitmaps[bmp.handle], _bitmaps[sprite.handle], x, y, angle, scale);
	},
	c_pivot_scaled_sprite: function(bmp, sprite, x, y, cx, cy, angle, scale) {
		pivot_scaled_sprite(_bitmaps[bmp.handle], _bitmaps[sprite.handle], x, y, cx, cy, angle, scale);
	},
	c_blit: function(source, dest, sx, sy, dx, dy, w, h) {
		blit(_bitmaps[source.handle], _bitmaps[dest.handle], sx, sy, dx, dy, w, h);
	},
	c_stretch_blit: function(source, dest, sx, sy, sw, sh, dx, dy, dw, dh) {
		stretch_blit(_bitmaps[source.handle], _bitmaps[dest.handle], sx, sy, sw, sh, dx, dy, dw, dh);
	},

	c_load_font: function(filename) {
		return _fonts.push(load_font(filename));
	},
	c_create_font: function(family) {
		return _fonts.push(create_font(family));
	},
	c_textout: function(b, f, s, x, y, size, col, outline, width) {
		textout(_bitmaps[b.handle], _fonts[f], s, x, y, size, col, outline, width);
	},
	c_textout_centre: function(b, f, s, x, y, size, col, outline, width) {
		textout_centre(_bitmaps[b.handle], _fonts[f], s, x, y, size, col, outline, width);
	},
	c_textout_right: function(b, f, s, x, y, size, col, outline, width) {
		textout_right(_bitmaps[b.handle], _fonts[f], s, x, y, size, col, outline, width);
	},

	c_install_sound: install_sound,
	c_set_volume: set_volume,
	c_get_volume: get_volume,
	c_load_sample: function(filename) {
		return _samples.push(load_sample(filename));
	},
	c_destroy_sample: function(sample) {
		destroy_sample(_samples[sample]);
	},
	c_play_sample: function(sample, vol, freq, loop) {
		play_sample(_samples[sample], vol, freq, loop);
	},
	c_adjust_sample: function(sample, vol, freq, loop) {
		adjust_sample(_samples[sample], vol, freq, loop);
	},
	c_stop_sample: function(sample) {
		stop_sample(_samples[sample]);
	},
	c_pause_sample: function(sample) {
		pause_sample(_samples[sample]);
	},

	c_rand: rand,
	c_rand32: rand32,
	c_frand: frand,
	c_length: length,
	c_distance: distance,
	c_distance2: distance2,
	c_linedist: linedist,
	c_lerp: lerp,
	c_dot: dot,
	c_sgn: sgn,
	c_angle: angle,
	c_anglediff: anglediff,
	c_clamp: clamp,
	c_scale: scale,
	c_scaleclamp: scaleclamp,

	c_enable_debug: enable_debug,
	c_log: log,
	c_wipe_log: wipe_log
});
