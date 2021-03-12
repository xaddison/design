/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs'
import path from 'path'
import util from 'util'
import {ApiModel} from '@microsoft/api-extractor-model'
import {sanityClient} from '../../sanity'
import {config} from './config'
import {transform} from './transform'
import {DocumentValue} from './transform/types'

const writeFile = util.promisify(fs.writeFile)

async function loadToFs(docs: any[]) {
  const jsonPath = path.resolve(
    config.context,
    `temp/${config.package.name}-${config.package.version}.json`
  )

  console.log(`=== Publishing ===`)
  console.log(`fs:${jsonPath}`)

  return writeFile(jsonPath, JSON.stringify(docs, null, 2))
}

async function loadToSanity(docs: any[]) {
  const {dataset, projectId} = sanityClient.config()

  console.log(`=== Publishing to`)
  console.log(`sanity:${projectId}/${dataset}`)

  // write to db
  let tx = sanityClient.transaction()

  for (const doc of docs) {
    tx = tx.createOrReplace(doc)
  }

  await tx.commit()
}

async function etl() {
  const pkgDoc: DocumentValue | null = await sanityClient.fetch(
    '*[_type == "api.package" && name == $name][0]',
    {
      name: `${config.package.scope}/${config.package.name}`,
    }
  )

  const apiModel = new ApiModel()
  const apiPackage = apiModel.loadPackage(path.resolve(__dirname, '../../../temp/ui.api.json'))

  const docs = transform(apiPackage, pkgDoc)

  // const docs = transform(uiApi, pkg)

  if (config.publish.fs) {
    await loadToFs(docs)
  }

  if (config.publish.sanity) {
    await loadToSanity(docs)
  }
}

etl().catch((err) => {
  console.log(err)
  process.exit(1)
})
