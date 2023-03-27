#include <openssl/sha.h>
#include <sys/random.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

unsigned char getHexVal(unsigned char x) {
  if (x < 10) return x + '0';
  return x - 10 + 'a';
}

void toHex(unsigned char * src, unsigned char * hex) {
  for (int i = 0; i < 16; ++i) {
    unsigned char c = src[i];
    hex[i*2] = getHexVal(c >> 4);
    hex[i*2 + 1] = getHexVal(c & 0x0F);
  }
}

int main() {
  while (1) {
    unsigned char * buf = (unsigned char *)malloc(16);
    unsigned char * hexbuf = (unsigned char *)malloc(32);

    getrandom(buf, 16, GRND_NONBLOCK);
    toHex(buf, hexbuf);

    unsigned char * data = (unsigned char *)malloc(80);
    memcpy(data, "b0a299de79f71d4cebb5a13effc50044_HCMUS_CTF_2022_", 48);
    memcpy(data+48, hexbuf, 32);

    char hash[SHA512_DIGEST_LENGTH];
    SHA512(data, strlen(data), hash);

    if (hash[0] == 0 && hash[1] == 0 && hash[2] == 0) {
      printf("%s\n", data);
      return 0;
    }

    free(data);
    free(buf);
    free(hexbuf);
  }

  return 0;
}
