export default (loc, body) => (
    fetch(`localhost:3000/${loc}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })
);
