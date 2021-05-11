Package.describe({
  name: 'wolas:admin-lte',
  version: '0.0.6',
  summary: 'AdminLTE dashboard theme',
  git: 'https://github.com/wolasss/meteor-admin-lte',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('2.0');

  api.use([
    'templating',
    'reactive-var'
  ], 'client');

  api.addFiles([
    'admin-lte.html',
    'admin-lte.js'
  ], 'client');

  api.addFiles([
    'css/AdminLTE.min.css',
    'css/skins/skin-black-light.min.css',
    'css/skins/skin-black.min.css',
    'css/skins/skin-blue-light.min.css',
    'css/skins/skin-blue.min.css',
    'css/skins/skin-green-light.min.css',
    'css/skins/skin-green.min.css',
    'css/skins/skin-purple-light.min.css',
    'css/skins/skin-purple.min.css',
    'css/skins/skin-red-light.min.css',
    'css/skins/skin-red.min.css',
    'css/skins/skin-yellow-light.min.css',
    'css/skins/skin-yellow.min.css'
  ], 'client', { isAsset: true });
});
