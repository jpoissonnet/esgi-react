# Use the official MySQL image from the Docker Hub
FROM mysql:8.0

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=lotr_jdr_db
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password

# Expose the default MySQL port
EXPOSE 3306

# Create a volume for MySQL data
VOLUME /var/lib/mysql