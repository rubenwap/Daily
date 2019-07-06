FROM postgres:9.4
RUN sed -e "s/[#]\?listen_addresses = .*/listen_addresses = '*'/g" -i '/etc/postgresql/9.4/main/postgresql.conf'
EXPOSE 5432
