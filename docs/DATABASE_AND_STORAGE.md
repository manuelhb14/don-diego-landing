# Database (D1) and Image Storage (R2)

The project uses **Cloudflare D1** (SQLite) for the database and **Cloudflare R2** for image storage. Both work in **local** (emulated) and **production**.

## One-time setup

### 1. Create the D1 database (production)

```bash
pnpm run db:create
```

This creates the database and prints a `database_id`. Copy that UUID into `wrangler.jsonc` → `d1_databases` → `database_id` (replace `REPLACE_AFTER_D1_CREATE`).

### 2. Create the R2 bucket (production)

```bash
pnpm run r2:create
```

The bucket name `don-diego-images` is already in `wrangler.jsonc`. No config change needed.

### 3. Apply migrations

- **Local** (emulated D1, used by `next dev` / `pnpm run preview`):

  ```bash
  pnpm run db:migrate:local
  ```

- **Production** (real D1):

  ```bash
  pnpm run db:migrate:remote
  ```

Run migrations after creating the DB and whenever you add new migration files.

## Local vs production

| Environment | Database | Image storage |
|-------------|----------|----------------|
| **Local** (`next dev` or `pnpm run preview`) | D1 emulated by Miniflare (SQLite file) | R2 emulated (local) |
| **Production** (deployed Worker) | D1 (Cloudflare) | R2 (Cloudflare) |

Bindings are the same in code; only the backing resource changes. No env vars needed for DB or R2.

## Usage in code

### Database (D1)

```ts
import { getDb, execSql } from "@/lib/db";

// In a Server Component or Route Handler
const db = getDb();
const row = await db.prepare("SELECT * FROM users WHERE id = ?").bind(id).first();
const { results } = await db.prepare("SELECT * FROM posts").all();
```

### Image storage (R2)

```ts
import { putImage, getImage, listImages, deleteImage } from "@/lib/storage";

// Upload (e.g. in a Route Handler)
await putImage("uploads/photo.jpg", body, { contentType: "image/jpeg" });

// Get
const obj = await getImage("uploads/photo.jpg");

// List
const { objects } = await listImages({ prefix: "uploads/", limit: 100 });

// Delete
await deleteImage("uploads/photo.jpg");
```

## Adding migrations

1. Create a new migration file:

   ```bash
   pnpm run db:migration:new
   ```

2. Edit the new `.sql` file in `migrations/`.

3. Apply locally and/or remotely:

   ```bash
   pnpm run db:migrate:local
   pnpm run db:migrate:remote
   ```

## Telegram alerts (contact form)

To receive Telegram notifications when someone submits the contact form:

1. Create a bot with [@BotFather](https://t.me/BotFather) and get the token.
2. Get your chat ID (e.g. message [@userinfobot](https://t.me/userinfobot) or use a group ID).
3. **Local dev** (`pnpm run dev` / `next dev`): Add to `.env.local`:
   ```
   TELEGRAM_BOT_TOKEN=your_token
   TELEGRAM_CHAT_ID=your_chat_id
   ```
   (`.dev.vars` is only loaded by Wrangler; `next dev` uses `.env.local`.)
4. **Local preview** (`pnpm run preview`): Add to `.dev.vars`.
5. **Production:** Set as Wrangler secrets:
   ```bash
   wrangler secret put TELEGRAM_BOT_TOKEN
   wrangler secret put TELEGRAM_CHAT_ID
   ```

If these are not set, submissions are still saved to D1 but no Telegram alert is sent.

## Regenerating Cloudflare env types

After changing bindings in `wrangler.jsonc`:

```bash
pnpm run cf-typegen
```

This updates `cloudflare-env.d.ts` so TypeScript knows about `env.DB` and `env.IMAGES`.
