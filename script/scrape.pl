use strict;
use 5.10.0;
use Web::Scraper;
use URI;
use Data::Dumper;
use Encode;

my $uri = URI->new("http://d.hatena.ne.jp/perlcodesample/20100808/1278596435");
#my $file = \do { my $file = "1278596435"; open my $fh, $file or die "$file: $!"; join '', <$fh> };
my $scraper = scraper {
  process '//div[@class="section"]/ul/li', 'entries[]' => scraper {
    process '//*[following-sibling::node()', 'lists[]' => scraper {
      process '//a', 'link' => '@href';
    };
    process '//*', 'title' => 'TEXT';
  };
};
my $result = $scraper->scrape($uri);
#print Dumper($result);

for my $entry (@{$result->{entries}}) {
    Encode::from_to($entry->{title}, "euc-jp", "utf8" );
    my @links = map { $_->{link} } @{$entry->{lists}};

    # リンクが１つしか無いときには位置がずれているので
    # [0] に空白を挿入し、[1]を英語リンクにする
    unshift @links, "" unless $links[1];

    say "{title:'$entry->{title}', url_ja:'$links[0]', url_en:'$links[1]'},",

    #say "title:" . $entry->{title};
    #say "link_ja:" . $links[0];
    #say "link_en:" . $links[1];
}


