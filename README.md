# Full Stack Developer Challenge

Hi, reviewers, thanks for taking time to review my work.

The original README(description of this challenge) can be found [HERE](original_README.md)

## How to run this project
- You need have Node.js installed on your machine (I recommend use [nvm](https://github.com/nvm-sh/nvm)). 
- Make sure ports `3000`, `5000` are not bound for other services.
- install [yarn](https://yarnpkg.com/en/docs/install#mac-stable)

For the Server, open your terminal:
```
$ cd server
$ yarn install
$ yarn server
```

For the Frontend, open anoter terminal tab:
```
$ cd client
$ yarn install
$ yarn start
```

Then open browser acesss http://localhost:3000 to see it.

There are some test dataset you can use directly. I'm not open signup for admin user currently.
### admin:
- email: hokage@konoha.org password: hokage

### normal user:
- email: naruto@konoha.org password: naruto
- email: sakura@konoha.org password: sakura
- email: sasuke@konoha.org password: sasuke
- email: sai@root.org password: sai
- email: shikamaru@konoha.org password: shikamaru
- email: choji@konoha.org password: choji
- email: ino@konoha.org password: ino

## Design and my choice
I think it's a CRUD Application with different roles of users(admin and normal user).
I design it as a server/client web application, the server side provide REST API and the client side provide a SPA.

For the backend(server), I choose Node.js and MongoDB based on the time limit(I think maybe Relational DB like MySQL is more fit for this application, I'd like to learn and try more about it in the future). For quicker development, I use Mongo Atlas this time, so you can use my test dataset, but I know the configure can be optimized.

For the frontend(client), I choose React-Redux stack based on my experience. This time I want to give [AntDesign](https://ant.design/) a try as the UI Component(BootStrap, Material-UI are also OK), because the time limit, I've not do much on style guideline(or Design System).


## TODO
Because I have only 2 days on this challenge, there are some feature or optimization can be done in the future.
- [ ] Build and deployment workflow for production eviroment(I think Docker will be a good idea).
- [ ] Deployment workflow for DB init.
- [ ] Design system or style guideline for frontend.
- [ ] Page and filter for list API.
- [ ] i18n.
- [ ] Extract service layer from action.
- [ ] Let user use and upload real portrait.
- [ ] ...
