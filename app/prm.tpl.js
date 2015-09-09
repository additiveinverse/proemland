angular.module('appProem').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/partials/itm-prdgrid.html',
    "<article role=\"article\" itemscope ng-repeat=\"d in data.rekkids | filter:query \" class=\"hproduct prod music-grid\" id=\"music-{{ d.id }}\" toggler ng-animate=\"'show'\" data-ng-cloak data-elem=\"self\" data-category=\"{{ d.prod_type }}\" data-prodid=\"{{ d.prod_id }}\" data-date=\"{{ d.date }}\" data-format=\"{{ d.prod_frmt }}\" data-label=\"{{ d.cat_lbl }}\"><span role=\"button\" class=\"btn expand-btn\">expand</span><header class=\"hdr prod-hdr music-hdr\"><h2 ng-bind-html-unsafe=\"d.ttl\" class=\"ttl prod-ttl music-ttl fn\" itemprop=\"name\">{{ d.ttl }}</h2></header><section class=\"prod-details music-details\"><figure class=\"prod-images music-images images\"><img class=\"prod-photo music-photo photo\" data-ng-cloak ng-src=\"{{ d.img }}\" alt=\"{{ d.ttl }}\"></figure><div class=\"prod-nfo music-nfo nfo\"><img class=\"prod-thumb music-thumb photo\" ng-src=\"{{ d.thumbimg }}\" alt=\"{{ d.ttl }}\"><dl class=\"lst prod-nfo-lst music-nfo-lst\"><dt class=\"type prod-nfo-typ music-nfo-typ\">released</dt><dd class=\"val prod-nfo-val music-nfo-val\">{{ d.date | date:yyyy }}</dd><dt class=\"type prod-nfo-typ music-nfo-typ\">label</dt><dd class=\"val prod-nfo-val music-nfo-val\"><a class=\"prod-nfo-lnk\" href=\"{{ d.cat_lnk }}\" target=\"_blank\">{{ d.cat_lbl }}</a></dd><dt class=\"type prod-nfo-typ music-nfo-typ\">catalog ID</dt><dd class=\"val prod-nfo-val music-nfo-val\">{{ d.cat_num }}</dd></dl><ol class=\"lst music-track-lst\"><li ng-repeat=\"tl in d.Body track by $index\">{{ tl }}</li></ol></div></section></article>"
  );


  $templateCache.put('app/partials/itm-single.html',
    "<article role=\"article\" itemscope ng-repeat=\"d in data.articles\" class=\"hproduct prod post\" id=\"post-{{ d.id }}\" data-ng-cloak data-category=\"{{ d.prod_type }}\" data-prodid=\"{{ d.prod_id }}\" data-date=\"{{ d.date }}\"><h1 class=\"ttl post-ttl\">{{ d.title }}</h1><section class=\"post-content\">{{ d.body }}</section><aside class=\"post-aside\">{{ d.exerpt }}</aside></article>"
  );


  $templateCache.put('app/partials/itm-walls.html',
    "<article role=\"article\" itemscope ng-repeat=\"d in data.walls\" class=\"hproduct prod wall-grid\" id=\"wall-{{ d.id }}\" data-ng-cloak data-prodid=\"wall-{{ d.id }}\" data-date=\"{{ d.date }}\"><a href=\"files/{{ d.ttl }}\" class=\"lnk wall-lnk\" target=\"_blank\"><figure class=\"prod-images wall-images images\"><img class=\"prod-photo wall-photo photo\" data-ng-cloak ng-src=\"images/{{ d.img }}.png\" src=\"images/{{ d.img }}.png\"></figure><div class=\"prod-nfo wall-nfo nfo\"><h2 ng-bind-html-unsafe=\"d.ttl\" class=\"ttl wall-ttl prod-ttl fn\" itemprop=\"name\">{{ d.ttl }}</h2><h3 ng-bind-html-unsafe=\"d.filename\" class=\"ttl wall-ttl prod-ttl fn\" itemprop=\"name\">{{ d.filename }}</h3><dl class=\"lst prod-nfo-lst wall-nfo-lst\"><dt class=\"type prod-nfo-typ wall-nfo-typ\">Size</dt><dd class=\"val prod-nfo-val wall-nfo-val\">{{ d.size }}</dd><dt class=\"type prod-nfo-typ wall-nfo-typ\">DL</dt><dd class=\"val prod-nfo-val wall-nfo-val\">{{ d.dl }} times</dd></dl></div></a></article>"
  );


  $templateCache.put('app/partials/lastfm-shout.html',
    "<ul class=\"lastfm-lst lst\"><li class=\"lastfm-itm shout-itm\" ng-repeat=\"d in data.shout\"><p>{{sh.date}} - {{ sh.author }}</p><p>{{ sh.body }}</p></li></ul>"
  );

}]);
