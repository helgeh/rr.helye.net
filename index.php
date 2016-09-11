<!DOCTYPE html>
<html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>RR</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">

    <!-- Le styles -->
    <link href="/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="/ci_assets/css/style.css" rel="stylesheet">
    <link href="/ci_assets/player/css/style.css" rel="stylesheet">
    
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2">
    <link rel="icon" type="image/png" href="/favicon-32x32.png?v=2" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicon-16x16.png?v=2" sizes="16x16">
    <link rel="manifest" href="/manifest.json?v=2">
    <link rel="mask-icon" href="/safari-pinned-tab.svg?v=2" color="#5bbad5">
    <link rel="shortcut icon" href="/favicon.ico?v=2">
    <meta name="theme-color" content="#ffffff">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>

<body>

  <div class="container">

    <div>
      <hgroup>
        <h1 id="feedTitle">...</h1>
      </hgroup>
    </div>

    <div id="controls">
    </div>

    <div class="row">

      <div class="col-lg-12">
        <div><a href="#" class="hidden" id="downloadAll">download all</a></div>
        <div id="feedPosts"></div>
      </div>

    </div>

  </div>


  <div class="player gradient isloading">

    <a class="button gradient play" id="play" title=""></a>
    <a class="button gradient mute" id="mute" title=""></a>

    <div class="range">
      <input type="range" id="seek" value="0" max=""/>
    </div>

    <a class="button gradient stop" id="stop" title=""></a>

  </div>

  <div class="container footer" id="main-footer">
    <div class="row">
      <div class="col-lg-12">
        <p>
          © helge dot hofstad at gmail dot com <?php echo date("Y"); ?>
          <span class="pull-right love">
            <a href="http://lilja.love" title="for ($i=1;$i <3 ;$i++) print(chr($i+1 <3 ?60:51));">
              <?php
              //    <3
                for ($i=1;$i <3 ;$i++)
                  print(chr($i+1 <3 ?60:51));
              //    <3
              ?>
            </a>
          </span>
        </p>
        </div>
    </div>
  </div>

  <!-- Le javascript -->
  <script src="/bower_components/jquery/dist/jquery.min.js"></script>
  <script src="/ci_assets/js/vendor/jquery.multiDownload.js"></script>
  <script src="/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="/ci_assets/js/vendor/lodash.min.js"></script>
  <script src="/ci_assets/player/js/js.js"></script>
  <script src="/ci_assets/player/js/html5slider.js"></script>
  <script src="/ci_assets/js/script.js"></script>

  <?php if ($_SERVER['HTTP_HOST'] == "rr.helye.net") : ?>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-31942931-2', 'helye.net');
      ga('send', 'pageview');

    </script>
  <?php else : ?>
    <!-- no analytics -->
  <?php endif; ?>
</body>
</html>