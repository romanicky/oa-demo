This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

## LINE Official Account (OA) Integration

This project includes a webhook handler for LINE Official Account at `app/api/line/webhook/route.ts`.

Required environment variables (set these in your deployment or local `.env.local`):

```
LINE_CHANNEL_SECRET=your_channel_secret_here
LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token_here
```

Local testing with `ngrok`:

1. Run your dev server:

```bash
npm run dev
```

2. Start ngrok to forward to port 3000 (or whichever port you're using):

```bash
ngrok http 3000
```

3. In the LINE Developers Console, set your webhook URL to:

```
https://{your-ngrok-host}/api/line/webhook
```

4. Enable the webhook and send a test message from LINE — the webhook will echo received text messages.

Deployment notes:

- Ensure both `LINE_CHANNEL_SECRET` and `LINE_CHANNEL_ACCESS_TOKEN` are configured in your hosting provider (Vercel/Netlify/etc.).
- This webhook route runs on the Edge runtime; Vercel supports Edge Functions out of the box.
