const { User } = require('../../models')

module.exports = {

  get : ( _id ) => User.findById( _id ).then(res=>console.log(res)).catch(err=>null),

}
