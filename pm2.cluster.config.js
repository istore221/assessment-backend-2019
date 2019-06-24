module.exports = {
  "apps": [
    {
      "name": "your-app-name",
      "script": "./dist/app.js",
      "instances": 'max',
      "exec_mode": "cluster",
      "watch": false,
      "env": {
        "NODE_ENV": "development"
      },
      "env_production": {
        "NODE_ENV": "production"
      }
    }
  ]
}
