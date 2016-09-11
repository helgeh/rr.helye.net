;(function($) {

  function onFeedSelected(event) {
    var url, savedTime;
    url = $(this).attr('href');
    if (!songs.hasSong(url))
      songs.addNewSong(url);
    savedTime = songs.getCurrentTime(url);
    player.setSong(url);
    player.setTime(savedTime);
    $('.feed-item > div').removeClass('current');
    $(this).parents('div').addClass('current');
    event.preventDefault();
    return false;
  }


  function getFeed(rssUrl) {
    $.get('./getFeed.php', {feed: rssUrl}, function(evt) {
      var showMoreButton = null,
      data = evt;
      $('#feedTitle').text(data.title);
      showMoreButton = $('<a href="#">10 More...</a> | <a href="#" id="showall">Show All</a>');
      showMoreButton.click( function(e) {
        if (e.target.id == "showall")
          $(showMoreButton).siblings(':hidden').show().end().remove();
        else
          $(showMoreButton).siblings(':hidden:lt(10)').show();
        if ($(showMoreButton).siblings(':hidden').length <= 0)
          $(showMoreButton).remove();
        return false;
      });
      $('#feedPosts')
      .empty()
      .append(
        $(data.posts)
        .find('li.feed-item:gt(10)')
        .hide()
        .end()
        .append(showMoreButton)
        );

      // DOWNLOAD ALL IS NOT CURRENTLY WORKING. LET THIS BE HIDDEN UNTIL FIXED!
      // $('#downloadAll').removeClass('hidden');

      $('.listen-now').each(function() {
        $(this).on('click', onFeedSelected);
      });

      return false;
    });
  }

  function downloadURL(url, newName) {
    var iframe;
    var hiddenIFrameID = 'hiddenDownloader';
    iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
      iframe = document.createElement('iframe');
      iframe.id = hiddenIFrameID;
      // iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
    iframe.src = '/feed/downloadMp3/?url=' + url + '&newName=' + newName;
  }

  // $('#downloadAll').click(function(){
  //   $('.dl').each(function(index, element){
  //       // console.log(element);
  //       // $(element).click();
  //       // downloadURL(escape(element.href), element.download)
  //     });
  //   return false;
  // });

  function Songs() {
    this.songs = [];
  }
  Songs.prototype = {
    addNewSong: function(url) {
      this.songs.push({url: url, currentTime: 0, playCount: 0});
    },
    hasSong: function(url) {
      return this.getSong(url) !== undefined;
    },
    getSong: function(url) {
      return _.find(this.songs, {url: url});
    },
    setCurrentTime: function(url, time) {
      this.getSong(url).currentTime = time;
    },
    getCurrentTime: function(url) {
      return this.getSong(url).currentTime;
    },
    load: function() {
      this.songs = JSON.parse(localStorage.getItem('songs')) || [];
    },
    save: function() {
      localStorage.setItem('songs', JSON.stringify(this.songs));
    }
  };

////////////////

  var player = new HjhPlayer();

  player.onTimeUpdate(function(time) {
    songs.setCurrentTime(player.getSong(), time);
    songs.save();
  });

  var songs = new Songs();
  songs.load();

  getFeed('http://podkast.nrk.no/program/radioresepsjonen.rss');

})(jQuery);