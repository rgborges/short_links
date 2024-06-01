# Introduction

This project was done along with Diego Fernandes as a training for Node JS. The application is a simple short link api where you can post a code with a url. Then you can request the code directly through url and get redirected to the final url.


## Usage

Post a new link:


```
POST http://localhost:3333/api/links
Content-Type: application/json

{
     "code": "rocketseat",
      "url": "https://rocketseat.com.br"
}
```

Then the link is available via get:
```
GET http://localhost:3333/rocketseat
```
