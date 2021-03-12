import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({apiVersion: '2021-03-31'})

const fetchDocuments = () => client.fetch(`*[_type == 'atom']{_id}`)

async function migrate() {
  const docs = await fetchDocuments()

  return Promise.all(
    docs.map(({_id: prevId}) => {
      console.log('deleting previous id', prevId)

      return client.delete(prevId)
    })
  )
}

migrate().catch((err) => {
  console.error(err)
  process.exit(1)
})
