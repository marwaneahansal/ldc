FROM eclipse-temurin:21

WORKDIR /app

COPY ./.mvn .mvn
COPY ./mvnw ./pom.xml ./
RUN chmod +x ./mvnw
RUN ./mvnw dependency:go-offline

COPY ./src ./src

RUN chmod +x ./mvnw

# CMD [ "sleep", "infinity" ]

CMD [ "./mvnw", "spring-boot:run" ]