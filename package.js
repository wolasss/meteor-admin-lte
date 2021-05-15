Package.describe({
    name: 'wolas:admin-lte-3',
    version: '0.0.9',
    summary: 'AdminLTE dashboard theme',
    git: 'https://github.com/wolasss/meteor-admin-lte',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('2.2');

    api.use(['templating', 'reactive-var', 'jquery'], 'client');

    api.addFiles([
        'admin-lte.html',
        'Layout.js',
        'PushMenu.js',
        'Treeview.js',
        'Dropdown.js',
        'admin-lte.js'
    ],
    'client');

    api.addFiles(['css/AdminLTE.min.css'], 'client', { isAsset: true });
});
