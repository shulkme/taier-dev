import { defineConfig } from 'umi';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
//import * as process from "node:process";
//import {merge} from "lodash";


export default defineConfig({
    title: 'Taier | DTStack',
    favicon: 'images/favicon.png',
    hash: true,
    publicPath: './',
    base: '/develop/ide',
    ignoreMomentLocale: true,
    targets: {
        ios: false,
    },
    nodeModulesTransform: {
        type: 'none',
    },
    webpack5: {},
	antd: {

	},
    dynamicImportSyntax: {},
    routes: [
        {
            path: '/',
            component: '@/layout/index',
            routes: [
                {
                    path: '/',
                    component: '@/pages/index',
                },
            ],
        },
    ],
    chainWebpack(memo, { env }) {
		// const fontRule = memo.module.rule('fonts');
		// fontRule.uses.clear();
		// fontRule.use('url-loader').tap(options => merge(options, {
		// 		fallback: {
		// 			options: { // file-loader 的 options
		// 				publicPath: '/static/'
		// 			}
		// 		}
		// 	}));


        memo.output.globalObject('this').set('globalObject', 'this');
        memo.entry('sparksql.worker').add('monaco-sql-languages/out/esm/sparksql/sparksql.worker.js');
        memo.entry('sql.worker').add('monaco-sql-languages/out/esm/sql/sql.worker.js');
        memo.entry('hivesql.worker').add('monaco-sql-languages/out/esm/hivesql/hivesql.worker.js');
        memo.entry('mysql.worker').add('monaco-sql-languages/out/esm/mysql/mysql.worker.js');
        memo.entry('flinksql.worker').add('monaco-sql-languages/out/esm/flinksql/flinksql.worker.js');
        memo.plugin('monaco-editor').use(MonacoWebpackPlugin, [
            {
                languages: ['json', 'python', 'shell'],
            },
        ]);

        const isDev = env === 'development';
        if (!isDev) {
            // ignore *.worker.js hash
            memo.output.set('filename', (pathData: any) => {
                return pathData.chunk.name.endsWith('.worker') ? '[name].js' : `[name].[contenthash:8].js`;
            });
        }
        return memo;
    },
    esbuild: {},
    theme: {
        'primary-color': '#1677ff',
        'border-radius-base': '4px',
		// 'ant-prefix': 'a'
    },
    tailwindcss: {},
	proxy: {
		'/taier': {
			target: 'http://dmp-bs.fzzixun.com:8090',
			changeOrigin: true,
			secure: false,
		},
	},
	qiankun: {
		slave: {}
	},
});
