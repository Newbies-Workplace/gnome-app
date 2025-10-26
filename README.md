# Gnome app

## Development

Install dependencies:

```bash
  yarn install
```

### Backend service

Create a `.env` file based on `.env.example` in `apps/gnome-back` directory and fill in the necessary values.

Setup docker on your machine and run the following command to start database:

```bash
  docker-compose up -d
```

Migrate db:

```bash
  cd apps/gnome-back
  npx prisma generate
  npx prisma migrate dev
```

Run the following command to start the backend service:

```bash
  yarn dev
```

Setup Minio credentials:

- enter http://localhost:9001 using the username and password you set in `.env` file
- create a bucket named `images` at `http://localhost:9001/buckets/add-bucket`
- create Access Key and Secret Key at `http://localhost:9001/access-keys/new-account`
- - update variables `MINIO_ACCESS_KEY` and `MINIO_SECRET_KEY` in the `.env` file with the new Access Key and Secret Key

### Mobile app

Create a `.env` file based on `.env.example` in `apps/gnome-mobile` directory and fill in the necessary values.

You can start the mobile app by running the following commands:

```bash
  yarn workspace gnome-mobile prebuild
  yarn workspace gnome-mobile android
```

Or you can start the app in web mode by running the following command:

```bash
  yarn workspace gnome-mobile web
```
