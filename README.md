## TinySaves

TinySaves is a savings goal application designed for users who are new to saving, encouraging small, regular contributions. Users can set personalized savings goals with amounts and optional deadlines, track their progress through a visual progress bar, and update their savings. The app features milestones that can be earned, and statistics that show users progress over time. Users can also manage their profiles by changing their display name or avatar.

## Images

![TinySaves Login page](/loginPage.png)

## Check out TinySaves

[visit TinySaves](https://tinysaves.vercel.app/)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

To clone the project on your machine:

```bash
git clone https://github.com/Niccar95/tinysaves.git

cd tinysaves

npm install
```

Then, run the development server:

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

Run the following command to install Jest and the necessary libraries for testing:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom ts-jest
```

If you are using Typescript, you will also need to install the following types:

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
