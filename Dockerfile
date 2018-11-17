FROM anapsix/alpine-java:8_jdk

ARG mysqlhost=localhost:3306
ARG arihost=localhost:8088
ARG ariproxyhost=localhost:8088
ARG jdbcuser=root
ARG jdbcpasswd=freaks03
ARG mysqlschema=ariproxy
ARG ariusername=asterisk
ARG aripassword=asterisk


RUN apk add --update nodejs nodejs-npm

RUN npm install -g @angular/cli

ENV MAVEN_VERSION 3.5.4
ENV MAVEN_HOME /usr/lib/mvn
ENV PATH $MAVEN_HOME/bin:$PATH

# install git
RUN apk --update add git openssh && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*

# install maven
RUN wget http://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz && \
  tar -zxvf apache-maven-$MAVEN_VERSION-bin.tar.gz && \
  rm apache-maven-$MAVEN_VERSION-bin.tar.gz && \
  mv apache-maven-$MAVEN_VERSION /usr/lib/mvn

# create application properties file in /usr/ariproxy dir
RUN mkdir -p /usr/ariproxy
WORKDIR /usr/ariproxy
RUN touch application.properties

# write to application properties
RUN echo "ari.host=http://"$arihost"/" >> application.properties && \
echo "ari.username=asterisk" >> application.properties && \
echo "ari.password=asterisk" >> application.properties && \
echo "base.url=http://"$ariproxyhost"/ari" >> application.properties && \
echo "spring.datasource.url=jdbc:mysql://"$mysqlhost"/"$mysqlschema"?autoReconnect=true&useSSL=false" >> application.properties && \
echo "spring.datasource.username="$jdbcuser >> application.properties && \
echo "spring.datasource.password="$jdbcpasswd >> application.properties && \
echo "spring.datasource.driver-class=com.mysql.jdbc.Driver" >> application.properties && \
echo "spring.datasource.hikari.connection-timeout=60000" >> application.properties && \
echo "spring.datasource.hikari.maximum-pool-size=5" >> application.properties && \
echo "media.stream.synthesize=https://texttospeech.googleapis.com/v1beta1/text:synthesize" >> application.properties && \
echo "media.stream.synthesize.stream=sound:http://localhost:8080/google-tts/stream?text=" >> application.properties && \
echo "sound.output.dir=/home/johnson3yo/sound" >> application.properties 

# clone master project
RUN git clone https://github.com/johnsoneyo/jcally-packaging.git

WORKDIR jcally-packaging
RUN sed -i 's/localhost/$ariproxyhost/g' jcally-ui/src/environments/*.ts
RUN sed -i 's/ username : 'asterisk'/ username : '$ariusername'/g' jcally-ui/src/environments/*.ts
RUN sed -i 's/ password : 'asterisk'/ password : '$aripassword'/g' jcally-ui/src/environments/*.ts
RUN mvn clean package -DskipTests=true
WORKDIR jcally-backend/target
EXPOSE 8080
#ENTRYPOINT ["java","-jar","jcally-backend.jar"]
