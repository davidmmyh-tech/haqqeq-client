set -euo pipefail

sudo mkdir -p /var/www/haqqeq_tmp
sudo mkdir -p /var/www/haqqeq

# move uploaded tmp into a new release dir
ts=$(date +%Y%m%d%H%M%S)

sudo mkdir -p /var/www/releases/haqqeq-$ts
sudo rsync -a --delete /var/www/haqqeq_tmp/ /var/www/releases/haqqeq-$ts/
sudo rm -rf /var/www/haqqeq_tmp

# point current to the new release
sudo ln -sfn /var/www/releases/haqqeq-$ts /var/www/haqqeq

# ensure permissions (www-data or your nginx user)
sudo chown -R www-data:www-data /var/www/haqqeq /var/www/releases

# reload nginx if config present
if command -v systemctl >/dev/null 2>&1; then
    sudo systemctl reload nginx || true
fi