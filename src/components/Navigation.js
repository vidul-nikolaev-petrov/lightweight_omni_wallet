import React from 'react';
import { Link } from 'react-router';

const Navigation = () => (
    <div>
        <Link to="/" activeClassName="activeLink" onlyActiveOnIndex>Home</Link>&nbsp;
        <Link to="/history" activeClassName="activeLink">Transactions</Link>&nbsp;
        <Link to="/receive" activeClassName="activeLink">Receive</Link>&nbsp;
        <Link to="/send" activeClassName="activeLink">Send</Link>&nbsp;
        <Link to="/settings" activeClassName="activeLink">Settings</Link>&nbsp;
    </div>
);

export default Navigation;