
var HjhPlayer = (function() {

	var self = this;

	var FWD_SECONDS = 10;
	var BCK_SECONDS = 5;

	var song;
	var container;
	var cover;
	var play;
	var mute;
	var seek;
	var stop;
	
	var options = {
		containerElem		: '.container',
		coverElem				: '.cover',
		playElem				: '#play',
		muteElem 				: '#mute',
		seekElem				: '#seek',
		stopElem 			: '#stop'
	}

	var evt = {
		onTimeUpdate: _.noop
	};

	var throttledUpdate;


	function initialize() {

		song = new Audio();
		console.log('initialize');

		$(song).on('timeupdate', function(e) {
			var curtime = parseInt(song.currentTime, 10);
			seek.attr('value', curtime);
			throttledUpdate();
		});

		$(song).on('canplay canplaythroug', function() {
			$('.player').removeClass('isloading');
			seek.attr('max', song.duration);
		});

		$(song).on('error', function(event) {
			console.log("err", event);
		});

		play.on('click', function(e) {
			e.preventDefault();
			togglePlay();
		});

		mute.on('click', function(e) {
			e.preventDefault();
			toggleMute();
		});

		stop.click(function(e) {
			e.preventDefault();
			stopPlaying();
		});

		seek.bind('change', function() {
			song.currentTime = $(this).val();
			seek.attr('max', song.duration);
		});


		/* KEYBOARD BINDINGS */

		window.onkeydown = function(e) {
			if (song.src === '')
				return;
			var key = e.key;
			if (key == ' ') {
				e.preventDefault();
				togglePlay();
			}
			else if (key == 'ArrowRight') {
				e.preventDefault();
				setTime(song.currentTime + FWD_SECONDS);
			}
			else if (key == 'ArrowLeft') {
				e.preventDefault();
				setTime(song.currentTime - BCK_SECONDS);
			}
		};
	}

	function togglePlay() {
		if (song.paused)
			playSong();
		else
			pauseSong();
	}

	function playSong() {
		play.removeClass('play').addClass('pause');
		if (stop.is(':hidden')) {
			stop.fadeIn(300);
		}
		seek.attr('max', song.duration);
		song.play();
	}

	function pauseSong() {
		play.removeClass('pause').addClass('play');
		song.pause();
	}

	function toggleMute() {
		song.volume = (song.volume ? 0 : 1);
		if (song.volume)
			mute.addClass('mute').removeClass('muted');
		else
			mute.addClass('muted').removeClass('mute');
	}

	function stopPlaying() {
		song.pause();
		play.removeClass('pause').addClass('play');
		stop.fadeOut(300);
	}


	var Factory = function () {
		container = $(options.containerElem);
		cover = $(options.coverElem);
		play = $(options.playElem);
		mute = $(options.muteElem);
		seek = $(options.seekElem);
		stop = $(options.stopElem);

		initialize();
	}

	function setSong(file) {
		stopPlaying();
		$(song).attr('src', file);
		$(song).trigger('load');
		$('.player').addClass('isloading');
	}

	function getSong() {
		return song.src;
	}

	function setTime(time) {
		song.currentTime = time;
		seek.attr('value', time);
	}

	function setUpdateFunc(func, wait) {
		evt.onTimeUpdate = func;
		throttledUpdate = _.throttle(doUpdate, wait || 5000, { 'trailing': false });
	}

	function doUpdate() {
		evt.onTimeUpdate(song.currentTime);
	}
	throttledUpdate = _.throttle(doUpdate, 5000, { 'trailing': false });

	var api = {
		setSong: setSong,
		getSong: getSong,
		setTime: setTime,
		onTimeUpdate: setUpdateFunc
	};

	Factory.prototype = api;


	return Factory;
	
	
})();
