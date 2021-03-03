const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const prodConfig = {
	mode: 'production',
	optimization: {
		// 本身production 就提供默认优化
		splitChunks: {
			cacheGroups: {
				defaultVendors: {
					name: 'chunk-vendors',
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: 'initial'
				},
				common: {
					name: 'chunk-common',
					minChunks: 2,
					priority: -20,
					chunks: 'initial',
					reuseExistingChunk: true
				}
			}
		},
		minimizer: ['...', new CssMinimizerPlugin()]
	}
}
module.exports = prodConfig
