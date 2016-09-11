
var HjhPlayer = (function() {

	var FWD_SECONDS = 10;
	var BCK_SECONDS = 5;

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


	function initialize() {

		song = new Audio();

		play.live('click', function(e) {
			e.preventDefault();
			togglePlay();
		});

		mute.live('click', function(e) {
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
			console.log(e.which);
			if (song.src === '')
				return;
			var key = e.key;
			if (key == ' ') {
				togglePlay();
			}
			else if (key == 'ArrowRight') {
				song.currentTime = song.currentTime + FWD_SECONDS;
			}
			else if (key == 'ArrowLeft') {
				song.currentTime = song.currentTime - BCK_SECONDS;
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
		if (song.currentTime == 0) {
			stop.fadeIn(300);
			seek.attr('max', song.duration);
		}
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
		song.currentTime = 0;
		play.removeClass('pause').addClass('play');
		stop.fadeOut(300);
		seek.attr('value', 0);
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
		var $song = $(song);
		stopPlaying();
		$song.attr('src', file);
		$song.load();
		$('.player').addClass('isloading');
		$song.on('timeupdate',function (){
			var curtime = parseInt(song.currentTime, 10);
			seek.attr('value', curtime);
		});
		$song.on('canplay canplaythroug', function() {
			$('.player').removeClass('isloading');
		});
		$song.on('error', function(event) {
			console.log("err", event);
		});
	}

	var api = {
		setSong: setSong
	};

	Factory.prototype = api;


	return Factory;
	
	
})();
