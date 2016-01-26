angular.module('appProem').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/partials/disc-detail.html',
    "<article role=\"article\" itemscope ng-repeat=\"d in data.rekkids\" class=\"hproduct prod\" id=\"release-{{ d.prod_id }}\" data-elem=\"self\" data-category=\"{{ d.prod_type }}\" data-prodid=\"{{ d.prod_id }}\" data-date=\"{{ d.date }}\" data-label=\"{{ d.cat_lbl }}\"><span role=\"button\" class=\"btn btn-expand btn-expand-on\">expand</span><header class=\"hdr prod-hdr\"><h2 ng-bind-html-unsafe=\"d.ttl\" class=\"ttl prod-hdr-ttl fn\" itemprop=\"name\">{{ d.ttl }}</h2></header><section class=\"prod-details\"><figure class=\"prod-images images\"><img class=\"prod-photo photo\" ng-src=\"{{ d.img }}\" alt=\"{{ d.ttl }}\"></figure><div class=\"prod-nfo nfo\"><img class=\"prod-thumb thumb photo\" ng-src=\"{{ d.img }}\" alt=\"{{ d.ttl }}\"><dl class=\"lst prod-nfo-lst nfo-lst\"><dt class=\"type prod-nfo-typ nfo-typ\">released</dt><dd class=\"val prod-nfo-val nfo-val\">{{ d.date | date:yyyy }}</dd><dt class=\"type prod-nfo-typ nfo-typ\">label</dt><dd class=\"val prod-nfo-val nfo-val\"><a class=\"prod-nfo-lnk\" href=\"{{ d.cat_lnk }}\" target=\"_blank\">{{ d.cat_lbl }}</a></dd><dt class=\"type prod-nfo-typ nfo-typ\">catalog ID</dt><dd class=\"val prod-nfo-val nfo-val\">{{ d.cat_num }}</dd></dl><ol class=\"lst track-lst\"><li ng-repeat=\"tl in d.Body track by $index\">{{ tl }}</li></ol></div></section></article>"
  );


  $templateCache.put('app/partials/disc-list.html',
    "<article role=\"article\" itemscope ng-repeat=\"d in data.rekkids | filter:query \" class=\"hproduct prod\" id=\"release-{{ d.prod_id }}\" data-category=\"{{ d.prod_type }}\" data-prodid=\"{{ d.prod_id }}\" data-date=\"{{ d.date }}\" data-label=\"{{ d.cat_lbl }}\" data-ng-cloak><a ui-sref=\"discog.detail({ discID: {{ $index }} })\"><span role=\"button\" class=\"btn btn-expand btn-expand-off\">expand</span><header class=\"hdr prod-hdr\"><h2 ng-bind-html-unsafe=\"d.ttl\" class=\"ttl prod-hdr-ttl fn\" itemprop=\"name\">{{ d.ttl }}</h2></header><section class=\"prod-details\"><figure class=\"prod-images images\"><img class=\"prod-photo photo\" ng-src=\"{{ d.img }}\" alt=\"{{ d.ttl }}\"></figure></section></a></article>"
  );


  $templateCache.put('app/partials/itm-walls.html',
    "<article role=\"article\" itemscope ng-repeat=\"d in data.walls\" class=\"hproduct prod wall-grid\" id=\"wall-{{ d.id }}\" data-ng-cloak data-prodid=\"wall-{{ d.id }}\" data-date=\"{{ d.date }}\"><a href=\"files/{{ d.ttl }}\" class=\"lnk wall-lnk\" target=\"_blank\"><figure class=\"prod-images wall-images images\"><img class=\"prod-photo wall-photo photo\" data-ng-cloak ng-src=\"images/{{ d.img }}.png\" src=\"images/{{ d.img }}.png\"></figure><div class=\"prod-nfo wall-nfo nfo\"><h2 ng-bind-html-unsafe=\"d.ttl\" class=\"ttl wall-ttl prod-ttl fn\" itemprop=\"name\">{{ d.ttl }}</h2><h3 ng-bind-html-unsafe=\"d.filename\" class=\"ttl wall-ttl prod-ttl fn\" itemprop=\"name\">{{ d.filename }}</h3><dl class=\"lst prod-nfo-lst wall-nfo-lst\"><dt class=\"type prod-nfo-typ wall-nfo-typ\">Size</dt><dd class=\"val prod-nfo-val wall-nfo-val\">{{ d.size }}</dd><dt class=\"type prod-nfo-typ wall-nfo-typ\">DL</dt><dd class=\"val prod-nfo-val wall-nfo-val\">{{ d.dl }} times</dd></dl></div></a></article>"
  );


  $templateCache.put('app/partials/lastfm-shout.html',
    "<ul class=\"lastfm-lst lst\"><li class=\"lastfm-itm shout-itm\" ng-repeat=\"d in data.shout\"><p>{{sh.date}} - {{ sh.author }}</p><p>{{ sh.body }}</p></li></ul>"
  );

}]);
