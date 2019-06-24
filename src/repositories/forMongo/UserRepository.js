const { User } = require('../../models')

export default  {

  get : ( _id ) => User.findById( _id ).then(res=>console.log(res)).catch(err=>null),

}
