import groq from 'groq'
import {MAIN_NAV_QUERY, SETTINGS_QUERY} from '$queries'

export const DATA_QUERY = groq`{
  'nav': ${MAIN_NAV_QUERY},

  'package': * [_type == "api.package" && name == $name] {
    releases[]->{
      version,
    }
  }[0],

  'release': * [_type == "api.release" && version == $version][0]{
    _id,
    'currentMember': * [references(^._id) && slug.current == $slug][0]{
      ...,
      extends[]{
        ...,
        type[]{
          ...,
          reference->
        }
      },
      parameters[]{
        ...,
        type[]{
          ...,
          reference->
        }
      },
      propsType->{
        ...,
        extends[]{
          ...,
          type[]{
            ...,
            reference->{
              members[]{
                ...,
                type[]{
                  ...,
                  reference->
                }
              }
            }
          }
        },
        members[]{
          ...,
          type[]{
            ...,
            reference->{
              members[]{
                ...,
                type[]{
                  ...,
                  reference->
                }
              }
            }
          }
        }
      }
    },
    version,
    content,
    members[]->{
      _type,
      name,
      'slug': slug.current,
      releaseTag,
      isReactComponentType
    }
  },

  'releases': *[_type == "api.release"]{
    version
  },

  'settings': ${SETTINGS_QUERY}
}`
