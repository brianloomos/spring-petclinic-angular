sudo vi /etc/nginx/sites-available/default
sudo systemctl restart nginx
sudo ng serve --disableHostCheck true
nohup ./mvnw spring-boot:run & disown
