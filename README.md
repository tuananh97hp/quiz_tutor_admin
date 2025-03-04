## Project Structure

```
├── node_modules                        // a directory containing the modules your project uses
├── .gitignore
├── tsconfig.json                       // config file for Typescript (định nghĩa rõ các cài đặt và tùy chọn cho quá trình biên dịch mã nguồn TypeScript sang JavaScript)
├── .eslintrc.json                      // define code style for project
├── .prettierrc.json
├── postcss.config.js
├── tailwind.config.js
├── next.config.js                      // configuration file for Next.js
├── package.json                        // project config file (name, desc, scripts, dependencies, ..)
├── README.md
├── Dockerfile
├── docker-compose.yml
├── .env                                // define enviroment available
├── public
└── src
    ├── middleware.ts
    ├── app                             // app router
    |   ├── api
    |   |   ├── auth
    |   |   |   └── [...nextauth].ts    // NextAuth config
    |   ├── auth
    |   |   └── login
    |   ├── layout.tsx
    |   ├── loading.tsx
    |   ├── not-found.tsx
    ├── assets
    |   ├── index.ts
    |   ├── images
    |   ├── icons
    |   └── css
    |       └── global.css              // global style file
    ├── components
    |   ├── LoginPage
    |   |   ├── LoginForm.tsx
    |   ├── shared
    |   |   ├── Meta
    |   |   └── Button
    |   ├── Layout.tsx
    |   ├── ....
    ├── configs
    |   ├── axios.config.ts             // axios config
    |   ├── http.config.ts              // http config
    |   └── i18n.config.ts              // i18n config
    ├── hooks                           // write custom hooks
    |   └── useSessionStorage.ts
    ├── types                          // define type request, response
    |   └── AuthType.ts
    |   └── CookieType.ts
    ├── langs                           // declaration multi language
    |   ├── locales
    |   |   ├── en.ts
    |   |   ├── ja.ts
    |   |   ├── ...
    |   └── index.ts
    ├── router                          // manage router
    |   └── routes.ts
    ├── stores                          // manage global state
    |   └── sample.ts
    ├── utils                           // define func common
    |   ├── constants                   // define func common
    |   └── cookies.ts
    └── services                        // define service
        └── AuthService.ts

```

## Getting Started

### Prerequisites

```
NodeJs version: >= v18
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
