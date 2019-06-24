const { Incident, User} = require('../../models')
const _ = require('lodash')

export default {

  get : ( _id ) => Incident.findById( _id ).then(res=>res).catch(err=>null),

  delete: ( _id ) => Incident.findOneAndDelete( {_id : _id} ).then(res=>_id).catch(err=>null),

  all: ( filter, options ) => Incident.paginate( filter, options ).then(res=>res.docs).catch(err=>null),

  create: ( incident ) =>   ( async () => {

    let engineers = await User.find({role: 'Engineer'});
    let engineer = _.sample(engineers); // get random engineer

    let o_incident = new Incident( incident )
    o_incident.assignee = engineer._id || null

    return o_incident.save()
    .then(res=>res)
    .catch(err=>null)

  })(),


  update: ( incident ) => Incident.updateOne({ _id: incident._id }, incident).then(res=>incident._id).catch(err=>null),

  changeStatus: ( _id, status ) => Incident.updateOne({ _id }, { status }).then(res=>_id).catch(err=>null)

}
