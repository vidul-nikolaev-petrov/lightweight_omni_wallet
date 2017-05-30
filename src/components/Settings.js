import React from 'react';
import { Link } from 'react-router';
import fs, { dialog } from '../utils/fs';

export default class Settings extends React.Component {
    exportWallet() {
        // @TODO: content export
        const content = `JSON structure with key pairs at "${new Date()}"`;

        dialog.showSaveDialog(fileName => {
            if (!fileName) {
                alert(`The wallet export was canceled`);
                return;
            }

            fs.writeFile(fileName, content, { mode: 0o600 }).then(
                () => alert(`The file has been succesfully saved`),
                (err) => alert(`An error ocurred creating the file: ${err.message}`)
            );
        });
    }

    render() {
        return (
            <div>
                <span>SETTINGS  placeholder</span>
                <br />
                <br />
                <br />
                <div>
                    <a className="activeLink" onClick={this.exportWallet}>export wallet</a>
                </div>
                <br />
                <div>
                    <Link to="/settings/address" className="activeLink">new address</Link>
                </div>
            </div>
        );
    }
}