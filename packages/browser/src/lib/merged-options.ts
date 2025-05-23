import { Options } from '../core/events/interfaces'
import { CDNSettings } from '../browser'

/**
 * Merge legacy settings and initialized Integration option overrides.
 *
 * This will merge any options that were passed from initialization into
 * overrides for settings that are returned by the Segment CDN.
 *
 * i.e. this allows for passing options directly into destinations from
 * the Analytics constructor.
 */
export function mergedOptions(
  cdnSettings: CDNSettings,
  options: Options
): Record<string, any> {
  const optionOverrides = Object.entries(options.integrations ?? {}).reduce(
    (overrides, [integration, options]) => {
      if (typeof options === 'object') {
        return {
          ...overrides,
          [integration]: options,
        }
      }

      return {
        ...overrides,
        [integration]: {},
      }
    },
    {} as Record<string, any>
  )

  return Object.entries(cdnSettings.integrations).reduce(
    (integrationSettings, [integration, settings]) => {
      return {
        ...integrationSettings,
        [integration]: {
          ...settings,
          ...optionOverrides[integration],
        },
      }
    },
    {} as Record<string, any>
  )
}
