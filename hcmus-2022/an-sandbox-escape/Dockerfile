FROM node:16

RUN apt update -y && apt install -y xinetd

RUN useradd -d /home/tqs/ -m -p tqs -s /bin/bash tqs
RUN echo "tqs:4145575aa32fef2d744a064910f5628e" | chpasswd

WORKDIR /home/tqs

COPY setup.sh index.js ./
COPY private/flag-840e0002c2d25ceaf47907988e.txt ./

RUN chown -R root:root /home/tqs && \
  chown root:tqs /home/tqs/index.js && \
  chmod 550 /home/tqs/index.js && \
  chmod 444 /home/tqs/flag-840e0002c2d25ceaf47907988e.txt && \
  chmod +x setup.sh

CMD ["/home/tqs/setup.sh"]
