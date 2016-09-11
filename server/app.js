'use strict';

var path = require('path');
var express = require('express');
var serveStatic = require('serve-static');
var parser = require('parse-rss');

var app = express();

const FEED_TITLE = 'Radioresepsjonen på P13';

app.get('/getFeed.php', function(req, res) {
  var url = req.query.feed;
  if (!url)
    return res.status(422).json({'message': 'missing parameter', 'e': new Error('Parameter feed url missing')});
  parser(url, function(err, rss) {
    if (err)
      return res.status(404).json({'message': 'not found', 'e': err});
    try {
      res.json({posts: getHtmlAndYesItsStupid(rss), title: FEED_TITLE});
    }
    catch(e){
      console.log(e);
      res.json({err: e, rss: rss});
    }
  });
});

function getHtmlAndYesItsStupid(rss) {

  var list = '<ul>';

  for (var i = 0; i < rss.length; i++) {
    var entry = rss[i];

    var title = entry.title;
    var desc = entry.description;
    var href = entry.enclosures[0]['url'];

    var date = new Date(entry.pubDate);
    var filename = "";
    if (!date) {
        filename = FEED_TITLE + " - " + title;
    } else {
        filename = FEED_TITLE + ".";
        filename += date.getFullYear() + '-' + (date.getMonth()+1) + '-' + (date.getDate()+1);
        filename += '.mp3';
    }

    var li = "<li class='feed-item'><div>"
    li += "<ul class='feed-buttons pull-right'>";
    li += "<li><a href='" + href + "' download='" + filename + "' class='dl' title='Last ned'><i class='icon-arrow-down'></i>DL</a></li>";
    li += "<li><a href='" + href + "' target='_blank' class='listen-now' title='Lytt'><i class='icon-headphones'></i>LSTN</a></li>";
    li += "</ul>";
    li += "<h5>" + title + "</h5>";
    li += "<p>" + desc + "</p>";
    li += "</div></li>";

    list += li + '\n';
  }

  return list;
}


app.use(serveStatic(path.join(__dirname, './../static')));
app.use('/ci_assets', serveStatic(path.join(__dirname, './../ci_assets')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});