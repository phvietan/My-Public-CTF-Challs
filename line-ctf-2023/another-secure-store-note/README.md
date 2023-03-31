# Another secure store note

## Description

Just a simple app to store notes.
Currently hosted at: https://aasn.anctf.tk

## How to run

```sh
cd deploy
bash start_service.sh
```

Note:
- Please host this challenge in seperate domain. Because if there's a XSS in cross-site, this challenge is destroyed and have unintend solution.
- If this chall is hosted on `https://some-domain.com` then please change the `pupeteer.js` and `getSettings.js` file.
  + In `pupeteer.js` change from `https://assn.anctf.tk` to `https://some-domain.com`
  + In `getSettings.js` change from `assn.anctf.tk` to `some-domain.com` (only the domain part)
- Please also update in `docker-compose.yml` file

## To check solver

Go to `solver`, run express server