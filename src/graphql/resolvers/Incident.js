import IncidentRepository from "../../repositories/forMongo/IncidentRepository"


export default {
  Query: {
    incident: ( parent, { _id } ) => IncidentRepository.get( _id ),
    incidents: ( parent, { filter, options } ) => IncidentRepository.all( filter, options )
  },

  Mutation: {
    deleteIncident: (parent, { _id } ) => IncidentRepository.delete( _id ),
    createIncident: ( parent, { incident } ) => IncidentRepository.create( incident ),
    updateIncident: ( parent, { incident } ) => IncidentRepository.update( incident ),
    changeIncidentStatus: ( parent, { _id, status } ) => IncidentRepository.changeStatus( _id, status ),
    assignIncident: ( parent, { incident, user } ) => IncidentRepository.update( {_id: incident, assignee: user  } )
  }

};
