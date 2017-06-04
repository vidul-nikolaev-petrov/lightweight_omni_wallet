const fs = window.require('fs-thenable');
const path = window.require('path');
const { remote } = window.require('electron');
const dialog = remote.dialog;
const thisPath = (fileName, ...parents) => path.join(remote.app.getAppPath(), ...parents, fileName);
/* example:
fs.readFile(thisPath(__filename, 'src'), 'utf8').then(
    data => console.log(data),
    err => console.error(err)
);
*/

export { fs as default, dialog, thisPath };


