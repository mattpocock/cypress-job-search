/* global fetch */
import moment from 'moment';
import cleanHref from './cleanHref';

export default (site, title, href) => {
    fetch(`http://localhost:3000/jobs?href=${cleanHref(href)}`, {
        method: 'GET',
    }).then(response => response.json())
        .then((json) => {
            if (json.length > 0) {
                return;
            }
            fetch('http://localhost:3000/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    site,
                    title,
                    href: cleanHref(href),
                    date: moment().format('YYYY-MM-DD'),
                    checkedItOut: false,
                    worthApplyingFor: false,
                    hidden: false,
                }),
            });
        });
};
