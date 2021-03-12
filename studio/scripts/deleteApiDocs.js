import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({apiVersion: '2021-03-31'})

const BATCH_SIZE = 100

const apiTypes = [
  'api.class',
  'api.function',
  'api.interface',
  'api.package',
  'api.release',
  'api.type',
  'api.variable',
]

async function deleteApiDocs() {
  const refs = await client.fetch(`*[_type in $apiTypes]{_id}[0...${BATCH_SIZE}]`, {apiTypes})

  let tx = client.transaction()

  for (const ref of refs) {
    tx = tx.delete(ref._id)
  }

  await tx.commit()

  console.log('deleted', refs.length, 'docs')

  if (refs.length === BATCH_SIZE) {
    await deleteApiDocs()
  }
}

deleteApiDocs().catch((err) => {
  console.error(err)
  process.exit(1)
})
