#!/usr/local/bin/perl

require "./helper.pl";

use CGI;
$cgi = CGI->new;
$search = $cgi->url_param('search');
$language = $cgi->url_param('language');

print $cgi->header('text/plain','200 OK');

$content = read_file($language);
@words = split('\n', $content);
@filtered = ();
foreach ( @words ) {
  if ($_ =~ qr/$search/) {
    push(@filtered, $_);
  }
}

print join("\n", @filtered);
