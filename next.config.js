const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withSass = require('@zeit/next-sass')

const plugins = [
	optimizedImages,
	[withSass, {
		sassLoaderOptions: {
			includePaths: ['./assets/styles']
		}
	}]
]
module.exports = withPlugins(plugins)
