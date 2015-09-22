/*!
 * Copyright 2015 Florian Biewald
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
require('debugControls/sass/style');

var React = require('react');
var PureRenderMixin = React.addons.PureRenderMixin;
var DebugActionCreators = require('debugControls/actions/DebugActionCreators');
var Config = require('core/Config');

function onKeyDown(e) {
  switch (e.keyCode) {
    // right
    case 39:
      return DebugActionCreators.heading("right");
    // up
    case 38:
      return DebugActionCreators.position("up");
    // left
    case 37:
      return DebugActionCreators.heading("left");
    // down
    case 40:
      // return DebugActionCreators.direction("down");
  }
}

var DebugControls = React.createClass({

  mixins: [PureRenderMixin],

  componentDidMount: function() {
    if (Config.get('debug')) {
      setTimeout(function() {
        DebugActionCreators.sendPosition({
          coords: {
            latitude: Config.get('debug_coords.lat'),
            longitude: Config.get('debug_coords.long'),
            heading: 10,
            accuracy: 10
          }
        });
      });
      document.addEventListener('keydown', onKeyDown);
    }
  },
  muh: function() {
    console.log("dsfs");
  },
  render: function() {
    console.log("--- debug controls render");
    return (
      <div className="debug-controls" ref="controls">
        <div className="left" onClick={function() { DebugActionCreators.heading("left"); }}/>
        <div className="top" onClick={function() { DebugActionCreators.position("top"); }}/>
        <div className="right" onClick= {function() { DebugActionCreators.heading("right"); }}/>
      </div>
    );
  }
});


module.exports = DebugControls;
