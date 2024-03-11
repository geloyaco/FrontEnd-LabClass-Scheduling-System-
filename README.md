# fe-fintrack-vue2

```bash
$ git clone https://github.com/cbatuic/fe-fintrack-vue2.git
$ cd fe-fintrack-vue2
$ npm install
$ npm run dev
```

 ### Troubleshoot: Block on CORS Policy - No Access Control Allowed Origin
```js
# fix - update main.py in Fast API and allow CORS Policy

# Allow CORS for all origins with all methods and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)
```
