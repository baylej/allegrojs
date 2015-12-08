/**
	include allegro.js or alleg.js before including this file!

	I'm an emscripten library, the “glue” code between C and JS
**/

var AllegroJS = {
	$ALLEG: {
		// HANDLERS
		// index 0 is reserved for default values
		_bitmaps: [null],
		_samples: [null],
		_fonts: [null],
		_ccanvas: null,
		_keyboard_installed: false,
		_ckeys: null,
		_cpressed: null,
		_creleased: null,

		// PRIVATE FUNCTIONS
		_post_install_keyboard: function() {
			ALLEG._keyboard_installed = true;
			ALLEG._ckeys = _malloc(4 * keys.length);
			writeArrayToMemory(keys, ALLEG._ckeys);
			ALLEG._cpressed = _malloc(4 * pressed.length);
			writeArrayToMemory(pressed, ALLEG._cpressed);
			ALLEG._creleased = _malloc(4 * released.length);
			writeArrayToMemory(released, ALLEG._creleased);
		},
		_post_set_gfx_mode: function() {
			ALLEG._bitmaps[0] = canvas;
			ALLEG._fonts[0] = font;
			ALLEG._ccanvas = ALLEG._alloc_pack_bitmap(0);
		},
		_alloc_pack_bitmap: function(handle) {
			var res = _malloc(3*4);
			setValue(res, handle, "i32");
			setValue(res+4, ALLEG._bitmaps[handle].w, "i32");
			setValue(res+8, ALLEG._bitmaps[handle].h, "i32");
			return res;
		},
		_unpack_bitmap: function(ptr) {
			return getValue(ptr, "i32");
		},
	},

	// GLOBALS, as functions because globals are no longer supported in emscripten (too bad)
	c_mouse_b: function() { return mouse_b; },
	c_mouse_pressed: function() { return mouse_pressed; },
	c_mouse_released: function() { return mouse_released; },
	c_mouse_x: function() { return mouse_x; },
	c_mouse_y: function() { return mouse_y; },
	c_mouse_z: function() { return mouse_z; },
	c_mouse_mx: function() { return mouse_mx; },
	c_mouse_my: function() { return mouse_my; },
	c_mouse_mz: function() { return mouse_mz; },
	c_key: function() { return ALLEG._ckeys; },
	c_pressed: function() { return ALLEG._cpressed; },
	c_released: function() { return ALLEG._creleased; },
	c_canvas: function() { return ALLEG._ccanvas; },
	c_SCREEN_W: function() { return SCREEN_W; },
	c_SCREEN_H: function() { return SCREEN_H; },
	c_font: function() { return 0; },
	c_ALLEGRO_CONSOLE: function() { return ALLEGRO_CONSOLE; },

	// FUNCTIONS
	c_install_allegro: install_allegro,
	c_allegro_init: allegro_init,
	c_allegro_init_all: function(id, w, h, menu, enable_keys) {
		var cid_s = Pointer_stringify(id);
		allegro_init_all(cid_s, w, h, menu, []); // FIXME: enable_keys to JS array
		ALLEG._post_install_keyboard();
		ALLEG._post_set_gfx_mode();
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
		if (ALLEG._keyboard_installed) {
			loop(
				function() {
					writeArrayToMemory(keys, ALLEG._ckeys);
					writeArrayToMemory(pressed, ALLEG._cpressed);
					writeArrayToMemory(released, ALLEG._creleased);
					p();
				},
				speed
			);
		} else {
			loop(p, speed);
		}
	},
	c_loading_bar: loading_bar,
	c_ready: ready,
	c_remove_int: remove_int,
	c_remove_all_ints: remove_all_ints,

	c_install_keyboard: function(enable_keys) {
		install_keyboard([]); // FIXME: enable_keys to JS array
		ALLEG._post_install_keyboard();
	},
	c_remove_keyboard: remove_keyboard,

	c_create_bitmap: function(width, height) {
		return ALLEG._alloc_pack_bitmap(ALLEG._bitmaps.push(create_bitmap(width, height)) - 1);
	},
	c_load_bitmap: function(filename) {
		return ALLEG._alloc_pack_bitmap(ALLEG._bitmaps.push(load_bitmap(filename)) - 1);
	},
	c_load_bmp: function(filename) {
		return ALLEG._alloc_pack_bitmap(ALLEG._bitmaps.push(load_bmp(filename)) - 1);
	},

	c_set_gfx_mode: function(canvas_id, w, h) {
		var cid_s = Pointer_stringify(canvas_id);
		set_gfx_mode(cid_s, w, h);
		ALLEG._post_set_gfx_mode();
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
		return getpixel(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], x, y);
	},
	c_putpixel: function(bitmap, x, y, colour) {
		putpixel(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], x, y, colour);
	},
	c_clear_bitmap: function(bitmap) {
		clear_bitmap(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)]);
	},
	c_clear_to_color: function(bitmap, colour) {
		clear_to_color(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], colour);
	},
	c_line: function(bitmap, x1, y1, x2, y2, colour, width) {
		line(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], x1, y1, x2, y2, colour, width);
	},
	c_vline: function(bitmap, x, y1, y2, colour, width) {
		vline(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], x, y1, y2, colour, width);
	},
	c_hline: function(bitmap, x1, y, x2, colour, width) {
		hline(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], x1, y, x2, colour, width);
	},
	c_triangle: function(bitmap, x1, y1, x2, y2, x3, y3, colour, width) {
		triangle(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], x1, y1, x2, y2, x3, y3, colour, width);
	},
	c_trianglefill: function(bitmap, x1, y1, x2, y2, x3, y3, colour) {
		trianglefill(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], x1, y1, x2, y2, x3, y3, colour);
	},
	c_polygon: function(bitmap, vertices, points, colour, width) {
		polygon(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], vertices, points, colour, width);
	},
	c_polygonfill: function(bitmap, vertices, points, colour) {
		polygonfill(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], vertices, points, colour);
	},
	c_rect: function(bitmap, x1, y1, x2, y2, colour, width) {
		rect(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], x1, y1, x2, y2, colour, width);
	},
	c_rectfill: function(bitmap, x1, y1, x2, y2, colour) {
		rectfill(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], x1, y1, x2, y2, colour);
	},
	c_circle: function(bitmap, x, y, radius, colour, width) {
		circle(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], x, y, radius, colour, width);
	},
	c_circlefill: function(bitmap, x, y, radius, colour) {
		circlefill(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], x, y, radius, colour);
	},
	c_arc: function(bitmap, x, y, ang1, ang2, radius, colour, width) {
		arc(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], x, y, ang1, ang2, radius, colour, width);
	},
	c_arcfill: function(bitmap, x, y, ang1, ang2, radius, colour) {
		arcfill(ALLEG._bitmaps[ALLEG._unpack_bitmap(bitmap)], x, y, ang1, ang2, radius, colour);
	},

	c_draw_sprite: function(bmp, sprite, x, y) {
		draw_sprite(ALLEG._bitmaps[ALLEG._unpack_bitmap(bmp)], ALLEG._bitmaps[ALLEG._unpack_bitmap(sprite)], x, y);
	},
	c_stretch_sprite: function(bmp, sprite, x, y, w, h) {
		stretch_sprite(ALLEG._bitmaps[ALLEG._unpack_bitmap(bmp)], ALLEG._bitmaps[ALLEG._unpack_bitmap(sprite)], x, y, w, h);
	},
	c_rotate_sprite: function(bmp, sprite, x, y, angle) {
		rotate_sprite(ALLEG._bitmaps[ALLEG._unpack_bitmap(bmp)], ALLEG._bitmaps[ALLEG._unpack_bitmap(sprite)], x, y, angle);
	},
	c_pivot_sprite: function(bmp, sprite, x, y, cx, cy, angle) {
		pivot_sprite(ALLEG._bitmaps[ALLEG._unpack_bitmap(bmp)], ALLEG._bitmaps[ALLEG._unpack_bitmap(sprite)], x, y, cx, cy, angle);
	},
	c_rotate_scaled_sprite: function(bmp, sprite, x, y, angle, scale) {
		rotate_scaled_sprite(ALLEG._bitmaps[ALLEG._unpack_bitmap(bmp)], ALLEG._bitmaps[ALLEG._unpack_bitmap(sprite)], x, y, angle, scale);
	},
	c_pivot_scaled_sprite: function(bmp, sprite, x, y, cx, cy, angle, scale) {
		pivot_scaled_sprite(ALLEG._bitmaps[ALLEG._unpack_bitmap(bmp)], ALLEG._bitmaps[ALLEG._unpack_bitmap(sprite)], x, y, cx, cy, angle, scale);
	},
	c_blit: function(source, dest, sx, sy, dx, dy, w, h) {
		blit(ALLEG._bitmaps[ALLEG._unpack_bitmap(source)], ALLEG._bitmaps[ALLEG._unpack_bitmap(dest)], sx, sy, dx, dy, w, h);
	},
	c_stretch_blit: function(source, dest, sx, sy, sw, sh, dx, dy, dw, dh) {
		stretch_blit(ALLEG._bitmaps[ALLEG._unpack_bitmap(source)], ALLEG._bitmaps[ALLEG._unpack_bitmap(dest)], sx, sy, sw, sh, dx, dy, dw, dh);
	},

	c_load_font: function(filename) {
		return ALLEG._fonts.push(load_font(filename));
	},
	c_create_font: function(family) {
		return ALLEG._fonts.push(create_font(family));
	},
	c_textout: function(b, f, s, x, y, size, col, outline, width) {
		textout(ALLEG._bitmaps[ALLEG._unpack_bitmap(b)], ALLEG._fonts[f], s, x, y, size, col, outline, width);
	},
	c_textout_centre: function(b, f, s, x, y, size, col, outline, width) {
		var str = Pointer_stringify(s);
		textout_centre(ALLEG._bitmaps[ALLEG._unpack_bitmap(b)], ALLEG._fonts[f], str, x, y, size, col, outline, width);
	},
	c_textout_right: function(b, f, s, x, y, size, col, outline, width) {
		textout_right(ALLEG._bitmaps[ALLEG._unpack_bitmap(b)], ALLEG._fonts[f], s, x, y, size, col, outline, width);
	},

	c_install_sound: install_sound,
	c_set_volume: set_volume,
	c_get_volume: get_volume,
	c_load_sample: function(filename) {
		return ALLEG._samples.push(load_sample(filename));
	},
	c_destroy_sample: function(sample) {
		destroy_sample(ALLEG._samples[sample]);
	},
	c_play_sample: function(sample, vol, freq, loop) {
		play_sample(ALLEG._samples[sample], vol, freq, loop);
	},
	c_adjust_sample: function(sample, vol, freq, loop) {
		adjust_sample(ALLEG._samples[sample], vol, freq, loop);
	},
	c_stop_sample: function(sample) {
		stop_sample(ALLEG._samples[sample]);
	},
	c_pause_sample: function(sample) {
		pause_sample(ALLEG._samples[sample]);
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
};

autoAddDeps(AllegroJS, '$ALLEG');

mergeInto(LibraryManager.library, AllegroJS);
