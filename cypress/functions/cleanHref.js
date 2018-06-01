export default (href) => {
    if (href.includes('?')) {
        return href.slice(0, href.indexOf('?'))
    }
    return href;
};
