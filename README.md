<h1 align="center">Calendar-View</h1>
<p align="center">
A simple backend api to view upcoming calendar events and send calendar invites. <br><a href="https://www.codacy.com/manual/bhumijgupta/calendar-view?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bhumijgupta/calendar-view&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/8ddc224fc1254038a6fe862506a3cdd7"/></a> <a href="https://lgtm.com/projects/g/bhumijgupta/calendar-view/alerts/"><img alt="Total alerts" src="https://img.shields.io/lgtm/alerts/g/bhumijgupta/calendar-view.svg?logo=lgtm&logoWidth=18"/></a> <a href="https://lgtm.com/projects/g/bhumijgupta/calendar-view/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/bhumijgupta/calendar-view.svg?logo=lgtm&logoWidth=18"/></a> <a href="https://bhumijgupta.github.io/calendar-view/docs"><img src="https://img.shields.io/badge/docs-deployed-brightgreen" alt="docs-shield"></a>
</p>

## Documentation

The api docs are generated using [apidocs](https://www.apidocs.js). The full documentation is hosted [here](https://bhumijgupta.github.io/calendar-view/docs)

### Generate docs

To generate docs manually, run

```javascript
sudo npm i -g apidocs
apidocs -i routes -o docs
```

## Try Online

The frontend is deployed on [gh-pages](https://bhumijgupta.github.io/calendar-view/). Have fun :sunglasses:

## Run Locally

### Running backend

#### 1. Setup Google apis

Setup Google project, and create a consent screen with callback to `https://<server-origin>/auth/callback`. Setup credentials and enable Google Calendar API

#### 2. Setup `.env` file

Rename `.env.example` to `.env` and populate values from previous step

#### 3. Setup RSA keys

These keys will be used for assymmetric signing of JWT. First create directory.

```bash
mkdir auth-keys && touch private-key.pem && touch public-key.pem
```

Generate RSA keys (preferable 512 bits). You can use [this site](https://travistidwell.com/jsencrypt/demo/).  
Paste the content to the respected key files.

#### 4. Running server

Finally, the awaited step
`npm run start`

### Running frontend

The frontend are static html files. They can be served using any web server. For convenient use, we'll use [serve](https://www.npmjs.com/package/serve).

```bash
# Install serve globally
sudo npm i -g serve
# Serve the frontend
cd frontend && serve
```

**Note**: If you use any other webserver, point `FRONTEND_URI` in `.env` file to the frontend URL.

## Linting

The project uses eslint and prettier to lint the files.The configuration files are [.eslintrc](./.eslintrc), [.eslintignore](./eslintignore) and [.prettierignore](./prettierignore).<br>
You can manually lint code using

```javascript
npm run lint
```

## Author

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

### Bhumij Gupta

![GitHub followers](https://img.shields.io/github/followers/bhumijgupta?label=Follow&style=social) [![LinkedIn](https://img.shields.io/static/v1.svg?label=connect&message=@bhumijgupta&color=success&logo=linkedin&style=flat&logoColor=white)](https://www.linkedin.com/in/bhumijgupta/) [![Twitter URL](https://img.shields.io/twitter/url?style=social&url=http%3A%2F%2Ftwitter.com%2Fbhumijgupta)](https://twitter.com/bhumijgupta)

---

```javascript
if (repo.isAwesome || repo.isHelpful) {
  StarRepo();
}
```
