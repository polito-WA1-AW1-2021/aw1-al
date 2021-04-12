
# Use in case of errors after:   npm start

# Show current limit
sysctl -a | grep -i notify

# Permanently modify the limit. The limit remains also after reboot since it is written in a system config file
echo fs.inotify.max_user_watches=100000 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
