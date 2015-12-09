/**
	include allegro.js or alleg.js before including this file!

	I'm an emscripten library, the “glue” code between C and JS
**/

var AllegroJS = {
	$ALLEG: {
		// HANDLERS
		// index 0 is reserved for default values
		_bitmaps: [null],
		_bitmap_addrs: [null],
		_samples: [null],
		_fonts: [null],
		_ccanvas: null,
		_keyboard_installed: false,
		_ckey: null,
		_cpressed: null,
		_creleased: null,

		// PRIVATE FUNCTIONS
		_writeArray32ToMemory: function(array, buffer) {
			for (var i=0; i<array.length; i++) {
				HEAP32[((buffer+i*4)>>2)]=array[i];
			}
		},
		_post_install_keyboard: function() {
			ALLEG._keyboard_installed = true;
			ALLEG._ckey = _malloc(4 * key.length);
			ALLEG._writeArray32ToMemory(key, ALLEG._ckey);
			ALLEG._cpressed = _malloc(4 * pressed.length);
			ALLEG._writeArray32ToMemory(pressed, ALLEG._cpressed);
			ALLEG._creleased = _malloc(4 * released.length);
			ALLEG._writeArray32ToMemory(released, ALLEG._creleased);
		},
		_post_set_gfx_mode: function() {
			ALLEG._bitmaps[0] = canvas;
			ALLEG._fonts[0] = font;
			ALLEG._ccanvas = ALLEG._alloc_pack_bitmap(0);
		},
		_pack_bitmap: function(handle) {
			var addr = ALLEG._bitmap_addrs[handle];
			setValue(addr, handle, "i32");
			setValue(addr+4, ALLEG._bitmaps[handle].w, "i32");
			setValue(addr+8, ALLEG._bitmaps[handle].h, "i32");
		},
		_alloc_pack_bitmap: function(handle) {
			var res = _malloc(3*4);
			ALLEG._bitmap_addrs[handle] = res;
			ALLEG._pack_bitmap(handle);
			return res;
		},
		_repack_bitmaps: function() { // called by _ready when ready returns
			for (var it=1; it<ALLEG._bitmaps.length; it++) {
				ALLEG._pack_bitmap(it);
			}
		},
		_unpack_bitmap: function(ptr) {
			return getValue(ptr, "i32");
		}
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
	c_key: function() { return ALLEG._ckey; },
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
	c_install_int: function(p, msec) {
		var procedure = function() {
			var stack = Runtime.stackSave();
			Runtime.dynCall('v', p, null);
			Runtime.stackRestore(stack);
		};
		install_int(procedure, msec);
	},
	c_install_int_ex: function(p, speed) {
		var procedure = function() {
			var stack = Runtime.stackSave();
			Runtime.dynCall('v', p, null);
			Runtime.stackRestore(stack);
		};
		install_int_ex(procedure, speed);
	},
	c_loop: function(p, speed) {
		if (ALLEG._keyboard_installed) {
			loop(
				function() {
					ALLEG._writeArray32ToMemory(key, ALLEG._ckey);
					ALLEG._writeArray32ToMemory(pressed, ALLEG._cpressed);
					ALLEG._writeArray32ToMemory(released, ALLEG._creleased);
					var stack = Runtime.stackSave();
					Runtime.dynCall('v', p, null);
					Runtime.stackRestore(stack);
				},
				speed
			);
		} else {
			loop(
				function() {
					var stack = Runtime.stackSave();
					Runtime.dynCall('v', p, null);
					Runtime.stackRestore(stack);
				},
				speed
			);
		}
	},
	c_loading_bar: loading_bar,
	c_ready: function(p, b) {
		var procedure = function() {
			// repack bitmaps because they were loaded asynchronously
			ALLEG._repack_bitmaps();
			var stack = Runtime.stackSave();
			Runtime.dynCall('v', p, null);
			Runtime.stackRestore(stack);
		};
		if (b) {
			var bar = function(f) {
				var stack = Runtime.stackSave();
				Runtime.dynCall('vf', b, [allocate([f], 'float', ALLOC_STACK)]);
				Runtime.stackRestore(stack);
			};
			ready(procedure, bar);
		} else {
			ready(procedure, null);
		}
	},
	c_remove_int: function(p) {
		// FIXME: how is this supposed to work!?
	},
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
		var filename_s = Pointer_stringify(filename);
		return ALLEG._alloc_pack_bitmap(ALLEG._bitmaps.push(load_bitmap(filename_s)) - 1);
	},
	c_load_bmp: function(filename) {
		var filename_s = Pointer_stringify(filename);
		return ALLEG._alloc_pack_bitmap(ALLEG._bitmaps.push(load_bmp(filename_s)) - 1);
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
		var filename_s = Pointer_stringify(filename);
		return ALLEG._fonts.push(load_font(filename_s)) - 1;
	},
	c_create_font: function(family) {
		var family_s = Pointer_stringify(family);
		return ALLEG._fonts.push(create_font(family_s)) - 1;
	},
	c_textout: function(b, f, s, x, y, size, col, outline, width) {
		var str = Pointer_stringify(s);
		textout(ALLEG._bitmaps[ALLEG._unpack_bitmap(b)], ALLEG._fonts[f], str, x, y, size, col, outline, width);
	},
	c_textout_centre: function(b, f, s, x, y, size, col, outline, width) {
		var str = Pointer_stringify(s);
		textout_centre(ALLEG._bitmaps[ALLEG._unpack_bitmap(b)], ALLEG._fonts[f], str, x, y, size, col, outline, width);
	},
	c_textout_right: function(b, f, s, x, y, size, col, outline, width) {
		var str = Pointer_stringify(s);
		textout_right(ALLEG._bitmaps[ALLEG._unpack_bitmap(b)], ALLEG._fonts[f], str, x, y, size, col, outline, width);
	},

	c_install_sound: install_sound,
	c_set_volume: set_volume,
	c_get_volume: get_volume,
	c_load_sample: function(filename) {
		var filename_s = Pointer_stringify(filename);
		return ALLEG._samples.push(load_sample(filename_s)) - 1;
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

	c_enable_debug: function(debug_id) {
		enable_debug(Pointer_stringify(debug_id));
	},
	c_log: function(s) {
		enable_debug(Pointer_stringify(s));
	},
	c_wipe_log: wipe_log
};

autoAddDeps(AllegroJS, '$ALLEG');

mergeInto(LibraryManager.library, AllegroJS);
