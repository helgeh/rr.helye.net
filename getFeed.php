<?php


// if ($feed_url = $this->input->get('feed')) {
if ($feed_url = $_GET['feed']) {
  $result = file_get_contents($feed_url);

  $x = new SimpleXmlElement($result);
  $ajaxdata = $x->channel;
  // $this->data['ajaxdata'] = $x->channel;
  // $this->ajax('feed-items');



  $list = "<ul>";
  $counter = 1;
  foreach($ajaxdata->item as $entry) {
    $title = $entry->title;
    $desc = $entry->description;
    $href = $entry->enclosure['url'];

    /*

    Det fins mer info i noen RSS'r. Sjekk om disse finnes og i så tilfelle bruk de!
  <itunes:summary>Blåblå - Boka - tre quizzzzer - Tom Norlie i sjokk! - Snikhumanetisering </itunes:summary>
  <itunes:subtitle>Blåblå - Boka - tre quizzzzer - Tom Norlie i sjokk! - Snikhumanetisering </itunes:subtitle>
  <guid>http://www.p4.no/mmo/Podcast/2013/19b28c8d-2302-4c9a-a7c5-239d2ab03434.mp3</guid>
  <pubDate>Fri, 04 Oct 2013 12:45:58 GMT</pubDate>
  <itunes:duration>00:46:53</itunes:duration>

    */

    $d = $entry->pubDate;
    $filename = "";
    if (($timestamp = strtotime($d)) === false) {
        $filename = $ajaxdata->title . "." . $counter;
    } else {
        $filename = $ajaxdata->title . "." . date('Y-m-d', $timestamp) . ".mp3";
    }

    $li = "<li class='feed-item'><div>";
    $li .= "<ul class='feed-buttons pull-right'>";
    $li .= "<li><a href='$href' download='$filename' class='dl' title='Last ned'><i class='icon-arrow-down'></i>DL</a></li>";
    $li .= "<li><a href='$href' target='_blank' class='listen-now' title='Lytt'><i class='icon-headphones'></i>LSTN</a></li>";
    $li .= "</ul>";
    $li .= "<h5>$title</h5>";
    $li .= "<p>$desc</p>";
    $li .= "</div></li>";

    $list .= $li;
    $counter++;
  }

  $list .= "</ul>";

  $output = array();
  // $output['image'] = $image;
  $output['title'] = $ajaxdata->title."";
  $output['posts'] = $list;


  header('Cache-Control: no-cache, must-revalidate');
  header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
  header('Content-type: application/json');

  echo json_encode($output);

  exit;
}