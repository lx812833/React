# README

`@umijs/max` 模板项目，更多功能参考 [Umi Max 简介](https://umijs.org/docs/max/introduce)

.
├── config
│   └── config.ts
├── dist
├── mock                                                       // mock文件所在目录；基于express
│   └── app.ts｜tsx
├── src                                                        // 源码
│   ├── .umi
│   ├── .umi-production
│   ├── layouts                                                // 页面布局
│   │   ├── BasicLayout.tsx
│   │   ├── index.less
│   ├── models                                                 // 数据流
│   │   ├── global.ts
│   │   └── index.ts
│   ├── wrappers                                               // 权限管理
│   │   ├── global.ts
│   │   └── index.ts
│   ├── pages                                                  // 页面代码
│   │   ├── index.less
│   │   └── index.tsx
│   ├── utils // 推荐目录
│   │   └── index.ts
│   ├── services // 推荐目录
│   │   └── api.ts
│   ├── app.(ts|tsx)                                           // 运行时配置文件
│   ├── global.ts                                              // 约定的全局方法
│   ├── global.(css|less|sass|scss)                            // 约定的全局样式
│   ├── overrides.(css|less|sass|scss)                         // 高优先级全局样式文件
│   ├── favicon.(ico|gif|png|jpg|jpeg|svg|avif|webp)           // 站点 favicon 图标文件
│   └── loading.(tsx|jsx)                                      // 全局加载组件
├── node_modules
│   └── .cache
│       ├── bundler-webpack
│       ├── mfsu
│       └── mfsu-deps
├── .env
├── plugin.ts 
├── .umirc.ts // 与 config/config 文件 2 选一
├── package.json
├── tsconfig.json
└── typings.d.ts
