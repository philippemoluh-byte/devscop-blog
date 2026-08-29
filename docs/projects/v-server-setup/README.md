# V-server-setup

This guide describes how to set up a Linux-based virtual server for secure access and basic web hosting. It covers SSH key-based authentication, disabling password authentication, installing and configuring the NGINX web server for static HTML hosting, and cloning and configuring a Git repository directly on the server.

## Table of contents

- [Key features](#key-features)
- [Prerequisites](#prerequisites)
- [Set up access to the server using an SSH key](#set-up-access-to-the-server-using-an-ssh-key)
- [Disable password login](#disable-password-login)
- [Install NGINX web server](#install-nginx-web-server)
- [Configure the NGINX web server](#configure-the-nginx-web-server)
- [Configure and clone the Git repository](#configure-and-clone-the-git-repository)

## Key features

- Log in to the v-server using an SSH key
- Host an HTML page on the server
- Clone and configure a Git repository on the server

## Prerequisites

- Virtual machine
- Git (knowledge of Git operations)
- An editor such as vim or nano
- Linux (Basic knowledge)

## Set up access to the server using an SSH key

To start configuring the web server, perform the following steps:

### Generate an SSH key pair on the local machine

```bash
ssh-keygen -t ed25519 -C <your_email_adress>
```

### Connect to the server

```bash
ssh <your_root_name>@<your_ip>
```

### Copy the ssh public key to the server

```bash
ssh-copy-id -i ~/.ssh/your_key.pub user@host
```

:::warning

Ensure the SSH key-based connection is successful before disabling password.

:::

### Connect to the v-server using the SSH key

```bash
ssh -i ~/.ssh/your_key <your_root_name>@<your_ip>
```

## Disable password login

### Update the SSH configuration file

```bash
    sudo nano /etc/ssh/sshd_config
    #set:
    PasswordAuthentication no
```

### Save and close the SSH configuration file

### Restart the SSH service to apply the change

```bash
sudo systemctl restart sshd
```

### Verify that password authentication has been disabled successfully

```bash
ssh -i <path/to/ssh-key> -o PubkeyAuthentication=no <your_root_name>@<your_ip>

```

## Install NGINX web server

### Update package lists

``` bash
sudo apt update
```

### Install the NGINX package

```bash
sudo apt install nginx -y

```

### Test the NGINX configuration

```bash
sudo nginx -t
```

1. Open the server address in a web browser.
2. Confirm the NGINX default welcome page is displayed.

## Configure the NGINX web server

### Ensure that the directory exists

```bash
ls /var/www
```

### Create the directory "mywebsite"

```bash
sudo mkdir -p /var/www/mywebsite
```

### Create an HTML file in the "mywebsite" directory by running

```bash
sudo touch /var/www/mywebsite/page-index.html
```

### Edit the HTML file and add simple HTML content

```html
<!DOCTYPE html>
<html>
    <body>

        <h1>My First Heading</h1>
        <p>My first paragraph.</p>

    </body>
</html>
```

1. Save and close the file.

### Add a site configuration to serve the HTML page

```bash
sudo nano /etc/nginx/sites-enabled/mywebsite
```

Example site block(use a server block):

```nginx
{
    listen <your_nginx_port>; # Example 8070
    listen [::]:<your_nginx_port>;

    root /var/www/mywebsite;
    index page-index.html;

    location / {
        try_files $uri $uri/ =404;
        }
}
```

1. Save and close the file

### Enable the site and restart NGINX

```bash
sudo service nginx restart
```

### Open the following address in your browser to see the new page

```text
http://<your_ip>:<your_nginx_port>
```

## Configure and clone the Git repository

::: tip

Ensure that you are connected to the server.

:::

### Generate an SSH key on the server

```bash
ssh-keygen -t ed25519 -C <your_email_adress>
```

### Add the key to GitHub

1. Open: https://github.com/settings/keys
2. Click **New SSH key** (or **Add SSH key**)  
3. Give it a descriptive **Title** (e.g., "Virtual Server")  
4. Paste the public key into the **Key** field and click **Add SSH key**

### Configure Git on the server

:::tip

Give the same username and email as your GitHub account

:::

```bash
#set username
git config --global user.name <your_github_account_username>
#set email
git config --global user.email <your_github_account_email>
```

### Clone the git repository

```bash
git clone https://github.com/<your_github_account_name>/<your_github_repository_name>.
```

### Ensure your SSH connection to GitHub works

1. Run the following command on your server.

```bash
git -T git@github.com
```

:::tip

You should see a message asking to verify the host fingerprint.
Verify if the fingerprint matches GitHub's public key and type yes to continue.

:::

1. Ensure that you see a similar message on successful authentication:

:::info

Hi USERNAME! You've successfully authenticated, but GitHub does not provide shell access.

:::
