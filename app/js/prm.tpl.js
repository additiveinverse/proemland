angular.module('appProem').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/partials/disc-detail.html',
    "<header class=\"hdr prod-hdr prod-detail-hdr\"><h2 ng-bind-html-unsafe=\"data[0].ttl\" class=\"ttl prod-hdr-ttl prod-detail-hdr-ttl fn\" itemprop=\"name\">{{ data[0].ttl }}</h2></header><article class=\"prod-details prod-detail-nfo prod-nfo nfo\"><img class=\"prod-thumb thumb photo\" ng-src=\"{{ data[0].img }}\" alt=\"{{ data[0].ttl }}\"><dl class=\"lst prod-detail-nfo-lst nfo-lst\"><dt class=\"type prod-detail-nfo-typ nfo-typ\">released</dt><dd class=\"val prod-detail-nfo-val nfo-val\">{{ data[0].date | date:yyyy }}</dd><dt class=\"type prod-detail-nfo-typ nfo-typ\">label</dt><dd class=\"val prod-detail-nfo-val nfo-val\"><a class=\"prod-detail-nfo-lnk\" href=\"{{ data[0].cat_lnk }}\" target=\"_blank\">{{ data[0].cat_lbl }}</a></dd><dt class=\"type prod-detail-nfo-typ nfo-typ\">catalog ID</dt><dd class=\"val prod-detail-nfo-val nfo-val\"><a class=\"prod-detail-nfo-lnk\" href=\"{{ data[0].digital }}\" target=\"_blank\">{{ data[0].cat_num }}</a></dd></dl><a class=\"btn btn-buy prod-detail-btn-buy\" href=\"{{ data[0].digital }}\" target=\"_blank\">Purchase</a><ol class=\"lst track-lst prod-detail-track-lst\"><li ng-repeat=\"tl in data[0].Body track by $index\">{{ tl }}</li></ol></article>"
  );


  $templateCache.put('app/partials/disc-list.html',
    "<article role=\"article\" itemscope ng-repeat=\"d in ( filterD = (data | filter:query))\" class=\"hproduct prod prod-item\" id=\"release-{{ d.prod_id}}\" ng-click=\"select_item( $index )\"><span role=\"button\" class=\"btn btn-expand\">expand</span><header class=\"hdr prod-hdr prod-item-hdr\"><h2 ng-bind-html-unsafe=\"d.ttl\" class=\"ttl prod-hdr-ttl prod-item-hdr-ttl fn\" itemprop=\"name\">{{ d.ttl }}</h2></header><section class=\"prod-details\"><figure class=\"prod-images images\"><img class=\"prod-photo photo\" ng-src=\"{{ d.img }}\" alt=\"{{ d.ttl }}\"></figure></section></article>"
  );


  $templateCache.put('app/partials/itm-walls.html',
    "<article role=\"article\" itemscope ng-repeat=\"d in data.walls\" class=\"hproduct prod wall-grid\" id=\"wall-{{ d.id }}\" data-ng-cloak data-prodid=\"wall-{{ d.id }}\" data-date=\"{{ d.date }}\"><a href=\"files/{{ d.ttl }}\" class=\"lnk wall-lnk\" target=\"_blank\"><figure class=\"prod-images wall-images images\"><img class=\"prod-photo wall-photo photo\" data-ng-cloak ng-src=\"images/{{ d.img }}.png\" src=\"images/{{ d.img }}.png\"></figure><div class=\"prod-nfo wall-nfo nfo\"><h2 ng-bind-html-unsafe=\"d.ttl\" class=\"ttl wall-ttl prod-ttl fn\" itemprop=\"name\">{{ d.ttl }}</h2><h3 ng-bind-html-unsafe=\"d.filename\" class=\"ttl wall-ttl prod-ttl fn\" itemprop=\"name\">{{ d.filename }}</h3><dl class=\"lst prod-nfo-lst wall-nfo-lst\"><dt class=\"type prod-nfo-typ wall-nfo-typ\">Size</dt><dd class=\"val prod-nfo-val wall-nfo-val\">{{ d.size }}</dd><dt class=\"type prod-nfo-typ wall-nfo-typ\">DL</dt><dd class=\"val prod-nfo-val wall-nfo-val\">{{ d.dl }} times</dd></dl></div></a></article>"
  );


  $templateCache.put('app/partials/lastfm-shout.html',
    "<ul class=\"lastfm-lst lst\"><li class=\"lastfm-itm shout-itm\" ng-repeat=\"d in data.shout\"><p>{{sh.date}} - {{ sh.author }}</p><p>{{ sh.body }}</p></li></ul>"
  );

}]);
