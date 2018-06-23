export default {
  types: [
    {
      id: 'hints',
      title: 'Hints',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'name',
      sourceType: {
        id: 'pdx_scripts',
        pathPrefix: 'hints/',
        pathPattern: 'hints/*.txt',
      },
      sourceTransform: {
        type: 'keyValues',
        path: ['data', 'data'],
        keyName: 'name',
        valueName: 'data',
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Name',
            dataIndex: 'name',
            linkTo: '[self]',
          },
          {
            name: 'Title',
            dataIndex: ['data', 'title'],
          },
        ],
      },
    },
    {
      id: 'alerts',
      title: 'Alerts',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'name',
      sourceType: {
        id: 'pdx_scripts',
        path: 'common/alerts.txt',
      },
      sourceTransform: {
        type: 'keyValues',
        path: ['data', 'data', 'alerts'],
        keyName: 'name',
        valueName: 'data',
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Name',
            dataIndex: 'name',
            linkTo: '[self]',
          },
        ],
      },
    },
    {
      id: 'alert_sounds',
      title: 'Alert sounds',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'type',
      sourceType: {
        id: 'pdx_scripts',
        path: 'common/alerts.txt',
      },
      sourceTransform: {
        type: 'keyValues',
        path: ['data', 'data', 'sound'],
        keyName: 'type',
        valueName: 'sound',
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Type',
            dataIndex: 'type',
            linkTo: '[self]',
          },
          {
            name: 'Sound',
            dataIndex: 'sound',
          },
        ],
      },
    },
    {
      id: 'alert_icons',
      title: 'Alert icons',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'type',
      sourceType: {
        id: 'pdx_scripts',
        path: 'common/alerts.txt',
      },
      sourceTransform: {
        type: 'keyValues',
        path: ['data', 'data', 'icon'],
        keyName: 'type',
        valueName: 'icon',
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Type',
            dataIndex: 'type',
            linkTo: '[self]',
          },
          {
            name: 'Icon',
            dataIndex: 'icon',
          },
        ],
      },
    },
    {
      id: 'graphicalculturetypes',
      title: 'Graphical culture types',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'name',
      sourceType: {
        id: 'pdx_scripts',
        path: 'common/graphicalculturetype.txt',
      },
      sourceTransform: {
        type: 'keyValues',
        path: ['data', 'data'],
        keyName: 'name',
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Name',
            dataIndex: 'name',
            linkTo: '[self]',
          },
        ],
      },
    },
    {
      id: 'gfx_cursor_images',
      title: 'Cursor images',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'path',
      sourceType: {
        id: 'files',
        pathPrefix: 'gfx/cursors/',
        pathPattern: 'gfx/cursors/*.+(png|cur|ani)',
      },
      sourceTransform: {
        type: 'fileData',
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Path',
            dataIndex: 'path',
            linkTo: '[self]',
          },
        ],
      },
    },
    {
      id: 'gfx_font_textures',
      title: 'Font Textures',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'path',
      sourceType: {
        id: 'dds_images',
        pathPrefix: 'gfx/',
        pathPattern: 'gfx/fonts/*.dds',
      },
      sourceTransform: {
        type: 'fileData',
        keyName: 'path',
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Path',
            dataIndex: 'path',
            linkTo: '[self]',
          },
        ],
      },
    },
    {
      id: 'gfx_font_images',
      title: 'Font Images',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'path',
      sourceType: {
        id: 'files',
        pathPrefix: 'gfx/fonts/',
        pathPattern: 'gfx/fonts/*.tga',
      },
      sourceTransform: {
        type: 'fileData',
        keyName: 'path',
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Path',
            dataIndex: 'path',
            linkTo: '[self]',
          },
        ],
      },
    },
    {
      id: 'gfx_font_definitions',
      title: 'Font Definitions',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'path',
      sourceType: {
        id: 'files',
        pathPrefix: 'gfx/fonts/',
        pathPattern: 'gfx/fonts/*.fnt',
      },
      sourceTransform: {
        type: 'fileData',
        keyName: 'path',
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Path',
            dataIndex: 'path',
            linkTo: '[self]',
          },
        ],
      },
    },
    {
      id: 'gfx_interface_images',
      title: 'Interface Images',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'path',
      sourceType: {
        id: 'dds_images',
        pathPrefix: 'gfx/interface/',
        pathPattern: 'gfx/interface/**/*.+(dds|tga)',
      },
      sourceTransform: {
        type: 'fileData',
        keyName: 'path',
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Path',
            dataIndex: 'path',
            linkTo: '[self]',
          },
        ],
      },
    },
    {
      id: 'interface_gui_items',
      title: 'Interface GUI items',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'id',
      sourceType: {
        id: 'pdx_scripts',
        pathPrefix: 'interface/',
        pathPattern: 'interface/*.gui',
      },
      sourceTransform: {
        type: 'typesListData',
        path: ['data', 'data', 'guiTypes'],
        types: ['*'],
        idPath: ['name'],
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Name',
            dataIndex: 'id',
            linkTo: '[self]',
          },
          {
            name: 'Type',
            dataIndex: ['type'],
          },
        ],
      },
    },
    {
      id: 'interface_assets',
      title: 'Interface Assets',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'id',
      sourceType: {
        id: 'pdx_scripts',
        pathPrefix: 'interface/assets/',
        pathPattern: 'interface/assets/*.gfx',
      },
      sourceTransform: {
        type: 'typesListData',
        path: ['data', 'data', 'objectTypes'],
        types: ['pdxmesh'],
        idPath: ['name'],
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Name',
            dataIndex: 'id',
            linkTo: '[self]',
          },
        ],
      },
    },
    {
      id: 'interface_gui_spritetypes',
      title: 'Interface GUI sprite types',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'id',
      sourceType: {
        id: 'pdx_scripts',
        pathPrefix: 'interface/',
        pathPattern: 'interface/*.gfx',
      },
      sourceTransform: {
        type: 'typesListData',
        path: ['data', 'data', 'spriteTypes'],
        types: ['*'],
        idPath: ['name'],
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Name',
            dataIndex: 'id',
            linkTo: '[self]',
          },
          {
            name: 'Type',
            dataIndex: ['type'],
          },
        ],
      },
    },
    {
      id: 'interface_gui_objecttypes',
      title: 'Interface GUI object types',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'id',
      sourceType: {
        id: 'pdx_scripts',
        pathPrefix: 'interface/',
        pathPattern: 'interface/*.gfx',
      },
      sourceTransform: {
        type: 'typesListData',
        path: ['data', 'data', 'objectTypes'],
        types: ['*'],
        idPath: ['name'],
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Name',
            dataIndex: 'id',
            linkTo: '[self]',
          },
          {
            name: 'Type',
            dataIndex: ['type'],
          },
        ],
      },
    },
    {
      id: 'interface_gui_bitmapfonts',
      title: 'Interface GUI bitmapfonts',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'id',
      sourceType: {
        id: 'pdx_scripts',
        pathPrefix: 'interface/',
        pathPattern: 'interface/*.gfx',
      },
      sourceTransform: {
        type: 'typesListData',
        path: ['data', 'data', 'bitmapfonts'],
        types: ['*'],
        idPath: ['name'],
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Name',
            dataIndex: 'id',
            linkTo: '[self]',
          },
          {
            name: 'Type',
            dataIndex: ['type'],
          },
        ],
      },
    },
    {
      id: 'interface_credits',
      title: 'Interface Credits',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'path',
      sourceType: {
        id: 'files',
        pathPrefix: 'interface/',
        pathPattern: 'interface/credits.txt',
      },
      sourceTransform: {
        type: 'fileData',
        keyName: 'path',

      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Path',
            dataIndex: 'path',
            linkTo: '[self]',
          },
        ],
      },
    },
    {
      id: 'interface_news_banner',
      title: 'Interface News Banner',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'path',
      sourceType: {
        id: 'pdx_scripts',
        pathPrefix: 'interface/',
        pathPattern: 'interface/news_banner_data.txt',
      },
      sourceTransform: {
        type: 'fileData',
        keyName: 'path',
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Path',
            dataIndex: 'path',
            linkTo: '[self]',
          },
        ],
      },
    },
    {
      id: 'patchnotes',
      title: 'Patch notes',
      category: 'User interface',
      reader: 'StructureLoader',
      primaryKey: 'path',
      sourceType: {
        id: 'files',
        pathPrefix: 'patchnotes/',
        pathPattern: 'patchnotes/*.txt',
      },
      sourceTransform: {
        type: 'fileData',
        keyName: 'path',
      },
      listView: {
        pageSize: 100,
        columns: [
          {
            name: 'Path',
            dataIndex: 'path',
            linkTo: '[self]',
          },
        ],
      },
    },
  ],
};