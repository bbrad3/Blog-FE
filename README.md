# Blog-FE

## OVERVIEW
This is a personal blog for users to create content to share with other users. Users can create content, read articles, follow authors and tags. 
## USER STORIES
1. A user can create/update/delete an account. All Visitors
2. The Home page shows top/most recent articles, side bar content. All Visitors
3. The Articles page shows all articles, side bar content. Articles can be clicked to nav to the ShowArticle page. There is a Back Btn and a Create Article Btn. All Visitors
    1.  Each article can be saved and/or up-voted. A user can create/edit/delete an article. Users Only
4. The ShowArticle page shows the full article, article comments, side bar content. All Visitors
    1. The article can be saved, up-voted, commented on. Users Only 
## ERD & WIREFRAMES
!['ERD'](misc/ERD.png)
!['Wireframe'](misc/Wireframe.png)

## ROUTES
### BACKEND ROUTES
- POST /users/new
- GET /users/verify
- PUT /users/update
- DELETE /users/delete

- POST /articles/new
- GET /articles
- GET /articles/:articleId
- PUT /articles/:articleId
- DELETE /articles/:articleId

- POST /comments/new
- GET /comments
- GET /comments/:commentId
- DELETE /comments/:commentId
### URL ROUTES
- /
- /home
- /articles
- /articles/:articleId
- /shadow
## COMPONENT TREE
- views
    - Home
    - Articles
    - ShowArticle
    - ShowForm
- partials
    - NavBar
    - SideBar
    - MessageBar
- components
    - UserForm
    - ArticleForm
    - CommentForm
    - ArticleCard
    - CommentCard

## MVP

## STRETCH
