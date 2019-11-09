const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withSass = require('@zeit/next-sass')
const withOffline = require('next-offline')

const swConfig = {
	transformManifest: manifest => ['/'].concat(manifest),
	workboxOpts: {
		swDest: 'static/service-worker.js',
		exclude: [/\.jpg$/, /\.png$/],
		runtimeCaching: [
			{
				// Match any request that ends with .png, .jpg, .jpeg or .svg.
				urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

				// Apply a cache-first strategy.
				handler: 'CacheFirst',

				options: {
					// Use a custom cache name.
					cacheName: 'images',

					// Only cache 40 images.
					expiration: {
						maxEntries: 40,
					},
				}
			}
		]
	}
}

const plugins = [
	[withOffline, swConfig],
	optimizedImages,
	[withSass, {
		sassLoaderOptions: {
			includePaths: ['./assets/styles']
		}
	}]
]

module.exports = withPlugins(plugins)
