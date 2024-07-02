# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Steps to be Followed

# Step -1 
 *Environment Variable must be in the Root directory.And it should start with (.) Eg:- .env

 Env file load only once usally ,so whenver you have update in env file you have close the project once then reopen the project.

 To prevent accidentally leaking env variables to the client, only variables prefixed with 'VITE_' are exposed to your Vite-processed code. e.g. for the following env variables:

 VITE_SOME_KEY=123
DB_PASSWORD=foobar

ACCESS:
Only VITE_SOME_KEY will be exposed as 'import.meta.env.VITE_SOME_KEY' to your client source code, but DB_PASSWORD will not.

console.log(import.meta.env.VITE_SOME_KEY) // "123"
console.log(import.meta.env.DB_PASSWORD) // undefined

# STEP 2
TAKE all the environment variables from the Backend as a service(here AppWrite)

create a seperate folder as config and store all the env variable in an object by stringfying them...it is good practise

