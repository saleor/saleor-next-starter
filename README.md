![Next js + Saleor (1)](https://user-images.githubusercontent.com/44495184/210545042-0537d49f-6ab8-4e52-af75-225370789c2b.png)

<div align="center">
  <h1>Saleor Next Boilerplate</h1>
</div>

<div align="center">
  <p>A minimalistic boilerplate to start developing Next.js applications with <a href="https://github.com/saleor/saleor">Saleor</a>.</p>
</div>

<div align="center">
  <a href="https://saleor.io/">🏠 Website</a>
  <span> • </span>
  <a href="https://docs.saleor.io/docs/3.x/">📚 Docs</a>
  <span> • </span>
  <a href="https://saleor.io/blog/">📰 Blog</a>
  <span> • </span>
  <a href="https://twitter.com/getsaleor">🐦 Twitter</a>
</div>

<div align="center">
  <a href="https://demo.saleor.io/dashboard">▶️ Demo</a>
   <span> • </span>
  <a href="https://githubbox.com/saleor/saleor-dashboard">🔎 Explore Code</a>
</div>

## Motivation

🤏 **Bare bones**: Useful for prototyping or building your stack from scratch.

💪 **Typesafe**: Get productive with code generation and types.


## Stack:
- [pnpm](https://pnpm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/) with static data fetching
- [urql](https://formidable.com/open-source/urql/)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)

## Quickstart
1. Create a new repository from this template ("Use this template")
2. Create `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

> Note: Currently, only `.env` is supported. `.env.local` and any other variation will not work with GraphQL Code Generator.

3. Replace the `NEXT_PUBLIC_SALEOR_INSTANCE_URI` environment variable with the address of your Saleor instance.

4. Install the dependencies:
```bash
pnpm i
```

5. Generate the types based on GraphQL schema:
```bash
pnpm codegen
```

6. Start the development server:
```bash
pnpm dev
```
