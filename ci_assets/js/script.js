;(function($) {
  
  var player = new HjhPlayer();

  function onFeedSelected(url) {
    player.setSong(url);
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
        $(this).on('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          var url = $(this).attr('href');
          onFeedSelected(url);
          return false;
        });
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

  getFeed('http://podkast.nrk.no/program/radioresepsjonen.rss');

})(jQuery);