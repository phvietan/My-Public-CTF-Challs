#!/usr/local/bin/perl

# DEVLOG 1: https://perlhacks.com/articles/cgi-programming/cgi-programming-part-1/
# DEVLOG 2: https://askubuntu.com/questions/140420/unable-to-find-cgi-bin-directory

require "./helper.pl";

use CGI;
$cgi = CGI->new;

print $cgi->header('text/html','200 OK');
print read_file("./content/index.html");
