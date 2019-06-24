module.exports = {
  "apps": [
    {
      "name": "assesment-backend-2019",
      "script": "./src/server.js",
      "watch": ["src/**/*.{js,yaml}"],
      "ignore_watch": ["node_modules"],
      "exec_interpreter": "babel-node",
      "env": {
        "NODE_ENV": "development"
      },
      "args": [
        "--color"
      ]
    }
  ]
}
