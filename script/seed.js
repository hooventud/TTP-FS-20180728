'use strict'

const db = require('../server/db')
const {User, Portfolio} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const dbSeed = await Promise.all([
    await User.create({email: 'kevin@email.com', name: 'kevin', password: 'kevin'}),
    await User.create({email: 'matt@email.com', name: 'matt', password: 'matt'}),
    await User.create({email: 'joe@email.com', name: 'joe', password: 'joe'}),
    await User.create({email: 'aaron@email.com', name: 'aaron', password: 'aaron'}),
    await Portfolio.create({userId: 1}),
    await Portfolio.create({userId: 2}),
    await Portfolio.create({userId: 3}),
    await Portfolio.create({userId: 4}),
  ])

  console.log(`seeded ${dbSeed.length}, Lines in db`)
  console.log(`seeded successfully`)
}
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}
if (module === require.main) {
  runSeed()
}

module.exports = seed