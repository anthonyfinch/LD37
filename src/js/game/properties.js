var npmProperties = require('../../../package.json');

module.exports =
  { title: 'LD37'
  , description: npmProperties.description
  , port: 3017
  , liveReloadPort: 3018
  , mute: false
  , showStats: true
  , size:
    { x: 800
    , y: 800
    }
  , analyticsId: 'LD37'
  };
