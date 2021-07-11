module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: { // "off" or 0 | "warn" or 1 | "error" or 2
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'no-cond-assign': 2, // 禁止条件表达式中出现赋值操作符
    'no-duplicate-case': 2, // 禁止出现重复的 case 标签
    'no-const-assign': 2, // 禁止修改 const 声明的变量
    'no-dupe-class-members': 2, // 禁止类成员中出现重复的名称
    'no-duplicate-imports': 2, // 禁止重复模块导入
    'no-var': 2, // 要求使用 let 或 const 而不是 var

    'camelcase': 'off', // 强制驼峰法命名

    'prettier/prettier': [
      'error', // warn
      {
        tabWidth: 2,
        useTabs: false,
        semi: false, // 句末加分号
        singleQuote: true, // 用单引号
        trailingComma: 'none', // 最后一个对象元素加逗号
        bracketSpacing: true, // 对象，数组加空格
        jsxBracketSameLine: false, // jsx > 是否另起一行
        arrowParens: 'avoid' // (x) => {} 是否要有小括号
      }
    ]
  }
};
