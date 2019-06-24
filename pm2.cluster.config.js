module.exports = {
  "apps": [
    {
      "name": "assesment-backend-2019",
      "script": "./server.js",
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
