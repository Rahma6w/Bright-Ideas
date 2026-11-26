module.exports = {
  presets: [
    // Compiles modern JavaScript for the targets listed in "browserslist".
    '@babel/preset-env',
    // Compiles JSX with the automatic runtime (no need to import React in every file).
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
