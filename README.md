## TinySaves

TinySaves is a savings goal application designed for users who are new to saving, encouraging small, regular contributions. Users can set personalized savings goals with amounts and optional deadlines, track their progress through a visual progress bar, and update their savings. The app features milestones that can be earned, and statistics that show users progress over time. Users can also manage their profiles by changing their display name or avatar.

## Images

<img width="1385" alt="Skärmavbild 2025-01-01 kl  18 06 56" src="https://github.com/user-attachments/assets/12661fb0-9438-42ed-8186-5e550076f9a3" />

<img width="611" alt="Skärmavbild 2025-01-01 kl  18 17 37" src="https://github.com/user-attachments/assets/599e8abe-bddc-4c6e-b9ee-8587728f191c" />

<img width="895" alt="Skärmavbild 2025-01-01 kl  18 18 08" src="https://github.com/user-attachments/assets/b3bbed48-8449-4945-933a-abc0ea98b7d6" />

<img width="1194" alt="Skärmavbild 2025-01-01 kl  18 17 54" src="https://github.com/user-attachments/assets/8115d2e1-8c50-4e7b-af81-045715063ce3" />

## Live Project

[Visit TinySaves](https://tinysaves.vercel.app/)

## Getting Started

- To clone the project on your machine:

```bash
git clone https://github.com/Niccar95/tinysaves.git

cd tinysaves

npm install
```

## Environment Setup

- Create a .env file in the project root directory
- Add the following environment variables:

NextAuth Configuration:

NEXTAUTH_SECRET=your_generated_secret_key

To generate a secure random string for NEXTAUTH_SECRET, run this commads:

```bash
openssl rand -base64 32
```

Add URL for client and backend:

NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_NEXTAUTH_URL=http://localhost:3000

Add Database URL:

DATABASE_URL=your_mongodb_connection_string (You will get the full string when you setup your database on MongoDB so leave the value empty at first)

## MongoDB Setup

- Create a MongoDB Atlas account
- Create a new cluster
- In the MongoDB Atlas dashboard:

- Click "Connect"
- Choose "Connect your application"
- Copy the connection string
- Replace <password> with your database user password
- Add this connection string to your .env file as DATABASE_URL

## Prisma Setup

- Generate the Prisma client:

```bash
npx prisma generate
```

- Push the database schema to your MongoDB cluster:

```bash
npx prisma db push
```

## Run the Project

- run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Setting Up Prisma Database

Before you start:

- Ensure you have Node.js installed on your machine.
- Have npm or yarn for package management.
- Set up a database (PostgreSQL, MySQL, SQLite, MongoDB, etc.).
- Prisma CLI will be installed as part of the setup process.

## Setting up Jest with Next.js

To set up Jest for testing in your Next.js project, follow these steps to install the necessary dependencies.

### 1. Install Jest and Testing Libraries

- Run the following command to install Jest and the necessary libraries for testing:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom ts-jest
```

- If you are using Typescript, you will also need to install the following types:

```bash
npm install --save-dev @types/jest @types/react @types/react-dom
```

### 2. Add a jest.config file

You can either create a jest.config.ts|js file manually in the root of your project.

Or you can run the following command to generate the file:

```bash
npm init jest@latest
```

Check the official Next.js docs for more detailed steps on how to setup Jest: [text](https://nextjs.org/docs/app/building-your-application/testing/jest#quickstart)

### 3. Create a test folder

- In your root, you can create a folder named "**tests**" and inside place your test files.
- Name your files example.test.ts|js

### 4. Run a test

```bash
npm run test
```
