module.exports = {
  "apps": [
    {
      "name": "your-app-name",
      "script": "./src/app.js",
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
