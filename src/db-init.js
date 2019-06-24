const { User, Incident } = require('./models')

async function seedUsers() {
  await User.deleteMany({});

  const user1 = new User({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Engineer'
  });

  const user2 = new User({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'Supervisor'
  });

  await user1.save();
  await user2.save();

  await seedIncidents([ user1, user2])

  console.log('INFO: User DB seeded')
}


async function seedIncidents( testUsers ) {
  await Incident.deleteMany({});

  const incident1 = new Incident({
    title: 'Nginx server not starting',
    description: 'long text explaining the problem',
    assignee: testUsers[0]._id,
    status: 'Created'
  });

  const incident2 = new Incident({
    title: 'Docker demon not starting',
    description: 'long text explaining the problem',
    assignee: testUsers[1]._id,
    status: 'Created'
  });


  await incident1.save();
  await incident2.save();

}

module.exports = {
  seedUsers
}
