FROM nginx:latest

MAINTAINER Norbert Annus

ENV DIST_DIR dist/
ENV NGINX_WEB_ROOT_DIR /usr/share/nginx/html/

COPY $DIST_DIR $NGINX_WEB_ROOT_DIR

EXPOSE 80 443

CMD [ "nginx", "-g", "daemon off;" ]