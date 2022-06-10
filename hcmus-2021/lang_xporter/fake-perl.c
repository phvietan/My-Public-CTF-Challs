#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main( int argc, char *argv[] )  {
  if( argc < 2 ) {
    puts("no");
    return 1;
  }

  char * cmd = (char *)malloc(128 + strlen(argv[1]));
  sprintf(cmd, "/usr/bin/perl -Mre=eval %s", argv[1]);
  system(cmd);
  free(cmd);

  return 0;
}
